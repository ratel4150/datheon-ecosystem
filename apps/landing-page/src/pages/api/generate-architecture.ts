// File: apps/landing-page/src/pages/api/generate-architecture.ts
import type { APIRoute } from 'astro';
import { buildArchitecturePrompt } from '@/_features/solutions/lib';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const bodyBuffer = await request.arrayBuffer();
  const rawBody = new TextDecoder().decode(bodyBuffer);

  if (!rawBody || rawBody.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'Body vacío — el cliente no envió ningún contenido en la petición' }), { status: 400 });
  }

  let body: { pathLabel?: string; subOptionLabel?: string };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new Response(
      JSON.stringify({ error: 'Body inválido: no es JSON parseable', received: rawBody.slice(0, 200) }),
      { status: 400 },
    );
  }

  const { pathLabel, subOptionLabel } = body;
  if (!pathLabel || !subOptionLabel) {
    return new Response(JSON.stringify({ error: 'Faltan pathLabel o subOptionLabel', received: body }), { status: 400 });
  }

  const apiKey = import.meta.env?.GROQ_API_KEY ?? process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY no configurada en el servidor' }), { status: 500 });
  }

  const { system, user } = buildArchitecturePrompt(pathLabel, subOptionLabel);

  let groqRes: Response;
  try {
    groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0.4,
        response_format: { type: 'json_object' },
      }),
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'No se pudo contactar a Groq', detail: String(err) }), { status: 502 });
  }

  if (!groqRes.ok) {
    const detail = await groqRes.text().catch(() => '');
    return new Response(JSON.stringify({ error: 'Groq devolvió un error', detail }), { status: 502 });
  }

  const data = await groqRes.json().catch(() => null);
  const rawContent: string | undefined = data?.choices?.[0]?.message?.content;
  if (!rawContent) {
    return new Response(JSON.stringify({ error: 'Respuesta vacía de Groq' }), { status: 502 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    return new Response(JSON.stringify({ error: 'Groq no devolvió JSON válido', received: rawContent.slice(0, 300) }), { status: 502 });
  }

  if (!parsed || typeof parsed !== 'object' || !('root' in parsed)) {
    return new Response(JSON.stringify({ error: 'JSON con forma inesperada (falta "root")', received: parsed }), { status: 502 });
  }

  return new Response(JSON.stringify(parsed), { status: 200, headers: { 'Content-Type': 'application/json' } });
};