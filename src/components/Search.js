import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const Search = ({ nameSearch, borrarBusqueda }) => {
    const [buscar, setBuscar] = useState('');
    const [borrar, setBorrar] = useState(false);

    const handleChange = (event) => {
        setBuscar(event.target.value);
        console.log(buscar);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(buscar.length !== 0) {
            nameSearch(buscar.toLowerCase());
            console.log('El valor del input es:', buscar);
        }
    };

    const limpiarBusqueda = () => {
        if(buscar !== '') {
            setBuscar('');
            setBorrar(true);
            borrarBusqueda(borrar);
        }
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
    }));
      
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '100%',
            '&:focus': {
              width: '100%',
            },
          },
        },
    }));

    return (
        <>
            <Search id='search-input'>
                <form style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} onSubmit={handleSubmit}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Buscar pokemon..."
                        autoComplete="off"
                        value={buscar}
                        onChange={handleChange}
                        style={{width: '100%', fontWeight: 'bold'}}
                        autoFocus
                    />
                    <HighlightOffIcon onClick={limpiarBusqueda} className='btn-limpiar-busqueda'/>
                </form>
            </Search>
        </>
    )
}
