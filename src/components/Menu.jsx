import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
    const [open, setOpen] = useState(false);
    const hamburgerRef = useRef(null);
    const menuRef = useRef(null);

    // useEffect to check if the user clicked outside of the sidemenu
    useEffect(() => {
        let handler = document.addEventListener('click', (e) => {
            if (e.target !== menuRef.current && e.target !== hamburgerRef.current) {
                setOpen(false);
            }
        });
        return () => {
            document.removeEventListener('click', handler);
        }

    }, []);

    return (
        <>
            <div
                className={`hamburger-menu ${open ? 'active' : ''}`}
                onClick={() => setOpen(prev => !prev)}
                ref={hamburgerRef}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            {open && (
                <div
                    className='side-panel'
                    ref={menuRef}
                >
                    <Link href="/" className='nav-hover-btn'>Home</Link>
                    <Link href="/phones" className='nav-hover-btn'>Phones</Link>
                </div>
            )}
        </>
    )
}

export default Menu