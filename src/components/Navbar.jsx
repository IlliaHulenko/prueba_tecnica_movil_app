
import { Link } from 'react-router-dom'
import Menu from './Menu'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

const Navbar = () => {
    return (
        <nav className='nav-wrapper'>
            {/* Left side of the navbar */}
            <div className='left-container'>
                <Link to="/">
                    <img src='./mobile.svg' alt='Mobile logo' className='logo'/>
                </Link>
                <div className='nav-links'>
                    <Link to="/" className='nav-hover-btn'>Home</Link>
                    <Link to="/phones" className='nav-hover-btn'>Phones</Link>
                </div>
                <Menu />
            </div>
            {/* Right side of the navbar */}
            <div className='right-container'>
                <SearchBar />
                <NavIcons />
            </div>
        </nav>
      )
}

export default Navbar