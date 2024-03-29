import OpenAI from 'openai';

async function main(openai) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  });

  return completion.choices[0];
}

const itSkipIfCI = process.env.GITHUB_ACTIONS === 'true' ? it.skip : it;

describe('a first openai test', () => {
  itSkipIfCI('sends a message to openai', async () => {
    const openai = new OpenAI({ dangerouslyAllowBrowser: true });
    await expect(main(openai)).resolves.toEqual({
      finish_reason: 'stop',
      index: 0,
      logprobs: null,
      message: { content: expect.any(String), role: 'assistant' },
    });
  });
});
