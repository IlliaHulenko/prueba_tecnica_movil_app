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
                className="search-bar"
            >
                <input
                    type="text"
                    placeholder="Search for a smartphone..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <hr id='line'/>
            <p>{products.length > 0 ? products.length : ""} results</p>
            </div>
        </>
    )
}

export default SearchBar