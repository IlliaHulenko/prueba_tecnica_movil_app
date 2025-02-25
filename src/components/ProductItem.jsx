import { Link } from 'react-router-dom'
import CartButtons from './CartButtons'

const ProductItem = ({ product }) => {
    
    return (
        <div className="product-list-item">            
            <Link to={`/phones/${product.id}`} >
                <div className="product-list-item-images">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="product-list-item-img"
                    />
                </div>
                <div className="product-list-item-info">
                    <span>{product.brand}</span>
                    <span>{product.name}</span>
                    <span>${product.basePrice}</span>
                </div>
            </Link>     
            {/* TODO: Delete CartButtons button        */}
            <CartButtons product={product} />           
        </div>
    )
}

export default ProductItem