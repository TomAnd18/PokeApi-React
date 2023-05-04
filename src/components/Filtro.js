import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ScreenType from './ScreenType';

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

  return (
  <TableContainer id='tabla-container' component={Paper}>
    <Table sx={{ minWidth: 650 }} id='tabla' aria-label="caption table">
      <TableBody style={{display: 'flex'}}>

        {
          tipos.map((tipo) => {
            if (tipo === 'todos') {
               return (<div onClick={ () => window.location.href = '/' } className='item-filter' style={{background: '#00aeca'}}> todos </div>);
            } else {
              return <ScreenType type={tipo}/> ;
            }
          })
        }
        
      </TableBody>
    </Table>
  </TableContainer>
  );
}