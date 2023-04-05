import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { startAppListening } from './listenerMiddleware';
import { Chat, Message } from '@/types';
import type { RootState } from '.';
import * as idb from '@/utils/indexedDB';

const chatsAdapter = createEntityAdapter<Chat>({
    selectId: (chat: Chat) => chat.id,
});
const initialState = chatsAdapter.getInitialState();

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setOne: chatsAdapter.setOne,
        setAll: chatsAdapter.setAll,
        updateOne: chatsAdapter.updateOne,
        removeOne: chatsAdapter.removeOne,
        removeAll: chatsAdapter.removeAll,

        addSingleMessage: (state, action: PayloadAction<{ chatID: string; message: Message }>) => {
            const { chatID, message } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.messages = [...existingChat.messages, message];
            } else {
                chatsAdapter.addOne(state, {
                    id: chatID,
                    messages: [message],
                    created: Date.now(),
                });
            }
        },
        // for streaming updates
        updateSingleMessage: (state, action: PayloadAction<{ chatID: string; chunkValue: string }>) => {
            const { chatID, chunkValue } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.messages[existingChat.messages.length - 1] = {
                    ...existingChat.messages[existingChat.messages.length - 1],
                    content: existingChat.messages[existingChat.messages.length - 1].content + chunkValue,
                };
            }
        },
        updateTitle: (state, action: PayloadAction<{ chatID: string; title: string }>) => {
            const { chatID, title } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.title = title;
            }
        },

        // for editing a message
        deleteMessageUpTo: (state, action: PayloadAction<{ message: Message }>) => {
            const { chatID, id: messageID } = action.payload.message;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                let updatedMessages: Message[] = [];
                for (let i = 0; i < existingChat.messages.length; i++) {
                    if (existingChat.messages[i].id === messageID) {
                        console.log(`in deleteMessageupTo. deleting message ${existingChat.messages[i].content}`);

                        // existingChat.messages.splice(i, 1);
                        break;
                    }
                    updatedMessages.push(existingChat.messages[i]);
                }
                existingChat.messages = updatedMessages;
            }

            console.log(`finished deleteMessageUpTo. length of messages: ${existingChat?.messages.length}`);
        },
    },
});

export const {
    setOne,
    setAll,
    updateOne,
    removeOne,
    removeAll,
    addSingleMessage,
    updateSingleMessage,
    updateTitle,
    deleteMessageUpTo,
} = chatsSlice.actions;
export default chatsSlice.reducer;

// Selectors
export const { selectById: selectChatById, selectAll: selectAllChats } = chatsAdapter.getSelectors(
    (state: RootState) => state.chats
);
