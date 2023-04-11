import axios from "axios";
import {
  ChatGPTResponse,
  getConfiguredChatGPTRequest,
  Message,
} from "./chatgpt-utils";

export async function chatWithGPT(
  apiKey: string,
  messages: Message[]
): Promise<string | null> {
  try {
    const chatGPTRequest = getConfiguredChatGPTRequest(messages);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    };
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      chatGPTRequest,
      { headers }
    );
    const { choices } = response.data as ChatGPTResponse;

    return choices[0]?.message?.content || null;
  } catch (error) {
    console.error(error.data);
    return null;
  }
}
