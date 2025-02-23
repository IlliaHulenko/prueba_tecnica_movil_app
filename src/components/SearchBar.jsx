import React from 'react'
import { useProductContext } from '../context/ProductContext'

const SearchBar = () => {
    const {
        searchTerm, handleSearch, products
    } = useProductContext();

    const handleChange = (e) => {
        handleSearch(e.target.value);
    };
    
    return (
        <>
            <div
                className="form"
            >
                <input
                    type="text"
                    laceholder="Search products..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type='submit'>
                    <img src='./search.svg' alt='Search icon' width={20} height={20} />
                </button>
            </div>
            <p>{products.length > 0 ? products.length : ""} results</p>
        </>
    )
}

export default SearchBar