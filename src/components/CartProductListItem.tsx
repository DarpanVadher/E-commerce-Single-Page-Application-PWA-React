import React from 'react'
import { updateCartData, getCart } from '../store/actions/thunkActions'
import { useAppDispatch } from '../store/reducers/store'

const CartProductListItem: React.FC<{ product: any }> = ({ product }) => {
    const dispatch = useAppDispatch()

    // const [quantity, setQuantity] = useState(product.quantity)

    const decreaseQuantity = async (quantity: any) => {
        // setQuantity(quantity - 1)
        await dispatch(updateCartData({ id: product.id, quantity: quantity - 1 }))
        await dispatch(getCart({ dispatch }))
    }

    const increaseQuantity = async (quantity: any) => {
        // setQuantity(quantity + 1)
        await dispatch(updateCartData({ id: product.id, quantity: quantity + 1 }))
        await dispatch(getCart({ dispatch }))
    }

    return (
        <li key={product.id} className="py-6 grid grid-cols-2 mt-2" style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
                    <img src={product.product.imageUrl} alt={product.product.name} className="h-full w-full object-cover object-center" width={90} />
                </div>
                <div>
                    <div className="text-base font-medium text-gray-900">{product.product.name}</div>
                    <p className="mt-1 text-sm text-gray-500">Quantity {product?.quantity}</p>
                    <div className="flex items-center mt-1 p-1">
                        <button onClick={() => decreaseQuantity(product?.quantity)} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                            -
                        </button>

                        {product?.quantity}

                        <button onClick={() => increaseQuantity(product?.quantity)} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md">
                            +
                        </button>
                    </div>
                    <p className="mt-1 text-base font-medium text-gray-900">{product.price}</p>
                </div>
            </div>
            {/* Add more details here if needed */}
        </li>
    )
}

export default CartProductListItem
