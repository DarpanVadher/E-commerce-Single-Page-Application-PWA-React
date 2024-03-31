import React, { useEffect } from 'react'

import RootComponent from './RootComponent'
import { persistor, store, useAppDispatch, useAppSelector } from './store/reducers/store'
import { getSession, getProduct, getCart } from './store/actions/thunkActions'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state)

    useEffect(() => {
        console.log(state, 'state')

        dispatch(getSession({ dispatch }))
        dispatch(getProduct(''))
        dispatch(getCart({ dispatch }))
    }, [])

    return <RootComponent />
}

export default App
