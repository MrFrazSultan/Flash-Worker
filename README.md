# ⚡ Flash-Worker

**Flash-Worker** is a premium, high-performance, concurrent bulk deployment tool for Cloudflare Workers. It enables you to instantly deploy dozens or hundreds of workers with the same JavaScript codebase under sequentially indexed custom names, monitors their status, handles errors, cleans up temporary configuration files, and records successful URLs into a single file.

---

## ✨ Features

- 🚀 **Parallel Execution (Concurrently "Instant")**: Deploys workers in parallel using multi-threaded execution pools to minimize wait times.
- 🧹 **Zero Workspace Clutter (Automatic Cleanup)**: Programmatically creates configurations in a hidden temp directory (`.flash_temp/`) and deletes them immediately after each thread finishes.
- 🔍 **Strict Error-Filtering**: Tracks deployment success using process exit codes. Only successfully deployed workers are saved to the output list.
- 🌐 **Regex URL Extraction**: Captures live `.workers.dev` URLs from Wrangler's output automatically and dynamically.
- 🎨 **Premium CLI Dashboard**: Designed with rich terminal styling, colored real-time logs, and a clean retro status board showing performance analytics (success rate, average deployment speeds).

---

## 📦 File Structure

```text
Flash-Worker/
├── worker.js          # Your custom Worker script (e.g., CORS Proxy)
├── deploy.py          # The core Python bulk-deployment script
├── success_urls.txt   # File generated after execution with successful URLs
└── README.md          # Documentation and Quick Start Guide
```

---

## 🛠️ Prerequisites

Before executing Flash-Worker, make sure you have the following installed on your system:

1. **Python 3.x**: Ensure Python is available in your shell PATH.
2. **Node.js & npm/npx**: Necessary to invoke Wrangler.
3. **Cloudflare Wrangler CLI**: Logged into your Cloudflare account.

---

## 🚀 Quick Start Guide

### Step 1: Log in to Cloudflare
In order for Wrangler to interact with your Cloudflare account, run the login command in your terminal and follow the browser prompts:
```bash
npx wrangler login
```

### Step 2: Ensure Your Script is Ready
Make sure your worker logic is saved in a file named `worker.js` in the same directory as `deploy.py`.

### Step 3: Run the Bulk Deployer
Execute the Python script in your terminal:
```bash
python3 deploy.py
```

### Step 4: Interact with the CLI
The script will prompt you for configuration details:
1. **Number of workers to deploy**: Input any integer (e.g., `10`, `50`, `100`).
2. **Base name for workers**: The prefix name for workers (e.g., `my-proxy` will generate `my-proxy-1`, `my-proxy-2`, etc.).
3. **Compatibility Date**: Specify the Wrangler compatibility date or press `Enter` to use today's date automatically.
4. **Concurrency level**: Choose how many uploads to perform in parallel (default is `5` to prevent rate limits while maintaining extremely high speeds).

---

## 📊 Deployment Analytics Dashboard

At the end of each run, a beautiful dashboard reports deployment stats:

```text
=================== FLASH-WORKER DEPLOYMENT SUMMARY ===================
 Total Processed:    10
 Successfully Deployed: 10
 Failed Deployments:    0
 Success Rate:          100.0%
 Total Time Elapsed:    12.45 seconds
 Average Time/Worker:   1.25 seconds
 Output Status:         [✓] URLs saved to success_urls.txt
=======================================================================
```

---

## 📂 Output Format (`success_urls.txt`)

Successful worker URLs are written sequentially to `success_urls.txt`, one per line:
```text
https://flash-worker-1.yoursubdomain.workers.dev
https://flash-worker-2.yoursubdomain.workers.dev
https://flash-worker-3.yoursubdomain.workers.dev
```

Failed deployments are filtered out entirely and logged to the console for easy debugging.

---

## ⚙️ Customization and Best Practices

- **Overwriting Existing Workers**: If you deploy workers with a base name that already exists (e.g., you run `flash-worker` twice), Cloudflare will simply update the existing workers with your latest `worker.js` script.
- **Handling Rate Limits**: When deploying larger amounts of workers (e.g., `100+`), you can adjust the **Concurrency Level** down to `2` or `3` to avoid hitting rate-limiting thresholds on your Cloudflare account.

---

## ❓ Troubleshooting

### "Authentication check warning"
If the script alerts you that you aren't logged in, run `npx wrangler login` to establish authentication credentials on your machine.

### "Compatibility date warning"
Wrangler requires a compatibility date to ensure backward compatibility of features. Press `Enter` to use today's date automatically, or input an older date like `2024-04-03` if your script is built for an older standard.
