import type { APIRoute } from "astro";
import { renderLlmsFull, textHeaders } from "../../i18n/llms";

export const GET: APIRoute = ({ site }) =>
  new Response(renderLlmsFull("pt-br", site!), { headers: textHeaders });
