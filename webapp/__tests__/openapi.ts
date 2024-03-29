export async function sendMessage(openai) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0];
}

export async function createAssistant(openai) {
  const assistant = await openai.beta.assistants.create({
    name: 'Math Tutor',
    instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4-turbo-preview',
  });
  return assistant;
}

export async function createThread(openai) {
  const thread = await openai.beta.threads.create();
  return thread;
}

export const addMessageToThread = async (openai, thread) => {
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: 'I need to solve the equation `3x + 11 = 14`. Can you help me?',
  });
  return message;
};

export const createRun = async (openai, assistant, thread) => {
  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: 'Please address the user as Jane Doe. The user has a premium account.',
  });

  while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    run = await openai.beta.threads.runs.retrieve(run.thread_id, run.id);
  }

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const presentableMessages = messages.data
      .reverse()
      .map((message) => `${message.role} > ${message.content[0].text.value}`);
    return { success: true, messages, presentableMessages };
  } else {
    return { success: false, status: run.status };
  }
};
