import { createReducer } from '@reduxjs/toolkit'
import { setProducts } from '../actions/product'

interface ProductReducer {
    products: Object[]
}

const initialState: ProductReducer = {
    products: []
}

const productReducer = createReducer<ProductReducer>(initialState, (builder) => {
    builder.addCase(setProducts, (state, action) => {
        const actions = JSON.parse(JSON.stringify(action))
        state.products = actions.payload
    })
})

export default productReducer
