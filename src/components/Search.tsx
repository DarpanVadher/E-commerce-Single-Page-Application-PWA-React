import React, { useState } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { Search as SearchIcon } from 'react-bootstrap-icons'
import { getProduct } from '../store/actions/thunkActions'
import { useAppDispatch } from '../store/reducers/store'
const Search: React.FC = () => {
    const [search, setSearch] = useState('')
    const dispatch = useAppDispatch()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    return (
        <div
        // style={{
        //     position: 'relative',
        //     width: '100%',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     flexDirection: 'column',
        //     flex: 1,
        //     top: '20px',
        //     bottom: '20px'
        // }}
        >
            <Card>
                <InputGroup>
                    <Form.Control
                        placeholder="Search Products"
                        aria-label="Search Products"
                        aria-describedby="basic-addon2"
                        value={search}
                        id="searchInput"
                        onChange={handleInputChange}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(getProduct(search))}>
                        <SearchIcon />
                    </Button>
                </InputGroup>
            </Card>
        </div>
    )
}

export default Search
