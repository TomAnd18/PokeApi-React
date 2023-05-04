import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { getokemonesByType } from '../services/api';

export const Filtro = () => {
  const tipos = [
    'todos',
    'bug',
    'water',
    'grass',
    'fire',
    'normal',
    'poison',
    'electric',
    'ground',
    'fairy',
    'fighting',
    'psychic',
    'ghost',
    'rock',
    'ice',
    'flying',
    'dark',
    'dragon',
    'steel'
  ]

  const handleScroll = (e) => {
      const tablaContainer = document.getElementById("tabla-container");
    
      let isDown = false;
      let startX;
      let scrollLeft;
    
      tablaContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - tablaContainer.offsetLeft;
        scrollLeft = tablaContainer.scrollLeft;
      });
    
      tablaContainer.addEventListener("mouseleave", () => {
        isDown = false;
      });
    
      tablaContainer.addEventListener("mouseup", () => {
        isDown = false;
      });
    
      tablaContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tablaContainer.offsetLeft;
        const walk = (x - startX) * 1; // ajusta la velocidad del scroll horizontal
        tablaContainer.scrollLeft = scrollLeft - walk;
      });
  }

  useEffect(() => {
      handleScroll();
  }, []);

  const getPokemonesByTypes = async (type) => {
    const allsPokemones = await getokemonesByType(type);
    console.log(allsPokemones);
  }

  return (
  <TableContainer id='tabla-container' component={Paper}>
    <Table sx={{ minWidth: 650 }} id='tabla' aria-label="caption table">
      <TableBody style={{display: 'flex'}}>

        {
          tipos.map((tipo) => {
            if (tipo === 'todos') {
               return (<div onClick={ () => window.location.href = '/' } className='item-filter' style={{background: '#00aeca'}}> todos </div>);
            } else {
              return (<div onClick={() => { window.location.href = '/types/'+tipo }} className={`item-filter ${tipo}`}> { tipo } </div>);
            }
          })
        }

        {/* <div onClick={ () => window.location.href = '/' } className='item-filter' style={{background: '#00aeca'}}> todos </div>
        <div onClick={ () => getokemonesByType('bug') } className='item-filter bug'> bug </div>
        <div onClick={ () => getokemonesByType('water') } className='item-filter water'> water </div>
        <div onClick={ () => getokemonesByType('grass') } className='item-filter grass'> grass </div>
        <div onClick={ () => getokemonesByType('fire') } className='item-filter fire'> fire </div>
        <div onClick={ () => getokemonesByType('normal') } className='item-filter normal'> normal </div>
        <div onClick={ () => getokemonesByType('poison') } className='item-filter poison'> poison </div>
        <div onClick={ () => getokemonesByType('electric') } className='item-filter electric'> electric </div>
        <div onClick={ () => getokemonesByType('ground') } className='item-filter ground'> ground </div>
        <div onClick={ () => getokemonesByType('fairy') } className='item-filter fairy'> fairy </div>
        <div onClick={ () => getokemonesByType('fighting') } className='item-filter fighting'> fighting </div>
        <div onClick={ () => getokemonesByType('psychic') } className='item-filter psychic'> psychic </div>
        <div onClick={ () => getokemonesByType('ghost') } className='item-filter ghost'> ghost </div>
        <div onClick={ () => getokemonesByType('rock') } className='item-filter rock'> rock </div>
        <div onClick={ () => getokemonesByType('ice') } className='item-filter ice'> ice </div>
        <div onClick={ () => getokemonesByType('dark') } className='item-filter flying'> flying </div>
        <div onClick={ () => getokemonesByType('dark') } className='item-filter dark'> dark </div>
        <div onClick={ () => getokemonesByType('dragon') } className='item-filter dragon'> dragon </div>
        <div onClick={ () => getokemonesByType('steel') } className='item-filter steel'> steel </div> */}
      </TableBody>
    </Table>
  </TableContainer>
  );
}