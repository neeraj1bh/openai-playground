import { OpenAIChatModels } from './constants';
export interface OpenAIApiModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

export interface OpenAIModel {
  id: string;
  inputCost: number;
  outputCost: number;
  maxLimit: number;
}

export interface OpenAIConfig {
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface IPreset {
  name: string;
  description?: string;
  systemMessage: string;
  config: OpenAIConfig;
  createdOn: Date;
}

export interface TokenUsage {
  name: keyof typeof OpenAIChatModels;
  usage: number;
}
