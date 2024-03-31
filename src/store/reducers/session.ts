import { createReducer } from '@reduxjs/toolkit'
import { setContents } from '../actions/data'
import { setLocalStorageData, getLocalStorageData, setCookieData, getCookieData } from '../../utility/functions'

interface SessionReducer {
    session: {
        sessionId: string
        token: string
    }
}

const initialState: SessionReducer = {
    session: {
        sessionId: '',
        token: ''
    }
}

const sessionReducer = createReducer<SessionReducer>(initialState, (builder) => {
    builder.addCase(setContents, (state, action) => {
        const actions = JSON.parse(JSON.stringify(action))
        const oldSession = getCookieData('sessionId') as string

        console.log(oldSession, 'oldSession')

        state.session.sessionId = actions.payload.sessionId

        oldSession ? setCookieData('sessionId', state.session.sessionId, 30) : setCookieData('sessionId', oldSession, 30)
        state.session.token = actions.payload.token
        setLocalStorageData('accessToken', state.session.token)
    })
})

export default sessionReducer
