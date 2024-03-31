import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { addtoCartCart, getCart, getProduct } from '../store/actions/thunkActions'

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.product.products)

    // const [search, setSearch] = useState('')

    /**
     * On component render sets the date state to current date and time
     */
    useEffect(() => {
        console.log(products, 'search')
    }, [products])

    const handleAddToCart = async (product: any) => {
        await dispatch(addtoCartCart({ id: product?.id, quantity: 1 }))
        await dispatch(getProduct(''))
        await dispatch(getCart({ dispatch }))
        // console.log(product, 'product')
        // alert(`Added to cart ${product?.id}`)
    }

    return (
        <div style={{ width: '100%', height: '80vh' }}>
            <Card
                style={{
                    height: '100%',
                    overflowY: 'scroll',
                    padding: '20px'
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px'
                    }}
                >
                    {products?.map((product: any) => (
                        <Card
                            key={product?.id}
                            className="group relative"
                            style={{ maxWidth: '300px', margin: '10px', padding: '10px', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Card.Body>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        src={product?.imageUrl}
                                        alt={product?.name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        loading="lazy"
                                        width={100}
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h5 className="text-sm text-gray-700">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product?.name}
                                        </h5>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">₹ {product?.price}</p>
                                </div>
                            </Card.Body>

                            <Card.Footer>
                                <Button className="w-full" variant="primary" onClick={() => handleAddToCart(product)}>
                                    Add to cart
                                </Button>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default ProductList
