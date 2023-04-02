import { useEffect, useState, useRef, memo } from 'react';
import Input from './Input';
import ChatMessage from './ChatMessage';
import { Message } from '@/types';
import { selectChatById } from '@/store/chatsSlice';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { Chat } from '@/types';

function ChatPage({ chatID }: { chatID: string }) {
    console.log('🚀 ~ file: ChatPage.tsx:11 ~ ChatPage ~ chatID:', chatID);
    let messages: Message[] = useSelector((state: RootState) => selectChatById(state, chatID)?.messages || []);

    // const chat: Chat | undefined = useSelector((state: RootState) =>
    //     chatID ? selectChatById(state, chatID) : undefined
    // );
    // console.log('🚀 ~ file: ChatPage.tsx:15 ~ ChatPage ~ chat:', chat);

    // if (!chat) {
    //     return <div>no chat</div>;
    // }

    // const { messages } = chat;
    return (
        <div>
            {messages.length === 0 && <div>new msg. show home page stuff</div>}

            {messages && (
                <div>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message.content} />
                    ))}
                </div>
            )}
            <Input chatID={chatID} />
        </div>
    );
}
export default ChatPage;