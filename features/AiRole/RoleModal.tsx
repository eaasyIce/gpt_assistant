import { useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import ModalWrapper from '@/components/Modal';
// import Tooltip from '@/components/Tooltip';
import { useKeyPress } from '@/hooks/useKeyPress';
import { Role } from '@/types';
interface Props {
    isOpen: boolean;
    role?: Role;
    isTemplate?: boolean;
    toggleModal: () => void;
    handleClickUse: (e: React.MouseEvent) => void;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
    handleClickAdd?: (e: React.MouseEvent) => void;
}

const RoleModal = (props: Props) => {
    const escapePressed = useKeyPress('Escape');
    useEffect(() => {
        if (escapePressed) {
            props.toggleModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [escapePressed]);
    
    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="border-color mx-5 flex max-h-[50%] min-h-[20rem] w-full max-w-lg flex-col justify-between gap-1 space-y-5 overflow-auto rounded-xl border bg-white p-6 text-left shadow-xl dark:bg-white-inverted"
            >
                <div className="flex items-center justify-between">
                    <span className="text-2xl text-gray-500 dark:text-gray-400">Detail</span>
                    <Button
                        btnSize="lg"
                        Icon={HiOutlineXMark}
                        onClick={props.toggleModal}
                        shadow={true}
                    />
                </div>
                <span className="text-lg font-semibold sm:text-xl">{props.role?.roleName}</span>
                <div className="flex flex-grow flex-col gap-2 overflow-y-clip">
                    <span className="text-subtitle !text-base">Prompt</span>
                    <div className="overflow-y-auto text-base">{props.role?.prompt}</div>
                </div>
                <div id="btn-group" className="flex gap-2">
                    <Button
                        btnSize="lg"
                        text={'Use'}
                        onClick={props.handleClickUse}
                        border={true}
                        tooltipSelector="tooltip"
                        data-tooltip-content="Create a new chat"
                    />
                    {props.isTemplate ? (
                        <Button
                            btnSize="lg"
                            text={'Add to My List'}
                            onClick={props.handleClickAdd}
                            border={true}
                            tooltipSelector="tooltip"
                            data-tooltip-content="Create a new role"
                        />
                    ) : (
                        <>
                            <Button
                                btnSize="lg"
                                text={'Edit'}
                                onClick={props.handleClickEdit}
                                border={true}
                            />
                            <Button
                                btnSize="lg"
                                text={'Delete'}
                                onClick={props.handleClickDelete}
                                border={true}
                            />
                        </>
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};
export default RoleModal;
