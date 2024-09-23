import React, {createContext, ReactNode, useContext, useState} from 'react';
import Quote from './quoteClass';

const QuoteContext = createContext<Quote | undefined>(undefined);

interface QuoteProviderProps {
    children: ReactNode;
}

export const QuoteProvider: React.FC<QuoteProviderProps> = ({children}) => {
    const [quote] = useState(new Quote());

    return <QuoteContext.Provider value={quote}>{children}</QuoteContext.Provider>;
};

export const useQuote = () => {
    const context = useContext(QuoteContext);
    if (context === undefined) {
        throw new Error('useQuote must be used within a QuoteProvider');
    }
    return context;
};