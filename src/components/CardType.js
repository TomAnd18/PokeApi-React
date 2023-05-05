import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { ScreenDetails } from './ScreenDetails';
import { getPokemonByUrl } from '../services/api';
import '../styles/card.css';
import { icono } from "../icons/icons";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/card.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardType({ url, showBotones }) {
    const [open, setOpen] = React.useState(false);
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Stack className='cardfalse-type' spacing={1}>
                        <Skeleton variant="rounded" style={{width: '100%', height: '100%'}}/>
                        <Skeleton variant="text" style={{width: '10%', height: '20%', position: 'absolute', top: '10px', left: '25px'}} sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="circular" style={{width: '20%', height: '60%', position: 'absolute', right: '40px'}} />
                        <Skeleton variant="text" style={{width: '30%', height: '20%', position: 'absolute', bottom: 'center', left: '25px'}} sx={{ fontSize: '1rem' }} />
                    </Stack>
                :
                    <div onClick={handleClickOpen} id='cardtype-container' className={`card-container ${pokemon.types[0].type.name}`}>
                        <h3> { '#' + pokemon.id } </h3>
                        <div id='imgiconocard-type'> <img alt='tipo' src={icono(pokemon.types[0].type.name)}></img> </div>
                        <div id='imgpokemon-type'>
                            <img alt={ pokemon.name } src={ pokemon.sprites.other.home.front_default !== null ? pokemon.sprites.other.home.front_default : pokemon.sprites.front_default }></img>
                        </div>
                        <h2 id='namepokemon-type'> {pokemon.name} </h2>
                    </div>
            }
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div style={{zIndex: '5'}} className='btn-back-container'>
                    <button className='btn-back' onClick={handleClose}> <ArrowBackIcon/> <span> Volver </span> </button>
                </div>
                <ScreenDetails id={pokemon.id} showBotones={showBotones}/>
            </Dialog>
        </>
    );
}
