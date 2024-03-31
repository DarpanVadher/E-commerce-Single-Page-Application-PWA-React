// import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch } from '../reducers/store'
import { setContents } from './data'
import { setProducts } from './product'
import { setCart, addtoCart, updateCart, updatePayment } from './cart'
import CustomAxios from '../../utility/customAxios'
import { getLocalStorageData, getCookieData } from '../../utility/functions'

export const getSession = createAsyncThunk<void, { dispatch: AppDispatch }>('/getSessions', async ({ dispatch }) => {
    try {
        const sessionId = getCookieData('sessionId')
        const data: any[] = await CustomAxios.get(`/session`, {
            headers: {
                sessionId: sessionId || null
            }
        }).then((response) => response.data.data)

        console.log(data, 'data')

        // Set local storage

        dispatch(setContents(data))
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getProduct = createAsyncThunk<void, string, { dispatch: AppDispatch }>('/getProduct', async (search, { dispatch }) => {
    try {
        const accessToken = getLocalStorageData('accessToken')
        const sessionId = getCookieData('sessionId')

        const data: any[] = await CustomAxios.get(`/product`, {
            headers: {
                sessionId: sessionId,
                Authorization: `Bearer ${accessToken}`,
                search
            }
        }).then((response) => response.data.data)

        dispatch(setProducts(data))
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getCart = createAsyncThunk<void, { dispatch: AppDispatch }>('/getCart', async ({ dispatch }) => {
    try {
        const accessToken = getLocalStorageData('accessToken')
        const sessionId = getCookieData('sessionId')

        const data: any = await CustomAxios.get(`/cart`, {
            headers: {
                sessionId: sessionId,
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => response.data.data)

        dispatch(setCart(data))
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const addtoCartCart = createAsyncThunk<void, { id: number; quantity: number }, { dispatch: AppDispatch }>(
    '/addtoCart',
    async ({ id, quantity }, { dispatch }) => {
        try {
            const accessToken = getLocalStorageData('accessToken')
            const sessionId = getCookieData('sessionId')

            const data: any = await CustomAxios.post(
                `/cart/add`,
                {
                    productId: id,
                    quantity: quantity
                },
                {
                    headers: {
                        sessionId: sessionId,
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            ).then((response) => JSON.parse(JSON.stringify(response.data.data)))

            console.log(data, 'data')

            alert(data?.message)
            dispatch(addtoCart(data))
        } catch (e) {
            console.error(e)
            throw e
        }
    }
)

export const updateCartData = createAsyncThunk<void, { id: number; quantity: number }, { dispatch: AppDispatch }>(
    '/udpateCart',
    async ({ id, quantity }, { dispatch }) => {
        try {
            const accessToken = getLocalStorageData('accessToken')
            const sessionId = getCookieData('sessionId')

            const data: any = await CustomAxios.put(
                `/cart/update`,
                {
                    productId: id,
                    quantity: quantity
                },
                {
                    headers: {
                        sessionId: sessionId,
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            ).then((response) => JSON.parse(JSON.stringify(response.data.data)))

            console.log(data, 'data')

            alert(data?.message)
            dispatch(updateCart(data))
        } catch (e) {
            console.error(e)
            throw e
        }
    }
)

export const checkoutCart = createAsyncThunk<void, { billingAddress: string; shipingAddress: string }, { dispatch: AppDispatch }>(
    '/checkoutCart',
    async ({ billingAddress, shipingAddress }, { dispatch }) => {
        try {
            const accessToken = getLocalStorageData('accessToken')
            const sessionId = getCookieData('sessionId')

            const data: any = await CustomAxios.post(
                `/cart/checkout`,
                {
                    billingAddress,
                    shipingAddress
                },
                {
                    headers: {
                        sessionId: sessionId,
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            ).then((response) => JSON.parse(JSON.stringify(response.data.data)))

            console.log(data, 'data')

            dispatch(updatePayment(data))

            const cartData: any = await CustomAxios.get(`/cart`, {
                headers: {
                    sessionId: sessionId,
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((response) => response.data.data)

            dispatch(setCart(cartData))
        } catch (e) {
            console.error(e)
            throw e
        }
    }
)

export const checkPaymentStatus = createAsyncThunk<void, { id: string; shipmentId: string }, { dispatch: AppDispatch }>(
    '/checkPaymentStatus',
    async ({ id, shipmentId }, { dispatch }) => {
        try {
            const accessToken = getLocalStorageData('accessToken')
            const sessionId = getCookieData('sessionId')

            const data: any = await CustomAxios.get(`/cart/checkpaymentstatus`, {
                headers: {
                    sessionId: sessionId,
                    Authorization: `Bearer ${accessToken}`,
                    qr: id,
                    shipmentId: shipmentId
                }
            }).then((response) => JSON.parse(JSON.stringify(response.data.data)))

            console.log(data, 'data')

            dispatch(updatePayment(data))
        } catch (e) {
            console.error(e)
            throw e
        }
    }
)
