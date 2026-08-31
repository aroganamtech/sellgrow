import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// In-memory LRU cache to prevent throttling under heavy traffic spikes
const ipCache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
export async function GET(request) {
    // 1. Fast Edge Header Detection (0ms latency for Vercel / Cloudflare / Nginx)
    const headers = request.headers;
    const edgeCountry = (headers.get("x-vercel-ip-country") ||
        headers.get("cf-ipcountry") ||
        headers.get("x-country-code") ||
        "").toUpperCase();
    if (edgeCountry) {
        const isIndia = edgeCountry === "IN";
        return NextResponse.json({
            status: "success",
            ip: headers.get("x-forwarded-for")?.split(",")[0] || "edge",
            country_code: edgeCountry,
            country_name: isIndia ? "India" : edgeCountry,
            region: isIndia ? "in" : "global",
            mode: "edge-header"
        });
    }
    // 2. Check local IP cache
    const clientIp = headers.get("x-forwarded-for")?.split(",")[0] || "client";
    const cached = ipCache.get(clientIp);
    if (cached && cached.expiry > Date.now()) {
        return NextResponse.json(cached.data);
    }
    // 3. Fast-timeout fetch to local FastAPI if available (1.2s timeout)
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const fastApiResponse = await fetch("http://localhost:8000/api/detect-region", {
            cache: "no-store",
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (fastApiResponse.ok) {
            const data = await fastApiResponse.json();
            ipCache.set(clientIp, { data, expiry: Date.now() + CACHE_TTL_MS });
            return NextResponse.json(data);
        }
    }
    catch (err) {
        // FastAPI server not reachable or timed out
    }
    // 4. Fast-timeout Geo-IP lookup with 1.5s timeout
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        const geoRes = await fetch("https://ipapi.co/json/", {
            cache: "no-store",
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (geoRes.ok) {
            const data = await geoRes.json();
            const countryCode = (data.country_code || "IN").toUpperCase();
            const result = {
                status: "success",
                ip: data.ip || clientIp,
                country_code: countryCode,
                country_name: data.country_name || "India",
                region: countryCode === "IN" ? "in" : "global",
                mode: "auto"
            };
            ipCache.set(clientIp, { data: result, expiry: Date.now() + CACHE_TTL_MS });
            return NextResponse.json(result);
        }
    }
    catch (geoErr) {
        // Fallback default on network timeout or rate limit
    }
    // 5. Default instant fallback for high traffic resilience
    const fallbackResult = {
        status: "success",
        ip: "127.0.0.1",
        country_code: "IN",
        country_name: "India",
        region: "in",
        mode: "fallback"
    };
    return NextResponse.json(fallbackResult);
}
