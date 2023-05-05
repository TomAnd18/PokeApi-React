import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getokemonesByType } from '../services/api';
import { Card } from './Card';
import '../styles/type.css';
import NewCard from './NewCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardType from './CardType';

export const Type = () => {
    let {type} = useParams();
    const [pokemones, setPokemones] = useState([]);
    const tiposES = {
        bug: 'bicho',
        water: 'agua',
        grass: 'planta',
        fire: 'fuego',
        normal: 'normal',
        poison: 'veneno',
        electric: 'eléctrico',
        ground: 'tierra',
        fairy: 'hada',
        fighting: 'lucha',
        psychic: 'psíquico',
        ghost: 'fantasma',
        rock: 'roca',
        ice: 'hielo',
        flying: 'volador',
        dark: 'oscuro',
        dragon: 'dragón',
        steel: 'acero'
    }

    const getPokemonesByTypes = async () => {
        const allsPokemones = await getokemonesByType(type);
        setPokemones(allsPokemones);
        console.log(allsPokemones);
    }

    useEffect(() => {
        getPokemonesByTypes()
    }, [])

    return (
        <div className='container-global-type'>
            <div className={`nametype-container ${type}`}>
                <div className='btnback-container-type'>
                    <button className='btnback-type' onClick={ () => window.location.href = '/' }> <ArrowBackIcon/> <span> Volver </span> </button>
                </div>
                <h1> { tiposES[type] } </h1>
            </div>
            
            <div className='container-pokemonestype'>
                {
                    pokemones.map((p, i) => ( <CardType key={i} url={p.pokemon.url} showBotones={false}/> ))
                }
            </div>
        </div>
    )
}
