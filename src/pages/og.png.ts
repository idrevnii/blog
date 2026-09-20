import type { APIRoute } from 'astro';
import { renderSiteOg } from '../lib/og-image';

export const GET: APIRoute = async () => {
  const png = await renderSiteOg();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
