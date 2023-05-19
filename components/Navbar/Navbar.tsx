import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { HiMoon, HiOutlineSun, HiBars3, HiPlus } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { selectChatById } from '@/store/chatsSlice';
import { createNewChat } from '@/utils/chats';

import Button from '../Button';
type Props = {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
};

const navbarClasses =
    'flex-shrink-0 flex h-16 w-full justify-between items-center  px-4 py-3  transition-all duration-300';

export default function Navbar({ toggleSidebar, isSidebarOpen }: Props) {
    const router = useRouter();
    // const { id } = router.query;
    const chatID = useSelector((state: RootState) => state.chats.currentChatID);
    const chat = useSelector((state: RootState) => selectChatById(state, chatID as string));
    // useEffect(() => {
    //     router.push(`/chat/${chatID}`);
    //     console.log('🚀 ~ file: Navbar.tsx:29 ~ useEffect ~ chatID:', chatID);
    // }, [chatID]);
    const { theme, setTheme } = useTheme();
    const handleClickNewChat = () => {
        createNewChat();
    };
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={navbarClasses}>
            {isSidebarOpen ? null : <Button Icon={HiBars3} size="lg" onClick={toggleSidebar} />}
            <span className="max-w-[50%] truncate">
                {chat?.title}
                {/* <h1 className="debug-1 text-primary truncate">{chat?.title}</h1> */}
            </span>
            <div className="flex items-center justify-end gap-2">
                <Button Icon={HiPlus} size="md" border={true} onClick={handleClickNewChat} />
                <Button
                    Icon={theme === 'dark' ? HiOutlineSun : HiMoon}
                    onClick={toggleTheme}
                    border={true}
                    size="md"
                />
            </div>
        </div>
    );
}
