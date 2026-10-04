import type { APIRoute } from "astro";
import { renderLlmsIndex, textHeaders } from "../i18n/llms";

export const GET: APIRoute = ({ site }) =>
  new Response(renderLlmsIndex(site!), { headers: textHeaders });
