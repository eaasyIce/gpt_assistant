import { useState, useMemo, useEffect } from 'react';

import MiniSearch from 'minisearch';
import { useRouter } from 'next/router';
import { HiPlus } from 'react-icons/hi2';

import Button from '@/components/Button';
import { Input } from '@/components/InputField';
import { Role } from '@/types';

import RoleCard from './RoleCard';
import RoleEditor from './RoleEditor';
import { getRandomColor } from './utils/colors';
import rolesList from './utils/roleLibarary.json';
const RoleLibraryPage = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState(rolesList);

    // minisearch
    const miniSearch = useMemo(() => {
        const search = new MiniSearch({
            fields: ['roleName'],
            storeFields: ['roleName', 'prompt'],
        });
        search.addAll(rolesList);
        return search;
    }, []);

    useEffect(() => {
        const matchedIdList = miniSearch
            .search(searchInput, { prefix: true, fuzzy: 0.2 })
            .map((match) => match.id);
        if (matchedIdList.length !== 0) {
            setSearchResults(rolesList.filter((role) => matchedIdList.includes(role.id)));
        } else {
            setSearchResults(rolesList);
        }
    }, [miniSearch, searchInput]);

    const toggleEditor = () => {
        setIsEditorOpen(!isEditorOpen);
    };

    // prevent re-generating card colors on every render
    const cardColors = useMemo(() => {
        return rolesList.map(() => getRandomColor());
    }, []);

    const cards = searchResults.map((role, index) => {
        const color = cardColors[index];
        return <RoleCard key={index} role={role} bgColor={color} />;
    });
    return (
        <div className="h-full w-full overflow-y-scroll">
            <div className="my-4 flex items-center justify-center gap-5">
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search AI Role Library"
                    // styles="max-w-[15rem]"
                />
                <Button
                    text={'Add Role'}
                    Icon={HiPlus}
                    onClick={toggleEditor}
                    shadow={true}
                    border={true}
                    size="lg"
                />
            </div>
            <div
                className="grid animate-slideIn auto-cols-auto grid-cols-1 gap-2 
                p-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:p-8 xl:grid-cols-4 xl:gap-5 xl:p-10"
            >
                {cards}
            </div>

            {isEditorOpen ? <RoleEditor isOpen={isEditorOpen} toggleModal={toggleEditor} /> : null}
        </div>
    );
};
export default RoleLibraryPage;
