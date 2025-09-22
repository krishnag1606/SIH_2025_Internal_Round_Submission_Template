'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AppState = {
    // selectedLanguage: string;
    // setSelectedLanguage: (lang: string) => void;
    isDarkMode: boolean;
    setIsDarkMode: (val: boolean) => void;
    isOnline: boolean;
    setIsOnline: (val: boolean) => void;
    currentPatient: string;
    setCurrentPatient: (name: string) => void;
    viewMode: 'map' | 'list';
    setViewMode: (mode: 'map' | 'list') => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    // const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [currentPatient, setCurrentPatient] = useState('Rajesh Kumar');
    const [viewMode, setViewMode] = useState<'map' | 'list'>('list');

    // Optional: simulate online/offline
    useEffect(() => {
        const interval = setInterval(() => {
            setIsOnline(Math.random() > 0.3);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppContext.Provider
            value={{
                // selectedLanguage,
                // setSelectedLanguage,
                isDarkMode,
                setIsDarkMode,
                isOnline,
                setIsOnline,
                currentPatient,
                setCurrentPatient,
                viewMode,
                setViewMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used inside AppProvider');
    return context;
}
