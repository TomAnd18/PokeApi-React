import React, { useEffect, useRef } from 'react';
import '../styles/nav.css';
import logo from '../images/pokedex_logo.jpg';

export default function Nav() {

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


    return (
        <>
            <header ref={headerRef} className='header-nav'>
                <div className='container-logo-nav'>
                    <img className='logo-nav' alt='logo' src={logo}></img>
                    {/* <a className='name-logo-nav' href='#!'>Pokedex</a> */}
                </div>
                <nav className='nav-nav'>
                    <ul className='nav-wrap'>
                        <li> <a href='#!'> Buscar </a> </li>
                    </ul>
                    {/* <div className='menu-nav'>
                        <Menu/>
                    </div> */}
                </nav>
            </header>
        </>
    )
}