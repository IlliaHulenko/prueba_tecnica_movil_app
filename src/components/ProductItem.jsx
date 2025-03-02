import { Link } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext';
import Button from './Button'

const ProductItem = ({ product, fromCart, selectedProduct }) => {

    const { removeFromCart } = useProductContext();

    console.log(selectedProduct);

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
                        <h4>{product.name}</h4>                        
                        <h3>{selectedProduct.storageOptions[0].capacity} | {selectedProduct.colorOptions[0].name}</h3>
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