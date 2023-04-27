import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonById, getDescriptionPokemon, getPokemonEvolution } from '../services/api';
import { icono } from "../icons/icons";
import '../styles/details.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import StatProgress from '../components/StatProgress';

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
            loading ? 
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box> 
                </div>
            :
                <div className='container-global-details'>
                    <div style={{backgroundImage: `url(${pokemon.sprites.other.dream_world.front_default})`, backgroundSize: 'auto 90%', backgroundPosition: 'bottom left', backgroundRepeat: 'no-repeat'}} className='details-container'>
                        
                    </div>
                    <div className='container-back-details'>
                        <div className='btn-back-container'>
                            <button className='btn-back' onClick={() => { window.location.href = '/' }}> <ArrowBackIcon/> <span> Volver </span> </button>
                        </div>
                        <div className='details-true-container'>
                            <div>
                                <button className='btn-anterior-siguiente' disabled={ id > 1 ? false : true } onClick={btnAnterior}> <KeyboardDoubleArrowLeftIcon/> </button>
                            </div>
                            <div className='container-detalles-pokemon'>
                                <div className='info-pokemon-details'>
                                    <h1> { pokemon.name } </h1>
                                    {
                                        descripcion.length > 0 ?
                                            <div className='description-pokemon'>
                                                <p> { descripcion[0].flavor_text } </p>
                                                <p> { descripcion[2].flavor_text } </p>
                                            </div>
                                        : ''
                                    }
                                    <div className='stats-pokemon-container'>
                                        {
                                            pokemon.stats.map((s, index) => {
                                                return (
                                                    <div className='card-stat' key={index}>
                                                        <span style={{width: '50%'}}> { s.stat.name } </span>
                                                        <div style={{width: '30%', display: 'flex', alignItems: 'center'}}> <StatProgress numero={s.base_stat}/> </div>
                                                        <span style={{width: '10%', textAlign: 'right'}}> { s.base_stat } </span>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className='images-evoluciones-container'>
                                        {
                                            evolucion.map((e, index) => {
                                                return (
                                                    <>
                                                        <div className='img-evolucion' key={index}> <img alt='evolution' src={ e.url }></img> <p className={ e.name === pokemon.name ? 'pokemon-seleccionado' : '' }> { e.name } </p> </div>
                                                        {
                                                            (index + 1) !== evolucion.length
                                                                ?
                                                                    <ArrowCircleRightIcon style={{fontSize: '2rem'}}/>
                                                                :
                                                                    ''
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
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
                                    <div className={`img-pokemon-next-container-details ${pokemon.types[0].type.name}`}>
                                        {
                                            pokemonNext.sprites.other.home.front_default !== null ?
                                                <img alt={pokemonNext.name} src={pokemonNext.sprites.other.home.front_default}></img>
                                            :
                                                <img alt={pokemonNext.name} src={pokemonNext.sprites.front_default}></img>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='btn-anterior-siguiente' disabled={ id < 1000 ? false : true } onClick={btnSiguiente}> <KeyboardDoubleArrowRightIcon/> </button>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </>
    )
}
