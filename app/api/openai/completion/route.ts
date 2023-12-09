import { headers } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { model, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, messages } =
    await req.json();

  const headersList = headers();
  const apiKey = headersList.get('x-api-key');

  if (!apiKey) {
    return NextResponse.json({ status: 401, error: true, message: 'Invalid/Missing API key' });
  }

  try {
    const parameters = {
      model,
      messages,
      top_p,
      frequency_penalty,
      presence_penalty,
      max_tokens,
      temperature,
    };

    const url = 'https://api.openai.com/v1/chat/completions';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(parameters),
    };
    const response = await fetch(url, requestOptions);

    const data = await response.json();

    return NextResponse.json({
      status: 200,
      data,
    });
  } catch (err: any) {
    console.log('error', { err });
    return NextResponse.json({
      status: err?.status ?? 500,
      error: true,
      message: err?.message ?? 'Error generating response',
    });
  }
}
