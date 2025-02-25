
import { useProductContext } from '../context/ProductContext'

import ProductItem from './Productitem';

const ProductList = () => {
    const { 
        loading, 
        error, 
        products
    } = useProductContext();        

    if (!products) return <p>No products found</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    // Add an index to truly guarantee unique keys
    return (
        <div className="product-list-wrapper">
            {products.map((product, index) => (
                <ProductItem
                    key={`${product.id}-${index}`}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductList;