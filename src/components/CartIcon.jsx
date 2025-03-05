import React from 'react';

import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext';

const CartIcon = () => {

    const { cartProducts } = useProductContext();

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
                  src={`${import.meta.env.BASE_URL}/${empty-cart.svg}`} 
                  alt='Cart icon' 
                  width={30} 
                  height={30}                
                  onClick={() => routeToProducts()}
              />            
              <div className="cart-count">{cartProducts?.length > 9 ? '9+' : cartProducts?.length}</div>
          </div>          
      </div>
    )
}

export default CartIcon