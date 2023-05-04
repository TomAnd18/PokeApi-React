import React, { useState } from 'react';
import { getokemonesByType } from '../services/api';
import { Card } from './Card';
import { Dialog, List, AppBar, IconButton, Slide, Backdrop, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/type.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScreenType({ type }) {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [pokemones, setPokemones] = useState([]);

    const getPokemonesByTypes = async () => {
        const allsPokemones = await getokemonesByType(type);
        setPokemones(allsPokemones);
    }

    const handleClickOpen = () => {
        setOpen(true);
        getPokemonesByTypes();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(true);
    };

    return (
        <div>
            <div className={`item-filter ${type}`} onClick={handleClickOpen}> { type } </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'fixed'}} id='nav-type'>
                    <div className='container-btn-name-type'>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            id='btn-close-type'
                        >
                            <CloseIcon />
                        </IconButton>
                        <div className={`nametype-container ${type}`}>
                            <h1> { type } </h1>
                        </div>
                    </div>
                </AppBar>
                <List>
                    <div className='container-global-type'>
                        {
                            loading ? (
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={open}
                                    onClick={handleClose}
                                    style={{marginTop: '4rem'}}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            ) : (
                                <div className='container-pokemonestype'>
                                    {pokemones.map((p, i) => ( <Card key={i} url={p.pokemon.url}/> ))}
                                </div>
                            )
                        }
                    </div>
                </List>
            </Dialog>
        </div>     
    );
}
