import { createReducer } from '@reduxjs/toolkit'
import { updatePayment } from '../actions/cart'

interface PaymentReducer {
    payment: any
}

const initialState: PaymentReducer = {
    payment: {}
}

const cartReducer = createReducer<PaymentReducer>(initialState, (builder) => {
    builder.addCase(updatePayment, (state, action) => {
        const actions = JSON.parse(JSON.stringify(action))

        console.log(actions.payload, 'actions.payload')
        state.payment = actions.payload
    })
})

export default cartReducer
