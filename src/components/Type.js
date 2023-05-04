import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getokemonesByType } from '../services/api';
import { Card } from './Card';
import '../styles/type.css';

export const Type = () => {
    let {type} = useParams();
    const [pokemones, setPokemones] = useState([]);

    const getPokemonesByTypes = async () => {
        const allsPokemones = await getokemonesByType(type);
        setPokemones(allsPokemones);
        console.log(allsPokemones);
    }

    useEffect(() => {
        getPokemonesByTypes()
    })

    return (
        <div className='container-global-type'>
            <div className={`nametype-container ${type}`}>
                <p> { type } </p>
            </div>
            <div className='container-pokemonestype'>
                {
                    pokemones.map((p, i) => ( <Card key={i} url={p.pokemon.url}/> ))
                }
            </div>
        </div>
    )
}
