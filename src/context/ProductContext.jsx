import { createContext, useState, useEffect, useContext } from 'react';

export const ProductContext = createContext(null);

export default function ProductContextProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('products-saved');
        if (storedCart) {
            setCartProducts(JSON.parse(storedCart));
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://prueba-tecnica-api-tienda-moviles.onrender.com/products', {
                headers: {
                    'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (!data) throw new Error('No products received');

            const uniqueProducts = Array.from(new Map(data.map(product => [product.id, product])).values());
            setProducts(uniqueProducts.slice(0, 20));
        } catch (error) {
            setError(error.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (!data) throw new Error('No product received');

            setSelectedProduct(data);
        } catch (error) {
            setError(error.message || 'An unknown error occurred');
            setSelectedProduct(null);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = () => {
        if (!selectedProduct || !selectedStorage || !selectedColor) return;

        const productToAdd = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            brand: selectedProduct.brand,
            imageUrl: selectedColor.imageUrl, // Store selected image
            selectedStorage: { ...selectedStorage }, // Store selected storage
            selectedColor: { ...selectedColor }, // Store selected color
            finalPrice: selectedStorage.price, // Store selected price
            quantity: 1, // Default quantity
        };

        setCartProducts(prevCart => {
            const existingProductIndex = prevCart.findIndex(p =>
                p.id === productToAdd.id &&
                p.selectedStorage.capacity === productToAdd.selectedStorage.capacity &&
                p.selectedColor.name === productToAdd.selectedColor.name
            );

            if (existingProductIndex !== -1) {
                return prevCart.map((p, index) =>
                    index === existingProductIndex ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prevCart, productToAdd];
            }
        });
    };

    const removeFromCart = (productToRemove) => {
        setCartProducts(prevCart => prevCart.filter(p => p.id !== productToRemove.id));
    };

    useEffect(() => {
        const total = cartProducts.reduce((sum, cartProduct) => sum + (cartProduct.finalPrice * cartProduct.quantity), 0);
        setTotalPrice(total);
    }, [cartProducts]);

    useEffect(() => {
        if (cartProducts.length > 0) {
            localStorage.setItem('products-saved', JSON.stringify(cartProducts));
        } else {
            localStorage.removeItem('products-saved');
        }
    }, [cartProducts]);

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
            totalPrice,
            setSelectedStorage,
            setSelectedColor,
            selectedStorage,
            selectedColor
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductContextProvider');
    }
    return context;
};
