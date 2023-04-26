import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonById, getDescriptionPokemon, getPokemonEvolution } from '../services/api';
import '../styles/details.css';

export const Details = () => {
    const [pokemon, setPokemon] = useState({});
    const [pokemonNext, setNextPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [descripcion, setDescripcion] = useState([]);
    const [evolucion, setEvolucion] = useState([]);
    let {id} = useParams();
    let navigate = useNavigate();

    
    const loadPokemon = async (isID) => {
        setLoading(true);
        const datos = await getPokemonById(isID);
        const description = await getDescriptionPokemon(isID);
        const datosNext = await getPokemonById(parseInt(isID)+1);
        console.log(datos);
        setPokemon(datos);
        setDescripcion(description);
        setNextPokemon(datosNext);

        const evoluciones = await getPokemonEvolution(id);
        setEvolucion(evoluciones);
        console.log(evoluciones);

        

        setLoading(false);
    }

    useEffect(() => {
        loadPokemon(id);
    }, [id])

    const btnAnterior = () => {
        id--;
        navigate(`/details/${id}`);
    }

    const btnSiguiente = () => {
        id++;
        navigate(`/details/${id}`);
    }

    // const getImagePokemon = async (name) => {
    //     const datosPokemon = await getPokemonById(name);
    //     const img = datosPokemon.sprites.other.home.front_default;
    //     console.log(img);
    // }


    return (
    <>
        {
            !loading && (
                <div className='container-global-details'>
                    <div style={{backgroundImage: `url(${pokemon.sprites.other.dream_world.front_default})`, backgroundSize: 'auto 90%', backgroundPosition: 'bottom left', backgroundRepeat: 'no-repeat'}} className='details-container'>
                        
                    </div>
                    <div className='container-back-details'>
                        <div>
                            <button onClick={() => { window.location.href = '/' }}> Volver </button>
                        </div>
                        <div className='details-true-container'>
                            <div>
                                <button disabled={ id > 1 ? false : true } onClick={btnAnterior}> Anterior </button>
                            </div>
                            <div className='container-detalles-pokemon'>
                                <div className='info-pokemon-details'>
                                    <h1> { pokemon.name } </h1>
                                    <div className='description-pokemon'>
                                        <p> { descripcion[0].flavor_text } </p>
                                        <p> { descripcion[2].flavor_text } </p>
                                    </div>
                                    <div className='stats-pokemon-container'>
                                        {
                                            pokemon.stats.map((s, index) => {
                                                return (
                                                    <div className='card-stat' key={index}>
                                                        <span> { s.stat.name } </span>
                                                        <span> { s.base_stat } </span>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className='images-evoluciones-container'>
                                        {
                                            evolucion.map((e, index) => {
                                                return <div className='img-evolucion' key={index}> <img src={ e.url }></img> <p className={ e.name === pokemon.name ? 'pokemon-seleccionado' : '' }> { e.name } </p> </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={`card-view-pokemon-details`}>
                                    <div className={`img-pokemon-container-details ${pokemon.types[0].type.name}`}>
                                        <img alt={pokemon.name} src={pokemon.sprites.other.home.front_default}></img>
                                    </div>
                                    <div className={`img-pokemon-next-container-details ${pokemon.types[0].type.name}`}>
                                        <img alt={pokemonNext.name} src={pokemonNext.sprites.other.home.front_default}></img>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button disabled={ id < 1000 ? false : true } onClick={btnSiguiente}> Siguiente </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
    )
}
