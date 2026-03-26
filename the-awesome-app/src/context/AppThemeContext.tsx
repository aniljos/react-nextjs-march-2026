'use client'

import React, { JSX, useState } from "react";

export type ThemeState = {
    mode: string;
    changeTheme : (mode: string ) => void
}

const initialState: ThemeState = {
    mode: "light",
    changeTheme: (mode) => {
        
    }
}

// context/store
export const AppThemeContext = React.createContext(initialState)

export function AppThemeContextProvider({children}: {children: JSX.Element}){

    const [mode, setMode] = useState(initialState.mode);

    return (
        <AppThemeContext.Provider value={{mode, changeTheme: setMode}}>
            {children}
        </AppThemeContext.Provider>
    )
}