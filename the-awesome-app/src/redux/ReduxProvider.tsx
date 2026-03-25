'use client'

import { Provider } from "react-redux"
import { store } from "./store"
import { JSX } from "react"

type ReduxProviderProps = {
    children: JSX.Element
}

export default function ReduxProvider(props: ReduxProviderProps){
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}