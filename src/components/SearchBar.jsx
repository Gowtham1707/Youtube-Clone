import React, { useState } from 'react'
import { userState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [searchText, setSearchText ]= useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchText){
      navigate(`/search/${searchText}`);
      setSearchText("")
    }
  }

  return (
    <Paper
    component="form"
    onSubmit={handleSubmit}
    sx={{
    borderRadius: 20, 
    border: '1px solid #e3e3e3',
    pl: 2,
    boxshadow: 'none',
    mr: { sm: 5} 
    }}
    >
        <input className="search-bar" placeholder='Search..' value={searchText} onChange={(e) => {setSearchText(e.target.value)}} />
        <IconButton type="submit" sx={{
            p: '10px',
            color:'red',
        }}>
            <SearchIcon></SearchIcon>
        </IconButton>
    </Paper>
  )
}

export default SearchBar
