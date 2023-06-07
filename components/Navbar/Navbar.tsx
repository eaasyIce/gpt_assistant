import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { HiBars3, HiMoon, HiOutlineSun, HiPlus } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

import { selectCurrentChat } from '@/store/chatsSlice';
import { createNewChat } from '@/utils/chat';

import Button from '../Button';
type Props = {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
};

const navbarClasses =
    'nav flex-shrink-0 flex h-16 w-full justify-between items-center pr-3 py-3  transition-all duration-300';

export default function Navbar({ toggleSidebar, isSidebarOpen }: Props) {
    const router = useRouter();
    // const { id } = router.query;

    // const chatID = useSelector((state: RootState) => state.chats.currentChat.id);
    const chat = useSelector(selectCurrentChat);
    // console.log(`in navbar; chat.id: ${chat?.id}; router.query.id: ${router.pathname}`);
    const title = () => {
        if (router.pathname === '/role') {
            return 'Assistant Library';
        } else if (chat) {
            return chat.title;
        }
        return '';
    };
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
            {/* {isSidebarOpen ? null : <Button Icon={HiBars3} size="lg" onClick={toggleSidebar} />} */}
            {/* <div className="btn-sidebar debug-2 !blur-none !filter-none"> */}
            <Button Icon={HiBars3} btnSize="lg" onClick={toggleSidebar} />
            {/* </div> */}
            <span className=" mr-auto max-w-[80%] truncate pl-2 text-[1.1rem] font-medium">
                {title()}
                {/* <h1 className="debug-1 text-primary truncate">{chat?.title}</h1> */}
            </span>
            <div className="flex items-center justify-end gap-2">
                <Button Icon={HiPlus} btnSize="lg" border={true} onClick={handleClickNewChat} />
                <Button
                    Icon={theme === 'dark' ? HiOutlineSun : HiMoon}
                    onClick={toggleTheme}
                    border={true}
                    btnSize="lg"
                />
            </div>
        </div>
    );
}
