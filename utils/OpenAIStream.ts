import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { NextRequest } from 'next/server';

export async function OpenAIStream(req: NextRequest) {
    const authValue = req.headers.get('Authorization') ?? '';
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let counter = 0;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: authValue,
        },
        method: 'POST',
        body: req.body,
        signal: AbortSignal.timeout(3 * 60 * 1000),
    });
    if (!res.ok) {
        console.log(`In OpenAIStream: Error: ${res.statusText} ${res.status}`);
        throw new Error(res.statusText, { cause: res.status });
    }
    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    const data = event.data;
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    // try {
                    const json = JSON.parse(data);

                    const text = json.choices[0].delta?.content || '';
                    console.log(
                        `event.data.choices.delta.content: ${JSON.stringify(text, null, 2)}`
                    );

                    if (counter < 2 && (text.match(/\n/) || []).length) {
                        //  prefix character (i.e., "\n\n"), do nothing
                        return;
                    }
                    const queue = encoder.encode(text);
                    controller.enqueue(queue);
                    counter++;
                }
            }

            const parser = createParser(onParse);
            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });

    return stream;

}
