import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { Icons } from "./icons";
export type ACTION_TYPE = "submit" | "cancel" | "close" | "preview" | boolean;
interface ModalProps {
    open?: boolean;
    onOpenChange?: (open: ACTION_TYPE, data?: any) => void;
    trigger?: React.ReactNode;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    children: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    isDismissible?: boolean;
}

const Modal = ({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    className,
    showCloseButton = true,
    isDismissible = true,
}: ModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={(open) => onOpenChange?.(open,"cancel")}>
            {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
            <Dialog.Portal>
                <Dialog.Overlay
                    className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300"
                />
                <Dialog.Content
                    onPointerDownOutside={(e) => {
                        if (!isDismissible) e.preventDefault();
                    }}
                    onEscapeKeyDown={(e) => {
                        if (!isDismissible) e.preventDefault();
                    }}
                    className={twMerge(
                        "fixed left-[50%] top-[50%] z-[10001] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-48 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-48",
                        className
                    )}
                >
                    <div className="flex flex-col space-y-2 mb-4">
                        {title && (
                            <Dialog.Title className="text-xl font-semibold leading-none tracking-tight text-gray-900">
                                {title}
                            </Dialog.Title>
                        )}
                        {description && (
                            <Dialog.Description className="text-sm text-gray-500">
                                {description}
                            </Dialog.Description>
                        )}
                    </div>

                    {children}

                    {showCloseButton && (
                        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer">
                            <Icons.closeCircle size={24} className="text-gray-500" />
                        </Dialog.Close>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;