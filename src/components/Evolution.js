import React, { useEffect, useState } from 'react';
import { getPokemonEvolution } from '../services/api';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export const Evolution = ({ species, name }) => {
    const [evolucion, setEvolucion] = useState([])
    const [loading, setLoading] = useState(true);

    const getEvolution = async () => {
        setLoading(true);
        
        const evoluciones = await getPokemonEvolution(species);
        setEvolucion(evoluciones);
        console.log(evoluciones);

        setLoading(false);
    }

    useEffect(() => {
        getEvolution();
    }, [])

    return (
        !loading && (
            <div className='images-evoluciones-container'>
                {
                    evolucion.map((e, index) => {
                        return (
                            <>
                                <div className='img-evolucion' key={index}> <img alt='evolution' src={ e.url }></img> <p className={ e.name === name ? 'pokemon-seleccionado' : '' }> { e.name } </p> </div>
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
        )
    )
}
