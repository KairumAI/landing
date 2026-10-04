import type { APIRoute } from "astro";
import { renderLlmsFull, textHeaders } from "../i18n/llms";

export const GET: APIRoute = ({ site }) =>
  new Response(renderLlmsFull("es", site!), { headers: textHeaders });
