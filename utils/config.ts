export const defaultSystemPrompt = `You are ChatGPT, a large language model trained by OpenAI. Respond in markdown. Current date: ${new Date().toLocaleDateString()}`;

export const errorMessage = {
    unauthorizedMsg: `It seems the API key you entered can't be authorized by OpenAI server. Please make sure you've entered a valid OpenAI API key and try again 🙏🏼`,
    badRequestMsg: `Oops.. The input length excceeds model's limitation. please reduce the length and try again`,
    serverErrorMsg: `Oops.. it seems there is an error on the OpenAI server 🙈 Please try again later.`,
};
