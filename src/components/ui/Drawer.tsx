import React from "react"

interface DrawerProps {
    open: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    position?: "left" | "right" | "bottom"
    width?: string
}

const Drawer: React.FC<DrawerProps> = ({
    open,
    onClose,
    title = "Drawer",
    children,
    position = "right",
    width = "w-[380px]"
}) => {
    const positionClasses = {
        right: {
            drawer: `right-0 top-0 h-full ${width}`,
            open: "translate-x-0",
            close: "translate-x-full"
        },

        left: {
            drawer: `left-0 top-0 h-full ${width}`,
            open: "translate-x-0",
            close: "-translate-x-full"
        },

        bottom: {
            drawer: "bottom-0 left-0 w-full h-[400px]",
            open: "translate-y-0",
            close: "translate-y-full"
        }
    }

    const current = positionClasses[position]

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm
          transition-all duration-300 z-40
          ${open
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }
        `}
            />

            {/* Drawer */}
            <div
                className={`
          fixed bg-slate-900 border border-slate-800
          shadow-2xl z-50
          transition-transform duration-300 ease-in-out
          ${current.drawer}
          ${open ? current.open : current.close}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-800">
                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="
              px-3 py-1 rounded-md
              bg-slate-800 text-white
              hover:bg-slate-700
              transition-colors
            "
                    >
                        Close
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 overflow-y-auto h-[calc(100%-72px)] text-slate-300">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Drawer