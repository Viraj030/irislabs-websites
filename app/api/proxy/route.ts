import type { NextRequest } from "next/server";

/**
 * GET /api/proxy?url=<encoded-url>
 *
 * Fetches an external URL server-side, strips the headers that prevent
 * iframe embedding (X-Frame-Options, Content-Security-Policy), and injects
 * a <base> tag so that relative asset paths still resolve against the
 * original origin.
 */

const ALLOWED_ORIGINS = new Set([
  "https://foodearth.com",
  "https://shop.kemeiprofessionals.com",
  "https://derivecurates.com",
  "https://shahiriwayat.com",
  "https://indianchaska.in",
  "https://aromascafeandlounge.com",
  "https://www.kemeiprofessionals.com",
  "https://mmcgym.in",
  "https://www.finlitinstitute.com",
  "https://alkumfoundation.com",
  "https://spectron.in",
  "https://anchorvishal.com",
]);

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return new Response("Missing `url` query parameter.", { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return new Response("Invalid URL.", { status: 400 });
  }

  if (!ALLOWED_ORIGINS.has(target.origin)) {
    return new Response("Origin not in allowlist.", { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    return new Response("Failed to fetch upstream.", { status: 502 });
  }

  const contentType =
    upstream.headers.get("content-type") ?? "text/html; charset=utf-8";
  const isHtml = contentType.includes("text/html");

  if (!isHtml) {
    const body = await upstream.arrayBuffer();
    return new Response(body, {
      status: upstream.status,
      headers: { "Content-Type": contentType },
    });
  }

  let html = await upstream.text();

  // Inject <base> so relative URLs resolve against the original origin.
  const baseTag = `<base href="${target.origin}/">`;
  if (/<head[\s>]/i.test(html)) {
    html = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}${baseTag}`);
  } else {
    html = baseTag + html;
  }

  return new Response(html, {
    status: upstream.status,
    headers: {
      "Content-Type": contentType,
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
