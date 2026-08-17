// app/robots.txt/route.ts
// Manual Route Handler instead of the app/robots.ts metadata-file convention,
// which has known prerender bugs on Next.js 13.5.x.
// DELETE app/robots.ts before adding this — you can't have both.

export async function GET() {
    const body = `User-agent: *
Allow: /

Sitemap: https://www.ashabiclinic.com/sitemap.xml
`;

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}