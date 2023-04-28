import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonById, getDescriptionPokemon, getPokemonEvolution} from '../services/api';
// import { icono } from "../icons/icons";
import '../styles/details.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import StatProgress from '../components/StatProgress';
import { CardsDetails } from '../components/CardsDetails';
import ExperienceProgress from '../components/ExperienceProgress';

export const Details = () => {
    const [pokemon, setPokemon] = useState({});
    // const [pokemonNext, setNextPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [descripcion, setDescripcion] = useState([]);
    const [evolucion, setEvolucion] = useState([]);
    const statsName =  [
        'PS',
        'Ataque',
        'Defensa',
        'Ataque Especial',
        'Defensa Especial',
        'velocidad',
    ];
    const [numXP, setNumXP] = useState(0);
    let {id} = useParams();
    let navigate = useNavigate();

    
    const loadPokemon = async (isID) => {
        setLoading(true);

        const datos = await getPokemonById(isID);
        const description = await getDescriptionPokemon(datos.species.url);
        // const datosNext = await getPokemonById(parseInt(isID)+1);
        console.log(datos);
        setPokemon(datos);
        setDescripcion(description);
        // setNextPokemon(datosNext);

        const evoluciones = await getPokemonEvolution(datos.species.url);
        setEvolucion(evoluciones);
        console.log(evoluciones);

        getNumeroXP(datos.base_experience);

        setLoading(false);
    }

    const getNumeroXP = useCallback((xp) => {
        const meta = xp;
        let space = xp > 300 ? 4 : 3;
        let valor = 0;
        const intervalo = setInterval(() => {
          valor += space;
          if (valor >= meta) {
            clearInterval(intervalo);
          }
          setNumXP(valor);
        }, 15);
    }, [setNumXP]);
      

    useEffect(() => {
        loadPokemon(id);
    }, [id])

    const btnAnterior = () => {
        id--;
        navigate(`/PokeApi-React/details/${id}`);
    }

    const btnSiguiente = () => {
        id++;
        navigate(`/PokeApi-React/details/${id}`);
    }

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
                    <div style={{backgroundImage: `url(${pokemon.sprites.other.dream_world.front_default})`}} className='details-container'>
                        
                    </div>
                    <div className='container-back-details'>
                        <div className='btn-back-container'>
                            <button className='btn-back' onClick={() => { window.location.href = '/PokeApi-React/' }}> <ArrowBackIcon/> <span> Volver </span> </button>
                        </div>
                        <div className='details-true-container'>
                            <div className='btn-anterior-container'>
                                <button className='btn-anterior-siguiente' disabled={ id > 1 ? false : true } onClick={btnAnterior}> <KeyboardDoubleArrowLeftIcon/> </button>
                            </div>
                            <div className='container-detalles-pokemon'>
                                <div className='info-pokemon-details'>
                                    <h1> { pokemon.name } </h1>
                                    {
                                        descripcion.length > 0 ?
                                            <div className='description-pokemon'>
                                                <p> { descripcion[0].flavor_text } </p>
                                                {/* <p> { descripcion[2].flavor_text } </p> */}
                                            </div>
                                        : ''
                                    }
                                    <div className='experience-container'>
                                        <span className='ex-name-container'> Experiencia </span>
                                        <div className='ex-circle-num-container'>
                                            <ExperienceProgress numero={pokemon.base_experience}/>
                                            <span className='ex-num'> { numXP } </span>
                                        </div>
                                    </div>
                                    <div className='stats-pokemon-container'>
                                            <div className='card-stat'>
                                                <span style={{width: '60%'}}> Peso </span>
                                                <span style={{width: '30%', textAlign: 'right', textTransform: 'none', letterSpacing: '1px'}}> { pokemon.weight / 10 } kg </span>
                                            </div>
                                            <div className='card-stat'>
                                                <span style={{width: '60%'}}> Altura </span>
                                                <span style={{width: '30%', textAlign: 'right', textTransform: 'none', letterSpacing: '1px'}}> { pokemon.height / 10 } m </span>
                                            </div>
                                        {
                                            pokemon.stats.map((s, index) => {
                                                return (
                                                    <div className='card-stat' key={index}>
                                                        <span style={{width: '50%'}}> { statsName[index]} </span>
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
                                                                    <ArrowCircleRightIcon id='arrow-evolution' style={{fontSize: '2rem'}}/>
                                                                :
                                                                    ''
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <CardsDetails pokemon={pokemon}/>
                            </div>
                            <div className='btn-siguiente-container'>
                                <button className='btn-anterior-siguiente' disabled={ id < 10270 ? false : true } onClick={btnSiguiente}> <KeyboardDoubleArrowRightIcon/> </button>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </>
    )
}
