import { OpenAIChatModels } from '@/app/utils/constants';
import { OpenAIApiModel } from '@/app/utils/types';
import { headers } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const headersList = headers();
  const apiKey = headersList.get('x-api-key');

  if (!apiKey) {
    return NextResponse.json({ status: 401, message: 'Invalid/Missing API key' });
  }

  try {
    const url = 'https://api.openai.com/v1/models';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${apiKey}`,
      },
    };
    const response = await fetch(url, requestOptions);

    const { data } = await response.json();

    const models: string[] = data.map(({ id }: OpenAIApiModel) => id);

    // filter chat models available for user

    const chatModels = models
      .filter((model) => model in OpenAIChatModels)
      .map((model) => OpenAIChatModels[model as keyof typeof OpenAIChatModels])
      .sort((a, b) => (b.maxLimit ?? 0) - (a.maxLimit ?? 0));

    return NextResponse.json({
      status: 200,
      allModels: models,
      chatModels,
    });
  } catch (e: any) {
    console.error('error', { e });
    return NextResponse.json({ status: e.response.status, message: e.response.data });
  }
}
