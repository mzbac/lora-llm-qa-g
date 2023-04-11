type ModelName =
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-0301"
  | "gpt-4"
  | "gpt-4-0314";

type ChatGPTRequest = {
  model: ModelName;
  messages: Message[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  user?: string;
};

export interface Message {
  role: "system" | "user";
  content: string;
}

export interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: {
      role: "assistant";
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
}

export function getConfiguredChatGPTRequest(
  messages: Message[]
): ChatGPTRequest {
  return {
    messages,
    max_tokens: 2000,
    model: "gpt-3.5-turbo",
    temperature: 0,
  };
}
