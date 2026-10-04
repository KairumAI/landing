import type { APIRoute } from "astro";
import { textHeaders } from "../i18n/llms";

// KAIRUM sells visibility in AI answers, so its own pages opt in to search,
// AI answers and training (https://contentsignals.org).
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

Sitemap: ${new URL("/sitemap.xml", site)}
`,
    { headers: textHeaders },
  );
