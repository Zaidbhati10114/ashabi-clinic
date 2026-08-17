// app/sitemap.xml/route.ts
// Manual Route Handler instead of the app/sitemap.ts metadata-file convention,
// which has known prerender bugs on Next.js 13.5.x.
// DELETE app/sitemap.ts before adding this — you can't have both.
// Add more <url> entries below as you build out real pages.

export async function GET() {
    const baseUrl = "https://ashabiclinic.com";

    const pages = [
        { path: "", priority: "1.0" },
        // Add more entries here only if you build out separate real pages later
        // (e.g. /booking, /cancel). Anchor sections on the same page like
        // #about or #contact don't need their own sitemap entry.
    ];

    const urlEntries = pages
        .map(
            (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
        )
        .join("\n");

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}