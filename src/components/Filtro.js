import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

export const Filtro = () => {
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
                <div className='item-filter' style={{background: '#00aeca'}}> Todos </div>
                <div className='item-filter bug'> bug </div>
                <div className='item-filter water'> water </div>
                <div className='item-filter grass'> grass </div>
                <div className='item-filter fire'> fire </div>
                <div className='item-filter normal'> normal </div>
                <div className='item-filter poison'> poison </div>
                <div className='item-filter electric'> electric </div>
                <div className='item-filter ground'> ground </div>
                <div className='item-filter fairy'> fairy </div>
                <div className='item-filter fighting'> fighting </div>
                <div className='item-filter psychic'> psychic </div>
                <div className='item-filter ghost'> ghost </div>
                <div className='item-filter rock'> rock </div>
                <div className='item-filter ice'> ice </div>
                <div className='item-filter flying'> flying </div>
                <div className='item-filter dark'> dark </div>
                <div className='item-filter dragon'> dragon </div>
                <div className='item-filter steel'> steel </div>
            </TableBody>
        </Table>
    </TableContainer>
    );
}