import { useProductContext } from '../context/ProductContext'
import ProductItem from '../components/ProductItem.jsx';
import Button from '../components/Button';


const ShoppingCartPage = () => {

  const { cartProducts, totalPrice } = useProductContext();

  return (
    <div className='shoping-cart-page-wrapper'>
        <h1>CART {cartProducts?.length > 9 ? '9+' : cartProducts?.length}</h1>
        <div>
            {cartProducts?.map((cartProduct) => {
              return <ProductItem key={cartProduct.id} product={cartProduct} fromCart={true}/>
            })}
        </div>
        <div className='shopping-cart-bottom'>
            <Button 
              id='continue-shopping-button' 
              title='Continue shopping'               
              containerClass={'continue-shopping-btn'}
            />
            <div className='shopping-cart-bottom-right'>
              <h4 className='shopping-cart-total-price'>total <span>{`${totalPrice}`}</span> EUR</h4>
              <Button 
                id='pay-button' 
                title='pay'               
                containerClass={'pay-btn'}
              />
            </div>
        </div>
    </div>
  )
}

export default ShoppingCartPage