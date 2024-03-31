import React from 'react'
import Search from '../components/Search'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import { Container } from 'react-bootstrap'

const HomePage: React.FC = () => {
    return (
        <Container>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '20px'
                }}
            >
                {/* <h1 style={{ fontSize: '4em' }}>Darpan Vadher</h1> */}
                {/* <DateDisplay /> */}
                <Search />
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    flexDirection: 'row',
                    margin: '20px',
                    padding: '20px'
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '70%',
                        display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        flexDirection: 'column',
                        margin: '20px'
                        // padding: '20px'
                    }}
                >
                    <h3>Products </h3>
                    <ProductList />
                </div>

                <div
                    style={{
                        position: 'relative',
                        width: '30%',
                        display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        flexDirection: 'column',
                        margin: '20px'
                        // padding: '20px'
                    }}
                >
                    <h3>Cart Details</h3>
                    <Cart />
                </div>
            </div>
            {/* <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}> */}
            {/* <h1 style={{ fontSize: '4em' }}>Darpan Vadher</h1> */}
            {/* <DateDisplay /> */}
            {/* <Cart /> */}
            {/* </div> */}
        </Container>
    )
}

export default HomePage
