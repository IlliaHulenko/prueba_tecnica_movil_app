import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'

const Navbar = () => {

    // Animated route to HomePage page
    const navigator = useNavigate();
    function routeToMainPage() {
        if (!document.startViewTransition) {
            navigator('/');
            return;
        }
        document.startViewTransition(() => navigator('/'));
    }

    return (
        <nav className='nav-wrapper'>
            <div onClick={() => routeToMainPage()}>
                <Link to="/">
                    <img src={`${import.meta.env.BASE_URL}/mobile.svg`} alt='Mobile logo' className='logo' />
                </Link>
            </div>

            <SearchBar />

            <CartIcon />

        </nav>
    )
}

export default Navbar