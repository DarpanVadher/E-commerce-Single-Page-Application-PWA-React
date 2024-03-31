import { createAction } from '@reduxjs/toolkit'

export const setProducts = createAction<string[]>('product/setProducts')
