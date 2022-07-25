import { Input } from '@mantine/core';
import { Search } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'

export default function SearchInput({ className, onChange, onSearch, value }) {

    return (
        <div className={`flex ${className}`}>
            <Input placeholder='Pesquisar...' onChange={onChange} value={value} onKeyPress={event => {
                if (event.key === 'Enter') {
                    onSearch()
                }
            }} />
            <Button size="small" variant='contained' color="warning" onClick={onSearch}> <Search /> Pesquisar</Button>
        </div>
    )
}
