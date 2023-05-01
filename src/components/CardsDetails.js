import React, { useEffect, useState } from 'react';
import { icono } from "../icons/icons";
import { getPokemonById } from '../services/api';
import questionImg from '../images/question.png';
import pokemonQuestionImg from '../images/pokemon-question.svg';

export const CardsDetails = ({ pokemon }) => {
    const [pokemonNext, setNextPokemon] = useState({});
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const getNextPokemon = async () => {
            setLoading(true);
    
            const datosNext = await getPokemonById(parseInt(pokemon.id)+1);
            setNextPokemon(datosNext);
    
            setLoading(false);
        }
        
        getNextPokemon();
    }, [pokemon])

    return (
        !loading && (
            <div className={`card-view-pokemon-details`}>
                <div className={`img-pokemon-container-details ${pokemon.types[0].type.name}`}>
                    {
                        pokemon.sprites.other.home.front_default !== null ?
                            <img alt={pokemon.name} src={pokemon.sprites.other.home.front_default}></img>
                        :
                            <img alt={pokemon.name} src={pokemon.sprites.front_default}></img>
                    }
                    <div className='container-tipospokemon'>
                        {
                            pokemon.types.map((tipo, index) => {
                                return <div className={`icono-tipopokemon ${tipo.type.name}`}> <img alt='tipo' src={icono(tipo.type.name)}></img> </div>;
                            })
                        }
                    </div>
                </div>
                <div className={`img-pokemon-next-container-details`}>
                    {
                        pokemonNext.sprites.other.home.front_default !== null ?
                            <img alt={pokemonNext.name} src={pokemonNext.sprites.other.home.front_default}></img>
                        :
                            <img alt={pokemonNext.name} src={pokemonNext.sprites.front_default}></img>
                    }
                    <div className='container-tipospokemon'>
                        {
                            <div className='img-questionpokemon'>
                                <img alt='pokemon' src={pokemonQuestionImg} id='pokemonimg-carddetails'></img>
                                <img alt='question' src={questionImg} id='questionimg-carddetails'></img>
                            </div>
                        }
                    </div>
                    <p className='viewname-nextpokemon'> Es { pokemonNext.name } </p>
                </div>
            </div>
        )
    )
}
