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
        // Check if selectedProduct, selectedStorage, and selectedColor are defined
        if (!selectedProduct || !selectedStorage || !selectedColor) return;

        const productToAdd = {
            cartId: `${selectedProduct.id}-${selectedStorage.capacity}-${selectedColor.name}-${Date.now()}`, // Ensure unique ID
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
            const existingProductIndex = prevCart.findIndex(prod =>
                prod.id === productToAdd.id &&
                prod.selectedStorage.capacity === productToAdd.selectedStorage.capacity &&
                prod.selectedColor.name === productToAdd.selectedColor.name
            );

            if (existingProductIndex !== -1) {
                return prevCart.map((product, index) =>
                    index === existingProductIndex ? { ...product, quantity: product.quantity + 1 } : product
                );
            } else {
                return [...prevCart, productToAdd];
            }
        });
    };

    const removeFromCart = (productToRemove) => {
        setCartProducts(prevCart => prevCart.filter(prod => prod.id !== productToRemove.id));
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

    //Serching products in SearchBar component

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setFilteredProducts(products);
                return;
            }
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }, 300); // 300ms delay

        return () => clearTimeout(delaySearch); // Cleanup timeout on every keystroke
    }, [searchTerm, products]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <ProductContext.Provider value={{
            products: searchTerm ? filteredProducts : products,
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
            selectedColor,
            searchTerm,
            handleSearch
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
