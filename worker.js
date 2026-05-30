/**
 * Simple Hello World Cloudflare Worker
 * 
 * Logs incoming request details to the console and returns a friendly greeting.
 */

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Log the request method, path, and client IP to the console
        const clientIp = request.headers.get("cf-connecting-ip") || "unknown IP";
        console.log(`[Worker Log] Incoming request: ${request.method} ${url.pathname} from ${clientIp}`);

        return new Response("Hello, World!", {
            status: 200,
            headers: {
                "Content-Type": "text/plain",
                "Cache-Control": "no-store",
            },
        });
    },
};
