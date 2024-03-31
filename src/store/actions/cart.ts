import { createAction } from '@reduxjs/toolkit'

export const setCart = createAction<string[]>('cart/setCart')
export const addtoCart = createAction<string[]>('cart/addtoCart')
export const updateCart = createAction<string[]>('cart/updateCart')
export const updatePayment = createAction<string[]>('cart/updatePayment')
