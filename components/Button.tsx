////////69//https://github.com/Yidadaa/ChatGPT-Next-Web/blob/main/app/components/button.tsx
import clsx from "clsx";

interface Props {
    onClick?: () => void;
    Icon?: React.ElementType;
    iconEffect?: boolean;
    text?: string;
    border?: boolean;
    shadow?: boolean;
    title?: string;
    disabled?: boolean;
    size: "sm" | "md" | "lg";
    type?: "submit" | "reset" | "button" | undefined;
    iconStyles?: string;
    btnStyles?: string;
}

const btnClasses = {
    base: "flex items-center justify-center gap-2 rounded-md max-w-xs max-h-[3rem] font-normal transition-all text-light-text dark:text-dark-text active:scale-[0.9]",
    shadow: "hover:bg-gray-200 dark:hover:bg-gray-700",
    border: "border-[1px] border-gray-300 hover:border-cyan-700",
    sm: "px-1 py-1 text-sm",
    md: "px-2 py-2 text-base",
    lg: "px-2 py-2 text-lg",
    disabled: "cursor-not-allowed",
};

const iconClasses = {
    base: "text-light-text dark:text-dark-text",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    iconEffect: "hover:scale-[1.1]",
};
const Button = ({
    onClick,
    Icon,
    iconEffect,
    text,
    border = false,
    shadow = false,
    disabled,
    size,
    type,
    iconStyles,
    btnStyles,
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                btnClasses.base,
                btnClasses[size],
                shadow && btnClasses.shadow,
                border && btnClasses.border,
                disabled && btnClasses.disabled,
                btnStyles
            )}
        >
            {Icon && (
                <Icon
                    className={clsx(
                        iconClasses.base,
                        iconClasses[size],
                        iconStyles,
                        iconEffect && iconClasses.iconEffect
                    )}
                />
            )}
            {text && <p className=" mx-1 whitespace-nowrap">{text}</p>}
        </button>
    );
};

export default Button;
