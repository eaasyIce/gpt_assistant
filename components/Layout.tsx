import Head from 'next/head';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Chat } from '@/types';
import * as idb from '@/utils/indexedDB';
import { useCallback, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAll } from '@/store/chatsSlice';
import { toggleSidebar } from '../store/uiSlice';
import SettingModal from './Sidebar/SettingModal';
import UsageModal from './Sidebar/UsageModal';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
    const dispatch = useAppDispatch();

    const isSidebarOpen = useAppSelector((state) => state.ui.sidebar);
    const onClickSidebar = useCallback(() => dispatch(toggleSidebar()), [dispatch]);

    // Add a loading state
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChats = async () => {
            const chats: Chat[] = await idb.get('chats');

            dispatch(setAll(chats));
            console.log(`in layout: loaded chats`);

            // Set loading state to false after chats are loaded
            // setLoading(false);
        };
        loadChats();
    }, []);

    return (
        <div>
            <Head>
                <title>cb</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='flex'>
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={onClickSidebar} />
                <main
                    className={`flex flex-col flex-grow h-screen transition-width duration-300 items-center justify-between
                    ${isSidebarOpen ? 'ml-64' : ''}`}
                >
                    <Header toggleSidebar={onClickSidebar} />
                    {children}
                </main>
                <SettingModal />
                <UsageModal />
            </div>
        </div>
    );
}
