import { Suspense, useCallback, useEffect, useState } from 'react';

import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import useWindowDimensions from '@/hooks/useWindowDimension';
import { setAllChats, setCurrentChat } from '@/store/chatsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAllMessages } from '@/store/messagesSlice';
import { setAllRoles } from '@/store/rolesSlice';
import { toggleSidebar } from '@/store/uiSlice';
import { Chat, Message, Role } from '@/types';
import * as idb from '@/utils/indexedDB';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Alert from './Alert';
import Loading from './Loading';
import StyledTooltip from './Tooltip';
type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

    const handleClickSidebar = useCallback(() => {
        dispatch(toggleSidebar());
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (width && width <= 640 && sidebarOpen) {
            handleClickSidebar();
        }
    }, [router.query.id]);

    useEffect(() => {
        if (!router.isReady) return;

        const loadRecords = async () => {
            const roles: Role[] = await idb.get('roles');
            if (roles) {
                dispatch(setAllRoles(roles));
            }
            const chats: Chat[] = await idb.get('chats');
            if (chats) {
                dispatch(setAllChats(chats));
            }
            dispatch(
                setCurrentChat(
                    typeof router.query.id === 'string'
                        ? router.query.id
                        : chats
                        ? chats[0]?.id
                        : ''
                )
            );
            setIsLoading(false);
            const messages: Message[] = await idb.get('messages');
            if (messages) {
                dispatch(setAllMessages(messages));
            }
        };
        loadRecords();
    }, [router.isReady]);

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <Head>
                <title>chatbot</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id="layout" className="fixed inset-0 flex h-full">
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={handleClickSidebar} />
                <div
                    className={clsx('relative flex h-full w-full flex-col overflow-x-auto overflow-y-clip', {
                        'blur-3xl': width && width < 640 && sidebarOpen,
                    })}
                    //
                >
                    <Navbar isSidebarOpen={sidebarOpen} toggleSidebar={handleClickSidebar} />
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                </div>
            </div>
            <Alert />
            <StyledTooltip
                anchorSelect=".tooltip"
                // place="top"
                render={({ content, activeAnchor }) => <span>{content}</span>}
            />
        </>
    );
}
