import React, { useEffect } from 'react'
import { Icons } from './icons'
import { twMerge } from 'tailwind-merge'
interface Props {
    className?: string,
    size?: number
}
const Loading = ({ className, size }: Props) => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, []);
    return (
        <div className={twMerge("fixed h-screen z-50 w-full inset-0 flex justify-center items-center", className)}>
            <Icons.loading size={size} />
        </div>
    )
}

export default Loading
