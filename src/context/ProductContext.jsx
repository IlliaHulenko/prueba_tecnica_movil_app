import { createContext, useState, useEffect, useContext, useCallback, use } from 'react';
import {
    getProductFromLocalStorage,
    setProductInLocalStorage,
    removeProductFromLocalStorage
} from '../utilities/LocalStorage';

export const ProductContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function ProductContextProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Product selected by id by fetching from the API fetchProductById
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [totalPrice, setTotalPrice] = useState(0);    
    const [cartProducts, setCartProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://prueba-tecnica-api-tienda-moviles.onrender.com/products', {
                headers: {
                    'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} ${errorMessage}`);
            }

            const data = await response.json();
            if (!data) {
                throw new Error('No products received');
            }
            // Filter out duplicates and limit to 20 products for display
            const uniqueProducts = Array.from(
                new Map(data.map(product => [product.id, product])).values()
            );
            const limitedProd = uniqueProducts.slice(0, 20); 
            setProducts(limitedProd);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (id) => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${id}`, {
                headers: {
                    'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} ${errorMessage}`);
            }

            const data = await response.json();
            if (!data) {
                throw new Error('No product received');
            }
            setSelectedProduct(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            setSelectedProduct(null);
        } finally {
            setLoading(false);
        }
    };
    
    // Load products from local storage if available and merge with fetched products
    useEffect(() => {
        const storedCartProducts = getProductFromLocalStorage('products-saved') || [];
    
        fetchProducts().then(() => {
            setProducts(prevProducts => {
                const mergedProducts = prevProducts.map(product => {
                    const storedProduct = storedCartProducts.find(p => p.id === product.id);
                    return storedProduct ? { ...product, quantity: storedProduct.quantity } : product;
                });
                return mergedProducts;
            });
        });
    }, []);

    useEffect(() => {
        const productsInCart = products.filter(product => product.quantity > 0);
        setCartProducts(productsInCart);

        const price = productsInCart.reduce((acc, product) => acc + product.basePrice * product.quantity, 0);
        setTotalPrice(price);
    }, [products]);

    useEffect(() => {
        if (cartProducts.length > 0) {
            setLocalStorage();
        }
        if (cartProducts.length === 0) {            
            removeProductFromLocalStorage('products-saved');
        }      
    }, [cartProducts]);

    const addToCart = (productToAdd) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productToAdd.id
                    ? { ...product, quantity: (product.quantity || 0) + 1 }
                    : product
            )
        );
    };

    const removeFromCart = (productToRemove) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productToRemove.id
                    ? { ...product, quantity: 0 }
                    : product
            )
        );        
    };

    const setLocalStorage = () => {
        const productsToStore = products.filter(item => item.quantity > 0);
        setProductInLocalStorage('products-saved', productsToStore);
    };    

    return (
        <ProductContext.Provider value={{
            products,
            selectedProduct,
            loading,
            error,
            addToCart,
            removeFromCart,
            cartProducts,
            fetchProductById,
            totalPrice
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductContextProvider');
    }
    return context;
}