import { MessageTree } from './messageTree';

export interface Parameters {
    temperature: number;
    apiKey?: string;
    systemPrompt?: string;
    model: string;
}

export interface Message {
    id: string;
    chatID: string;
    parentID?: string;
    timestamp: number; // epoch time
    role: string;
    content: string;
    parameters?: Parameters;
}

export interface Chat {
    id: string;
    messages: Message[];
    title?: string | null; // |: Union Types ≥
    created: number;
    updated: number;
    // deleted?: boolean;
}

export interface OpenAIMessage {
    role: string;
    content: string;
}
