import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { checkoutCart } from '../store/actions/thunkActions'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'

const Shipment: React.FC = () => {
    const [billingAddress, setbillingAddress] = useState('')
    const [shipingAddress, setshipingAddress] = useState('')

    const dispatch = useAppDispatch()
    const cart = useAppSelector((state) => state.cart)

    const handleCheckoutCart: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(billingAddress, shipingAddress, 'billingAddress, shipingAddress')

        dispatch(checkoutCart({ billingAddress, shipingAddress }))

        setbillingAddress('')
        setshipingAddress('')
    }

    const handleBillingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setbillingAddress(event.target.value)
    }

    const handleShippingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setshipingAddress(event.target.value)
    }
    return (
        <div
            style={{
                // height: '500px',
                // width: '100%',
                maxWidth: '100%',
                minWidth: '100px',
                position: 'relative',
                top: '20px',
                bottom: '20px',
                paddingBottom: '20px'
            }}
        >
            <h3>Shipment </h3>
            <Card style={{ width: '100%', height: 'content' }}>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Shipment Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Shipment Address" value={shipingAddress} onChange={handleShippingInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Billing Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Billing Address" value={billingAddress} onChange={handleBillingInputChange} />
                        </Form.Group>
                    </Form>
                </Card.Body>

                <Card.Footer>
                    <Button variant="primary" type="submit" onClick={handleCheckoutCart}>
                        Proceed to Checkout
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Shipment
