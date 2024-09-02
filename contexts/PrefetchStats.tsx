// context/PrefetchStats.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PrefetchContextProps {
    prefetchedData: { [key: string]: { hot: number; not: number } };
    setPrefetchedData: React.Dispatch<
        React.SetStateAction<{ [key: string]: { hot: number; not: number } }>
    >;
}

const PrefetchContext = createContext<PrefetchContextProps | undefined>(undefined);

interface PrefetchProviderProps {
    children: ReactNode;
}

export const PrefetchProvider: React.FC<PrefetchProviderProps> = ({ children }) => {
    const [prefetchedData, setPrefetchedData] = useState<{
        [key: string]: { hot: number; not: number };
    }>({});

    return (
        <PrefetchContext.Provider value={{ prefetchedData, setPrefetchedData }}>
            {children}
        </PrefetchContext.Provider>
    );
};

export const usePrefetch = () => {
    const context = useContext(PrefetchContext);
    if (!context) {
        throw new Error('usePrefetch must be used within a PrefetchProvider');
    }
    return context;
};