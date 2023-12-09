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
