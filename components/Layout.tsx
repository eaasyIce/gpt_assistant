import { Suspense, useEffect, useState } from 'react';

import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import useWindowDimensions from '@/hooks/useWindowDimension';
import { setAllChats, setCurrentChat } from '@/store/chatsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAllMessages } from '@/store/messagesSlice';
import { setAllRoles } from '@/store/rolesSlice';
import { toggleSidebar } from '@/store/uiSlice';
import { Chat, Message, Role } from '@/types';
import * as idb from '@/utils/indexedDB';
import templateData from '@/utils/templateData';

import Sidebar from './sidebar/Sidebar';
import Alert from './Alert';
import Loading from './LoadingPage';
import StyledTooltip from './Tooltip';
type Props = { children: React.ReactNode };
export default function Layout({ children }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

    const handleClickSidebar = () => {
        dispatch(toggleSidebar());
    };

    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (width && width <= 640 && sidebarOpen) {
            handleClickSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.id]);

    useEffect(() => {
        if (!router.isReady) return;

        const loadState = async () => {
            const returnVisit = localStorage.getItem('returnVisit');
            if (!returnVisit) {
                dispatch(setAllChats(templateData.chats));
                dispatch(setAllMessages(templateData.messages));
                dispatch(setAllRoles(templateData.roles));
                await idb.set('chats', templateData.chats);
                await idb.set('messages', templateData.messages);
                await idb.set('roles', templateData.roles);
                localStorage.setItem('returnVisit', 'true');
                setIsLoading(false);
                return;
            }
            const roles: Role[] = await idb.get('roles');
            if (roles) {
                dispatch(setAllRoles(roles));
            }
            const chats: Chat[] = await idb.get('chats');
            if (chats) {
                dispatch(setAllChats(chats));
            }
            const messages: Message[] = await idb.get('messages');
            if (messages) {
                dispatch(setAllMessages(messages));
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
            localStorage.setItem('returnVisit', 'true');
            setIsLoading(false);
        };
        loadState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (isLoading) return <Loading />;

    return (
        <>
            <Head>
                <title>GPT Assistant</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <div id="layout" className="fixed inset-0 flex h-full">
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={handleClickSidebar} />
                <div
                    className={clsx(
                        'relative flex h-full w-full flex-col overflow-x-auto overflow-y-clip',
                        {
                            'blur-3xl': width && width < 640 && sidebarOpen,
                        }
                    )}
                    //
                >
                    <Navbar toggleSidebar={handleClickSidebar} />
                    <Suspense fallback={null}>{children}</Suspense>
                </div>
            </div>
            <Alert />
            <StyledTooltip
                anchorSelect=".tooltip"
                // place="top"
                render={({ content }) => <span>{content}</span>}
            />
        </>
    );
}
