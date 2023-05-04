import React, { useEffect, useRef } from 'react';
import '../styles/nav.css';
import logo from '../images/pokedex_logo.jpg';
import { Search } from '../components/Search';

export default function Nav({ nameSearch, borrarBusqueda }) {

    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 0) {
                headerRef.current.classList.add('down');
            } else {
                headerRef.current.classList.remove('down');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const redireccionar = () => {
        window.location.href = '/';
    }


    return (
        <>
            <header ref={headerRef} className='header-nav'>
                <div className='container-logo-nav'>
                    <img onClick={ redireccionar } className='logo-nav' alt='logo' src={logo}></img>
                    {/* <a className='name-logo-nav' href='#!'>Pokedex</a> */}
                </div>
                <nav className='container-search-home'>
                    <Search nameSearch={nameSearch} borrarBusqueda={borrarBusqueda}/>
                </nav>
            </header>
        </>
    )
}