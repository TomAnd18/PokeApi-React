import React, { useEffect, useState } from 'react';
import { getPokemonByUrl } from '../services/api';
import '../styles/card.css';
import { icono } from "../icons/icons";

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const Card = ({ url }) => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getPokemon = async () => {
            setLoading(true);
            const poke = await getPokemonByUrl(url);
            console.log(poke);
            setPokemon(poke);
            setLoading(false);
        }

        getPokemon();
    }, [url])

    return (
        <>
            {
                loading ?
                    <Stack className='card-false' spacing={1}>
                        <Skeleton variant="rounded" style={{width: '100%', height: '100%'}}/>
                        <Skeleton variant="text" style={{width: '20%', height: '15%', position: 'absolute', top: '10px', left: '25px'}} sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="circular" style={{width: '60%', height: '50%', position: 'absolute', bottom: 'center', left: 'center'}} />
                        <Skeleton variant="text" style={{width: '60%', height: '10%', position: 'absolute', bottom: '25px', left: 'center'}} sx={{ fontSize: '1rem' }} />
                    </Stack>
                :
                    <div onClick={() => { window.location.href = '/PokeApi-React/details/'+pokemon.id }} className={`card-container ${pokemon.types[0].type.name}`}>
                        <h3> { '#' + pokemon.id } </h3>
                        <div className='img-icono-card'> <img alt='tipo' src={icono(pokemon.types[0].type.name)}></img> </div>
                        <div className='img-pokemon-container'>
                            <img alt={ pokemon.name } src={ pokemon.sprites.other.home.front_default !== null ? pokemon.sprites.other.home.front_default : pokemon.sprites.other.dream_world.front_default }></img>
                        </div>
                        <h2> {pokemon.name} </h2>
                    </div>
                
            }
        </>
    )
}
