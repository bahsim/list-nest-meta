import dotenv from 'dotenv';
dotenv.config();

/**
 * Supported LLM providers.
 */
export type LLMProvider = 'openai'; // TODO: Add 'anthropic', 'azure', etc.

/**
 * Call the configured LLM provider with a prompt and return the response.
 * @param prompt The prompt string to send to the LLM.
 * @returns The LLM's response as a string.
 */
export async function callLLM(prompt: string): Promise<string> {
  const provider = (process.env.LLM_PROVIDER || 'openai') as LLMProvider;
  if (provider === 'openai') {
    return callOpenAI(prompt);
  }
  // TODO: Add support for other providers (Anthropic, Azure, local, etc.)
  throw new Error(`LLM provider not supported: ${provider}`);
}

/**
 * Call OpenAI's chat API with the given prompt.
 * @param prompt The prompt string.
 * @returns The LLM's response as a string.
 */
async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) throw new Error('Missing LLM_API_KEY in environment');
  const model = process.env.LLM_MODEL || 'gpt-3.5-turbo';
  const url = 'https://api.openai.com/v1/chat/completions';
  const body = {
    model,
    messages: [
      { role: 'system', content: 'You are an expert requirements engineer.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 2048
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${errText}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('No content in OpenAI response');
  return content.trim();
} 