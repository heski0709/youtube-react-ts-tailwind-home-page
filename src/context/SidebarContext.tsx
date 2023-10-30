import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

type SidebarContextType = {
    isLargeOpen: boolean;
    isSmallOpen: boolean;
    toggle: () => void;
    close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

type SidebarProviderProps = {
    children: ReactNode;
};

export const useSidebarConetxt = () => {
    const value = useContext(SidebarContext);

    if (value === null) throw Error('Cannot use outside of SidebarProvider');

    return value;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isLargeOpen, setIsLargeOpen] = useState(true);
    const [isSmallOpen, setIsSmallOpen] = useState(false);

    useEffect(() => {
        const handler = () => {
            if (!isScreenSmall()) setIsSmallOpen(false)
        }

        window.addEventListener("resize", handler)

        return () => {
            window.removeEventListener("resize", handler)
        }
    }, [])


    function isScreenSmall() {
        return window.innerWidth < 1024;
    }

    function toggle() {
        if (isScreenSmall()) {
            setIsSmallOpen((s) => !s);
        } else {
            setIsLargeOpen((l) => !l);
        }
    }

    function close() {
        if (isScreenSmall()) {
            setIsSmallOpen(false);
        } else {
            setIsLargeOpen(false);
        }
    }
    return (
        <SidebarContext.Provider
            value={{ isLargeOpen, isSmallOpen, toggle, close }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
