import { useProductContext } from '../context/ProductContext'
import ProductItem from '../components/Productitem';


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
        <div>
            <h2>Precio total:{`${totalPrice} EUR`}</h2>
        </div>
    </div>
  )
}

export default ShoppingCartPage