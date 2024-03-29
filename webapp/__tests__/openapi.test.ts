import OpenAI from 'openai';
import {
  addMessageToThread,
  createAssistant,
  createRun,
  createThread,
  retrieveMessagesOfThread,
  retrieveThread,
  sendMessage
} from './openapi';

const itSkipIfCI = process.env.CI === 'true' ? it.skip : it;
itSkipIfCI.skip = it.skip; // to be able to skip both here and in CI

describe('a first openai test', () => {
  itSkipIfCI.skip('sendMessage', async () => {
    const openai = new OpenAI({ dangerouslyAllowBrowser: true });
    await expect(sendMessage(openai)).resolves.toEqual({
      finish_reason: 'stop',
      index: 0,
      logprobs: null,
      message: { content: expect.any(String), role: 'assistant' },
    });
  });

  itSkipIfCI.skip('createAssistant', async () => {
    const openai = new OpenAI({ dangerouslyAllowBrowser: true });
    const assistant = await createAssistant(openai);
    console.log(assistant);
    const _assistant = {
      id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF', // https://platform.openai.com/assistants/asst_Crm0yTwJZk8BrNUtSwn6fPKF
      object: 'assistant',
      created_at: 1711726122,
      name: 'Math Tutor',
      description: null,
      model: 'gpt-4-turbo-preview',
      instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
      tools: [{ type: 'code_interpreter' }],
      file_ids: [],
      metadata: {},
    };
  });

  itSkipIfCI.skip('createThread', async () => {
    const openai = new OpenAI({ dangerouslyAllowBrowser: true });
    const thread = await createThread(openai);
    console.log(thread);
    const _thread = {
      id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp', // https://platform.openai.com/threads/thread_rYPiknjBP3mJ59Z2JaLhSZPp
      object: 'thread',
      created_at: 1711726461,
      metadata: {},
    };
  });

  itSkipIfCI.skip('addMessageToThread', async () => {
    const openai = new OpenAI({ dangerouslyAllowBrowser: true });
    const thread = {
      id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp', // https://platform.openai.com/threads/thread_rYPiknjBP3mJ59Z2JaLhSZPp
      object: 'thread',
      created_at: 1711726461,
      metadata: {},
    };
    const message = await addMessageToThread(openai, thread);
    console.log(message);
    const _message = {
      id: 'msg_atcnCrnF2EzcI9ImMNXYGA4k',
      object: 'thread.message',
      created_at: 1711727041,
      assistant_id: null,
      thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
      run_id: null,
      role: 'user',
      content: [{ type: 'text', text: [Object] }],
      file_ids: [],
      metadata: {},
    };
  });

  itSkipIfCI.skip(
    'createRun',
    async () => {
      const openai = new OpenAI({ dangerouslyAllowBrowser: true });
      const assistant = {
        id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF', // https://platform.openai.com/assistants/asst_Crm0yTwJZk8BrNUtSwn6fPKF
        object: 'assistant',
        created_at: 1711726122,
        name: 'Math Tutor',
        description: null,
        model: 'gpt-4-turbo-preview',
        instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
        tools: [{ type: 'code_interpreter' }],
        file_ids: [],
        metadata: {},
      };
      const thread = {
        id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp', // https://platform.openai.com/threads/thread_rYPiknjBP3mJ59Z2JaLhSZPp
        object: 'thread',
        created_at: 1711726461,
        metadata: {},
      };
      const response = await createRun(openai, assistant, thread);
      console.log(JSON.stringify(response, null, 2));
      const _response = {
        success: true,
        messages: {
          options: {
            method: 'get',
            path: '/threads/thread_rYPiknjBP3mJ59Z2JaLhSZPp/messages',
            query: {},
            headers: {
              'OpenAI-Beta': 'assistants=v1',
            },
          },
          response: {
            size: 0,
            timeout: 0,
          },
          body: {
            object: 'list',
            data: [
              {
                id: 'msg_atcnCrnF2EzcI9ImMNXYGA4k',
                object: 'thread.message',
                created_at: 1711727041,
                assistant_id: null,
                thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
                run_id: null,
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: {
                      value: 'I need to solve the equation `3x + 11 = 14`. Can you help me?',
                      annotations: [],
                    },
                  },
                ],
                file_ids: [],
                metadata: {},
              },
              {
                id: 'msg_jtT2ZEXinBcZCfZaCbMbqG7w',
                object: 'thread.message',
                created_at: 1711727578,
                assistant_id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF',
                thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
                run_id: 'run_q9R000TANFIzvXUmvxOO7z8P',
                role: 'assistant',
                content: [
                  {
                    type: 'text',
                    text: {
                      value:
                        "Yes, I can help you solve the equation \\(3x + 11 = 14\\). The goal is to solve for \\(x\\).\n\nTo do this, we'll follow these steps:\n1. Subtract 11 from both sides of the equation to isolate the term with \\(x\\) on one side.\n2. Divide both sides by 3 to solve for \\(x\\).\n\nLet's do the math:",
                      annotations: [],
                    },
                  },
                ],
                file_ids: [],
                metadata: {},
              },
              {
                id: 'msg_aVuHk6bxyL45teCdSNlp0nY5',
                object: 'thread.message',
                created_at: 1711727587,
                assistant_id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF',
                thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
                run_id: 'run_q9R000TANFIzvXUmvxOO7z8P',
                role: 'assistant',
                content: [
                  {
                    type: 'text',
                    text: {
                      value: 'The solution to the equation \\(3x + 11 = 14\\) is \\(x = 1\\).',
                      annotations: [],
                    },
                  },
                ],
                file_ids: [],
                metadata: {},
              },
              {
                id: 'msg_1E1oLwsDSBGUTynKH8gGb5sS',
                object: 'thread.message',
                created_at: 1711727667,
                assistant_id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF',
                thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
                run_id: 'run_jBCE1e5TaEuAQQykBpx5p8NZ',
                role: 'assistant',
                content: [
                  {
                    type: 'text',
                    text: {
                      value: "Is there anything else you'd like to work on or any other questions you might have?",
                      annotations: [],
                    },
                  },
                ],
                file_ids: [],
                metadata: {},
              },
            ],
            first_id: 'msg_RxjWcGK9gYL7zzlqZHuDQSn6',
            last_id: 'msg_atcnCrnF2EzcI9ImMNXYGA4k',
            has_more: false,
          },
          data: [
            {
              id: 'msg_atcnCrnF2EzcI9ImMNXYGA4k',
              object: 'thread.message',
              created_at: 1711727041,
              assistant_id: null,
              thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
              run_id: null,
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: {
                    value: 'I need to solve the equation `3x + 11 = 14`. Can you help me?',
                    annotations: [],
                  },
                },
              ],
              file_ids: [],
              metadata: {},
            },
            {
              id: 'msg_jtT2ZEXinBcZCfZaCbMbqG7w',
              object: 'thread.message',
              created_at: 1711727578,
              assistant_id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF',
              thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
              run_id: 'run_q9R000TANFIzvXUmvxOO7z8P',
              role: 'assistant',
              content: [
                {
                  type: 'text',
                  text: {
                    value:
                      "Yes, I can help you solve the equation \\(3x + 11 = 14\\). The goal is to solve for \\(x\\).\n\nTo do this, we'll follow these steps:\n1. Subtract 11 from both sides of the equation to isolate the term with \\(x\\) on one side.\n2. Divide both sides by 3 to solve for \\(x\\).\n\nLet's do the math:",
                    annotations: [],
                  },
                },
              ],
              file_ids: [],
              metadata: {},
            },
            {
              id: 'msg_aVuHk6bxyL45teCdSNlp0nY5',
              object: 'thread.message',
              created_at: 1711727587,
              assistant_id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF',
              thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
              run_id: 'run_q9R000TANFIzvXUmvxOO7z8P',
              role: 'assistant',
              content: [
                {
                  type: 'text',
                  text: {
                    value: 'The solution to the equation \\(3x + 11 = 14\\) is \\(x = 1\\).',
                    annotations: [],
                  },
                },
              ],
              file_ids: [],
              metadata: {},
            },
            {
              id: 'msg_1E1oLwsDSBGUTynKH8gGb5sS',
              object: 'thread.message',
              created_at: 1711727667,
              assistant_id: 'asst_Crm0yTwJZk8BrNUtSwn6fPKF',
              thread_id: 'thread_rYPiknjBP3mJ59Z2JaLhSZPp',
              run_id: 'run_jBCE1e5TaEuAQQykBpx5p8NZ',
              role: 'assistant',
              content: [
                {
                  type: 'text',
                  text: {
                    value: "Is there anything else you'd like to work on or any other questions you might have?",
                    annotations: [],
                  },
                },
              ],
              file_ids: [],
              metadata: {},
            },
          ],
        },
        presentableMessages: [
          'user > I need to solve the equation `3x + 11 = 14`. Can you help me?',
          "assistant > Yes, I can help you solve the equation \\(3x + 11 = 14\\). The goal is to solve for \\(x\\).\n\nTo do this, we'll follow these steps:\n1. Subtract 11 from both sides of the equation to isolate the term with \\(x\\) on one side.\n2. Divide both sides by 3 to solve for \\(x\\).\n\nLet's do the math:",
          'assistant > The solution to the equation \\(3x + 11 = 14\\) is \\(x = 1\\).',
          "assistant > Is there anything else you'd like to work on or any other questions you might have?",
        ],
      };
    },
    60 * 1000
  );

  itSkipIfCI.skip('retrieveMessagesOfThread', async () => {
    const openai = new OpenAI({ dangerouslyAllowBrowser: true });
    const message = await retrieveMessagesOfThread(openai, 'thread_tGe4ig9xmAcXxXMf0H7J4nr3', 3);
    console.log(JSON.stringify(message, null, 2));
    const _message = null;
  });

  itSkipIfCI.skip('retrieveThread', async () => {
    const openai = new OpenAI({ dangerouslyAllowBrowser: true });
    const thread = await retrieveThread(openai, 'thread_tGe4ig9xmAcXxXMf0H7J4nr3');
    console.log(JSON.stringify(thread, null, 2));
    const _thread = {
      id: 'thread_tGe4ig9xmAcXxXMf0H7J4nr3',
      object: 'thread',
      created_at: 1711733837,
      metadata: {},
    };
  });
});
