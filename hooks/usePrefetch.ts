import { createContext, useState, useContext, ReactNode, FC } from 'react';
import React from 'react';

interface PrefetchData {
    [key: string]: { 
        hot: number; 
        not: number;
    };
}

interface PrefetchContextProps {
    prefetchedData: PrefetchData;
    setPrefetchedData: React.Dispatch<React.SetStateAction<PrefetchData>>;
}

const PrefetchContext = createContext<PrefetchContextProps | undefined>(undefined);

export const PrefetchProvider: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    const [prefetchedData, setPrefetchedData] = useState<PrefetchData>({});

    return React.createElement(PrefetchContext.Provider, {
        value: { prefetchedData, setPrefetchedData }
    }, children);
};

export const usePrefetch = () => {
    const context = useContext(PrefetchContext);
    if (!context) {
        throw new Error('usePrefetch must be used within a PrefetchProvider');
    }
    return context;
};

export type { PrefetchData }; 