import React from 'react'
import { useParams } from "react-router-dom";

const SearchBar = () => {
    const router = useParams();

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search');

        if(search){
            router.push(`/list?search=${search}`);
        }
    }

  return (
    <form 
        className="form"
        onSubmit={handleSearch}
    >
        <input 
            type="text" 
            placeholder='Search...'
            name="search"
        />
        <button type='submit'>
            <img src='./search.svg' alt='Search icon' width={20} height={20}/>
        </button>
    </form>
  )
}

export default SearchBar