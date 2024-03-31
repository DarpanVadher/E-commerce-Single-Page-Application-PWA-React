import { createReducer } from '@reduxjs/toolkit'
import { setCart } from '../actions/cart'

interface CartReducer {
    Cart_Details: any
    cart: {
        Cart_Details: object[]
    }
}

const initialState: CartReducer = {
    cart: {
        Cart_Details: []
    },
    Cart_Details: undefined
}

const cartReducer = createReducer<CartReducer>(initialState, (builder) => {
    builder.addCase(setCart, (state, action) => {
        const actions = JSON.parse(JSON.stringify(action))

        console.log(actions.payload, 'actions.payload')
        state.cart = actions.payload
    })
})

export default cartReducer
