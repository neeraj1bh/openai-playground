import { OpenAIModel } from './types';

export const OpenAIChatModels: Record<string, OpenAIModel> = {
  'gpt-4': {
    id: 'gpt-4',
    inputCost: 0.00003,
    outputCost: 0.00006,
    maxLimit: 8192,
  },
  'gpt-4-0613': {
    id: 'gpt-4-0613',
    inputCost: 0.00003,
    outputCost: 0.00006,
    maxLimit: 8192,
  },
  'gpt-4-32k': {
    id: 'gpt-4-32k',
    inputCost: 0.00006,
    outputCost: 0.00012,
    maxLimit: 32768,
  },
  'gpt-4-32k-0613': {
    id: 'gpt-4-32k-0613	',
    inputCost: 0.00006,
    outputCost: 0.00012,
    maxLimit: 32768,
  },

  'gpt-3.5-turbo': {
    id: 'gpt-3.5-turbo',
    inputCost: 0.0000015,
    outputCost: 0.000002,
    maxLimit: 4096,
  },
  'gpt-3.5-turbo-0613': {
    id: 'gpt-3.5-turbo-0613',
    inputCost: 0.0000015,
    outputCost: 0.000002,
    maxLimit: 4096,
  },
  'gpt-3.5-turbo-16k': {
    id: 'gpt-3.5-turbo-16k',
    inputCost: 0.000003,
    outputCost: 0.000004,
    maxLimit: 16384,
  },
  'gpt-3.5-turbo-16k-0613': {
    id: 'gpt-3.5-turbo-16k-0613',
    inputCost: 0.000003,
    outputCost: 0.000004,
    maxLimit: 16384,
  },
};
