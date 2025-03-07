import { Link } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext';
import Button from './Button'

const ProductItem = ({
    product,
    fromCart,
    selectedColor,
    selectedStorage
}) => {

    const { removeFromCart } = useProductContext();

    return (
        <>
            {!fromCart ? (
                <div className='product-list-item'>
                    <Link to={`/phones/${product.id}`} >
                        <div className='product-list-item-images'>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className='product-list-item-img'
                                loading='lazy'
                            />
                        </div>
                    </Link>
                    <div className='product-list-item-info'>
                        <div className='product-list-item-info-details'>
                            <div className='product-list-item-info-details-phone'>
                                <h4>{product.brand}</h4>
                                <h3>{product.name}</h3>
                            </div>
                            <h3>{product.basePrice}EUR</h3>
                        </div>
                    </div>
                </div>) 
                :
                (
                    <div className='product-list-item-from-cart'>
                        <Link to={`/phones/${product.id}`} >
                            <div className='product-list-item-images-from-cart'>
                                <img
                                    src={selectedColor.imageUrl}
                                    alt={product.name}
                                    className='product-list-item-img-from-cart'
                                />
                            </div>
                        </Link>
                        <div className='product-list-item-info-from-cart'>
                            <div className='product-list-item-info-details-from-cart'>
                                <h4>{product.name}</h4>
                                <div className='product-list-item-info-details-from-cart-storage-color'>
                                    <h3>{selectedStorage.capacity}</h3>
                                    <span>|</span>
                                    <h3>{selectedColor.name}</h3>
                                </div>
                                <span>{selectedStorage.price} EUR</span>
                            </div>

                            <div className='product-list-item-info-actions'>
                                <Button
                                    containerClass="eliminate-item-btn"
                                    onClick={() => removeFromCart(product)}
                                    title='Eliminar'
                                >
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )

}

export default ProductItem