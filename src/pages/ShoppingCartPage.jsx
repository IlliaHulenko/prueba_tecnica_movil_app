import React, { useState, useEffect } from 'react'
import { useProductContext } from '../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../components/ProductItem.jsx';
import Button from '../components/Button';

const ShoppingCartPage = () => {

  const { cartProducts, totalPrice } = useProductContext();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);  

  // Animated route to HomePage page
  const navigator = useNavigate();
  function routeToMainPage() {
      if (!document.startViewTransition) {
          navigator('/');
          return;
      }
      document.startViewTransition(() => navigator('/'));
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='shoping-cart-page-wrapper'>
      <h1>CART ({cartProducts?.length > 9 ? '9+' : cartProducts?.length})</h1>
      <div className='shopping-cart-products'>
        {cartProducts?.map((cartProduct) => {
          return <ProductItem 
            key={cartProduct.cartId} 
            product={cartProduct} 
            fromCart={true} 
            selectedStorage={cartProduct.selectedStorage} 
            selectedColor={cartProduct.selectedColor} 
          />
        })}
      </div>      
      {isMobile ? (
        <div className='shopping-cart-bottom-mobile'>
          <h4>total <span>{`${totalPrice}`} EUR</span></h4>
          <div className='shopping-cart-bottom-mobile-btns'>
            <Button
              id='continue-shopping-button'
              title='Continue shopping'
              containerClass={'continue-shopping-btn'}
              onClick={() => routeToMainPage()}
            />
            <Button
              id='pay-button'
              title='pay'
              containerClass={'pay-btn'}
            />
          </div>
        </div>
      ) : (
        <div className='shopping-cart-bottom'>
          <Button
            id='continue-shopping-button'
            title='Continue shopping'
            containerClass={'continue-shopping-btn'}
            onClick={() => routeToMainPage()}
          />
          <h4>total <span>{`${totalPrice}`}</span> EUR</h4>
          <Button
            id='pay-button'
            title='pay'
            containerClass={'pay-btn'}
          />
        </div>
      )}
    </div>
  )
}

export default ShoppingCartPage