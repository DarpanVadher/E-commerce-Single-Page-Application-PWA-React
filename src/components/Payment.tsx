import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { checkPaymentStatus } from '../store/actions/thunkActions'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'

interface TESTTYPE {
    qr_id: string
    created_at: string
    close_by: string
    shipment: string
}

const TEST: React.FC<TESTTYPE> = ({ qr_id, created_at, close_by, shipment }: any) => {
    const dispatch = useAppDispatch()
    const t = Number(close_by) - Number(created_at)

    const [time, setTime] = useState(t || 0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (time === 0) {
                clearInterval(interval)
                return
            }
            setTime((time) => time - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const timeout = setTimeout(async () => {
            await dispatch(checkPaymentStatus({ id: qr_id, shipmentId: shipment }))
        }, t * 1000)
        //
        return () => clearTimeout(timeout)
    }, [t])
    return <p style={{ margin: '5px' }}>Payment Status : {time}</p>
}

const Payment: React.FC = () => {
    // const [search, setSearch] = useState('')
    const payment = useAppSelector((state) => state.payment)

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
            <h3>Payment </h3>
            <Card style={{ width: '100%', height: 'content' }}>
                {payment?.payment?.qr ? (
                    <Card.Body>
                        {' '}
                        <img src={payment?.payment?.qr?.image_url} alt="QR" width={150} />
                        {/* ts-ignore */}
                        <TEST
                            qr_id={payment?.payment?.qr?.id}
                            created_at={payment?.payment?.qr?.created_at}
                            close_by={payment?.payment?.qr?.close_by}
                            shipment={payment?.payment?.shipments?.id}
                        />
                    </Card.Body>
                ) : Object.keys(payment?.payment).length > 0 ? (
                    <>
                        <Card.Body>
                            <p style={{ margin: '5px', color: payment?.payment?.status === 'failed' ? 'red' : 'green' }}>Payment: {payment?.payment?.status}</p>
                            <p style={{ margin: '5px' }}>Amount: {payment?.payment?.amount}</p>
                            <p style={{ margin: '5px' }}> {payment?.payment?.status === 'failed' ? 'Please Try Again' : 'Continue Shopping!'}</p>
                        </Card.Body>
                    </>
                ) : (
                    <></>
                )}

                <Card.Footer>
                    <Button style={{ margin: '5px' }}> Download Invoice</Button>
                    <Button style={{ margin: '5px' }}> Track Shipment</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Payment
