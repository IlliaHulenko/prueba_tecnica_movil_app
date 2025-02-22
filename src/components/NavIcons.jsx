import React, { useState } from 'react'
import ShoppingCartPage from '../pages/ShoppingCartPage';
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext';

const NavIcons = () => {

    const { cartProducts } = useProductContext();

    const [isCartOpen, setIsCartOpen] = useState(false);    

    // Animated route to products page
    const navigator = useNavigate();

    function routeToProducts() {
        if (!document.startViewTransition) {
            navigator('/shoping-cart');
            return;
        }
        document.startViewTransition(() => navigator('/shoping-cart'));
    }

    return (
      <div>
          <div className="cart">
              <img 
                  src='./empty-cart.svg' 
                  alt='Cart icon' 
                  width={30} 
                  height={30}                
                  onClick={() => routeToProducts()}
              />            
              <div className="cart-count">{cartProducts?.length > 9 ? '9+' : cartProducts?.length}</div>
          </div>
          {isCartOpen && (
              <ShoppingCartPage />
          )}
      </div>
    )
}

export default NavIcons