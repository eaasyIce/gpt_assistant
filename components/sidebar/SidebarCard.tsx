import React from 'react';

import clsx from 'clsx';

const cardClasses =
    'bg-white dark:bg-white-inverted hover:brightness-95 dark:hover:brightness-150 transition-all duration-150 flex animate-sideSlide h-11 min-h-[3rem] cursor-pointer items-center justify-between gap-1 rounded-md p-2 relative group mx-2';

const SidebarCard = (props: {
    children: React.ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={props.onClick}
            className={clsx(cardClasses, {
                'ring-[1.5px] ring-colorPrimary': props.isSelected,
            })}
        >
            {props.children}
        </div>
    );
};

export default SidebarCard;
