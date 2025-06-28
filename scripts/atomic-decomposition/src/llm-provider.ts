import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Supported LLM providers.
 */
export type LLMProvider = 'openai'; // TODO: Add 'anthropic', 'azure', etc.

// Initialize OpenAI client using the official package
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Call the configured LLM provider with a prompt and return the response.
 * @param prompt The prompt string to send to the LLM.
 * @returns The LLM's response as a string.
 */
export async function callLLM(prompt: string): Promise<string> {
    return callOpenAI(prompt);
}

/**
 * Call OpenAI's chat API with the given prompt using the official openai package.
 * @param prompt The prompt string.
 * @returns The LLM's response as a string.
 */
async function callOpenAI(prompt: string): Promise<string> {
  const model = process.env.OPENAI_MODEL || 'gpt-4o';
  // Use the OpenAI SDK for chat completions
  const completion = await openai.chat.completions.create({
    model: model,
    messages: [
      { role: 'system', content: 'You are an expert requirements engineer.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 2048
  });
  const content = completion.choices?.[0]?.message?.content;
  if (!content) throw new Error('No content in OpenAI response');
  return content.trim();
} 