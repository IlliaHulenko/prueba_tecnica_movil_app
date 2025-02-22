import { useProductContext } from '../context/ProductContext'
import PropTypes from 'prop-types';

const CartButtons = ( {product} ) => {

    const { addToCart, removeFromCart } = useProductContext();

    // TODO: Implement logic if not selected storage and color options button 
    // have to be desabled

    // console.log("Product from CartButtons: " + JSON.stringify(Array.from(new Map(product)));
    

    return (
        <div className="">
            <div className='cart-buttons'>
                {!product.quantity ? (
                    <button
                        type='button'
                        className="product-list-item-btn"
                        onClick={() => addToCart(product)}
                    >
                        Añadir al carrito
                    </button>
                ) : (
                    <button
                        type='button'
                        className="eliminate-item-btn"
                        onClick={() => removeFromCart(product)}
                    >
                        Quitar del carrito
                    </button>
                )}

            </div>
        </div>
    )
}
CartButtons.propTypes = {
    product: PropTypes.object.isRequired,
};

export default CartButtons;
