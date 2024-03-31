import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { getCart } from '../store/actions/thunkActions'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import Shipment from './Shipment'
import Payment from './Payment'
import CartProductListItem from './CartProductListItem'

const cart: React.FC = () => {
    // const [search, setSearch] = useState('')
    const dispatch = useAppDispatch()
    const cart = useAppSelector((state) => state.cart.cart)
    const [cartTotal, setcartTotal] = useState(0)
    const [taxTotal, settaxTotal] = useState(0)

    useEffect(() => {
        const cartTotal = cart?.Cart_Details?.reduce((acc, item: any) => {
            return acc + item?.product?.price * item?.quantity
        }, 0)
        setcartTotal(cartTotal)
        const taxTotal = cart?.Cart_Details?.reduce((acc, item: any) => {
            return acc + ((Number(item?.product?.price) * Number(item?.product?.tax)) / 100) * item?.quantity
        }, 0)
        settaxTotal(Math.ceil(taxTotal * 100) / 100)
    }, [cart])

    const getCartData = async () => {
        await dispatch(getCart({ dispatch }))
    }

    useEffect(() => {
        getCartData()
    }, [])

    const handleSearch = (event: React.FocusEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value, 'event')
    }

    return (
        <div
            style={{
                height: '80vh',
                // width: '100%',
                maxWidth: '100%',
                minWidth: '100px',
                // position: 'relative',
                top: '20px',
                bottom: '20px',
                paddingBottom: '20px'
            }}
        >
            <Card style={{ width: '100%', height: '30%', overflowY: 'scroll' }}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                    <ul role="list" className="my-6 divide-y divide-gray-200 divide-opacity-50 " style={{ height: '100%', listStyleType: 'none' }}>
                        {cart?.Cart_Details?.map((product: any) => <CartProductListItem product={product} />)}
                    </ul>
                </div>
            </Card>

            <Card style={{ width: '100%', height: 'content', marginTop: '10px' }}>
                <Card.Body>
                    <table style={{ width: '100%' }}>
                        <tr>
                            <td>Cart Total</td>
                            <td>₹ {cartTotal || 0} </td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid black' }}>
                            <td>Tax</td>
                            <td>₹ {taxTotal || 0} </td>
                        </tr>
                        <tr>
                            <td>Sub Total</td>
                            <td>₹ {taxTotal + cartTotal || 0} </td>
                        </tr>
                    </table>
                </Card.Body>
            </Card>

            <Shipment />

            <Payment />
        </div>
    )
}

export default cart
