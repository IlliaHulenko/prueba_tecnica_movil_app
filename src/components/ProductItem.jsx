import { Link } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext';
import Button from './Button'

const ProductItem = ({ product, fromCart }) => {

    const { removeFromCart } = useProductContext();

    return (
        <div className={`${!fromCart ? 'product-list-item' : 'product-list-item-from-cart'}`}>
            <Link to={`/phones/${product.id}`} >
                <div className={`${!fromCart ? 'product-list-item-images' : 'product-list-item-images-from-cart'}`}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={`${!fromCart ? 'product-list-item-img' : 'product-list-item-img-from-cart'}`}
                    />
                </div>
            </Link>
            <div className={`${!fromCart ? 'product-list-item-info' : 'product-list-item-info-from-cart'}`}>
                {/* <div className={`${!fromCart ? 'product-list-item-info-details' : 'product-list-item-info-details-from-cart'}`}>
                    <span>{product.brand}</span>
                    <span>{product.name}</span>
                    <span>${product.basePrice}</span>
                </div> */}
                {!fromCart ? (
                    <div className='product-list-item-info-details'>
                        <div className='product-list-item-info-details-phone'>
                            <h4>{product.brand}</h4>
                            <h3>{product.name}</h3>
                        </div>
                        <h3>{product.basePrice}EUR</h3>
                    </div>
                ) : (
                    <div className='product-list-item-info-details-from-cart'>                        
                        <span>{product.name}</span>
                        <span>{product.storage}</span>
                        <span>${product.basePrice}</span>
                    </div>
                )

                }

                <div className='product-list-item-info-actions'>
                    {fromCart &&
                        <Button
                            containerClass="eliminate-item-btn"
                            onClick={() => removeFromCart(product)}
                            title='Eliminar'
                        >
                        </Button>
                    }
                </div>

            </div>

        </div>
    )
}

export default ProductItem