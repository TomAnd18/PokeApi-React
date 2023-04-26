import React, { useEffect, useState } from 'react';
import { getPokemonByUrl } from '../services/api';
import '../styles/card.css';
import { icono } from "../icons/icons";

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
                !loading && (
                    <div onClick={() => { window.location.href = '/details/'+pokemon.id }} className={`card-container ${pokemon.types[0].type.name}`}>
                        <h3> { '#' + pokemon.id } </h3>
                        <div className='img-icono-card'> <img alt='tipo' src={icono(pokemon.types[0].type.name)}></img> </div>
                        <div className='img-pokemon-container'>
                            <img alt={ pokemon.name } src={ pokemon.sprites.other.home.front_default !== null ? pokemon.sprites.other.home.front_default : pokemon.sprites.other.dream_world.front_default }></img>
                        </div>
                        <h2> {pokemon.name} </h2>
                    </div>
                )
            }
        </>
    )
}
