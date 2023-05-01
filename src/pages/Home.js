import React, { useEffect, useState } from 'react';
import { getPokemones, getPokemonById } from '../services/api';
import { Card } from '../components/Card';
import '../styles/home.css';
import Nav from '../components/Nav';
import { Filtro } from '../components/Filtro';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import nofound from '../images/no-ncontrado.png';

export const Home = () => {
    const [pokemones,setPokemones] = useState([]);
    const [offset, setOffset] = useState(0);
    // const [limit, setLimit] = useState(12);
    const [info, setInfo] = useState('');
    const [encontrado, setEcontrado] = useState(false);
    const [searching, setSearching] = useState(false);

    const showPokemones = async () => {
        // const getLimite = JSON.parse(localStorage.getItem("limite")) || parseInt(12);
        const datos = await getPokemones(offset);
        setPokemones([...pokemones, ...datos.results]);
        console.log(datos.results);
    }

    useEffect(() => {
        showPokemones();
    }, [offset]);
    
    const loadMorePokemones = () => {
        setOffset(offset + 12);
        // let newLimit = limit + 12;
        // setLimit(newLimit);
        // localStorage.setItem("limite", JSON.stringify(newLimit));
    }

    const pokemonSearching = async (name) => {
        setSearching(true);
        
        const buscarDatos = await getPokemonById(name);
        console.log(buscarDatos);

        if (!buscarDatos) {
            console.log('Pokemon no encotrado');
            setInfo('Pokemon no encotrado');
            setEcontrado(true);
            setPokemones([]);
        } else {
            setInfo('');
            setEcontrado(true);
            setPokemones([{
                name: name,
                url: `https://pokeapi.co/api/v2/pokemon/${name}`
            }]);
        }

        setSearching(false);
    }

    const reload = (data) => {
        console.log(data);
        if(pokemones.length <= 1) {
            pokemones.shift();
            showPokemones();
            setInfo('');
            setEcontrado(false);
            setOffset(0);
        }
    }

    return (
        <>
            <Nav nameSearch={pokemonSearching} borrarBusqueda={reload}/>
            <div className='container-home'>
                <div className='container-filter'> <Filtro/> </div>
                {
                    searching
                    ?
                        <div id='searching-pokemon-container'>
                            <p> Buscando Pokemon... </p>
                            <Box sx={{ width: '80%' }}>
                                <LinearProgress />
                            </Box>
                        </div>
                    :
                        <>
                            <div className='cards-container-home'>
                                <div style={{ display: info.length !== 0 ? 'flex' : 'none'}} id='searching-pokemon-container'>
                                    <div className='nofound-img'>
                                        <img alt='no found' src={nofound}></img>
                                    </div>
                                    <p> { info }  </p>
                                </div>
                                {
                                    pokemones.map((pokemon, i) => ( <Card key={i} url={pokemon.url}/> ))
                                }
                            </div>
                                
                            <div style={{ display: !encontrado ? 'flex' : 'none' }} className='btn-more-container'>
                                <button className='btn-more-pokemones' onClick={loadMorePokemones}> Ver mas...</button>
                            </div>
                        </>
                }
            </div>
        </>
    )
}
