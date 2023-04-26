import React, { useEffect, useState } from 'react';
import { getPokemones } from '../services/api';
import { Card } from '../components/Card';
import '../styles/home.css';
import Nav from '../components/Nav';

export const Home = () => {
    const [pokemones,setPokemones] = useState([]);
    const [offset, setOffset] = useState(0);

    const showPokemones = async () => {
        const datos = await getPokemones(offset);
        setPokemones([...pokemones, ...datos.results]);
        console.log(datos.results);
    }

    useEffect(() => {
        showPokemones();
    }, [offset]);
    
    const loadMorePokemones = () => {
        setOffset(offset + 12);
    }


    return (
        <>
            <Nav/>
            <div className='container-home'>
                <div className='cards-container-home'>
                    {
                        pokemones.map((pokemon, i) => ( <Card key={i} url={pokemon.url}/> ))
                    }
                </div>
                    
                <div className='btn-more-container'>
                    <button className='btn-more-pokemones' onClick={loadMorePokemones}> Cargar Mas</button>
                </div>
            </div>
        </>
    )
}
