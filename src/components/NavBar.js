import React from 'react'
import '../styles/buttomNavigation.css'
import HomeIcon from '../img/home.png'
import ProfileIcon from '../img/user.png'

function NavBar() {
    return (
        // <nav className='container__buttonNavBar'>
            <nav className='content__buttonNavBar'>
                <div className='container__iconUser containers__icons'>
                    <a href='/'>
                        <img className='iconUser iconsbnb' src={HomeIcon} alt='Icon Home' />
                    </a>
                </div>
                <div className='container__iconUser containers__icons'>
                    <a href='/Miperfil'>
                        <img className='iconHome iconsbnb' src={ProfileIcon} alt='Icon Profile' />
                    </a>
                </div>
            </nav>
        //</nav>
    )
}

export default NavBar