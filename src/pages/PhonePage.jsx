import { useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';
import Button from '../components/Button';

const PhonePage = () => {
    const { 
        fetchProductById, 
        selectedProduct, 
        loading, 
        error, 
        products, 
        addToCart 
    } = useProductContext();

    const { id } = useParams();
    
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [phoneImage, setPhoneImage] = useState(null);
    const [finalPrice, setFinalPrice] = useState(null);    
    
    // In this useEffect we fetch the product from the API by id
    // With a filter function we find the product by id
    // If the product is found, we set the phoneImage and finalPrice states
    useEffect(() => {
        fetchProductById(id);  
        const phone = products.find(product => product.id === id);
        if (phone) {
            setPhoneImage(phone.imageUrl);
            setFinalPrice(phone.basePrice);
        }        
    }, [id, products]); 
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!selectedProduct) return <div>No product found</div>;
    
    // Function to handle storage selection
    // When we select a storage option, we set the selectedStorage state with a price
    const handleStorageSelection = (storageOption) => {
        setSelectedStorage(storageOption);
        setFinalPrice(storageOption.price);
    };
    
    // Function to handle color selection
    // When we select a color option, we set the selectedColor state 
    // and changing the main phone's image
    const handleColorSelection = (colorOption) => {
        setSelectedColor(colorOption);
        setPhoneImage(colorOption.imageUrl);
    };
    
    // Check if the add to cart button is disabled
    const isAddToCartDisabled = !selectedStorage || !selectedColor;    
    
    return (
        <div className="phone-page-wrapper">
            <div className="phone-page-container">
                {/* TODO: Add onClick to the back button */}
                <Button 
                    id='back-button' 
                    title='Back' 
                    leftIcon={<span>{'<'}</span>} 
                    containerClass='phone-page-back-button'                    
                />
                <div className="phone-page-main-info-container">
                    <div className="phone-page-img-container">
                        <img 
                            src={phoneImage} 
                            alt={selectedProduct.name} 
                        />
                    </div>
                    <div className="phone-page-info-container">
                        <h3>{selectedProduct.name}</h3>
                        <h3>{`${finalPrice} EUR`}</h3>
                        
                        {/* Storage Options */}
                        <h3 className='phone-page-storage-title'>Choose Storage</h3>
                        <div className="phone-page-storage-options-container">
                            {selectedProduct.storageOptions?.map((storageOption, index) => (
                                <div 
                                    key={index} 
                                    className={`phone-page-storage-option ${selectedStorage === storageOption ? 'selected' : ''}`}
                                    onClick={() => handleStorageSelection(storageOption)}
                                >
                                    <p>{storageOption.capacity}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Color Options */}
                        <h3>Choose Color</h3>
                        <div className="color-options-container">
                            {selectedProduct.colorOptions?.map((colorOption, index) => (
                                <div 
                                    key={index} 
                                    className={`color-option ${selectedColor === colorOption ? 'selected' : ''}`}
                                    onClick={() => handleColorSelection(colorOption)}
                                >
                                    <div 
                                        className="color-option-square" 
                                        style={{ backgroundColor: colorOption.hexCode }}
                                    />
                                    <p>{colorOption.name}</p>
                                    
                                </div>
                            ))}
                        </div>
                        
                        {/* Add to Cart Button */}                        
                        <Button 
                            id='add-to-cart-button' 
                            title='añadir'                             
                            containerClass='add-to-cart-btn'
                            disabled={isAddToCartDisabled}
                            onClick={() => addToCart(selectedProduct)}
                        />
                    </div>
                </div>
                
                {/* Technical Specifications */}
                <div className="phone-specs-container">
                    <h3>Technical Specifications</h3>
                    <ul>
                        <li><strong>Screen:</strong> {selectedProduct.specs?.screen}</li>
                        <li><strong>Resolution:</strong> {selectedProduct.specs?.resolution}</li>
                        <li><strong>Processor:</strong> {selectedProduct.specs?.processor}</li>
                        <li><strong>Main Camera:</strong> {selectedProduct.specs?.mainCamera}</li>
                        <li><strong>Selfie Camera:</strong> {selectedProduct.specs?.selfieCamera}</li>
                        <li><strong>Battery:</strong> {selectedProduct.specs?.battery}</li>
                        <li><strong>Operating System:</strong> {selectedProduct.specs?.os}</li>
                        <li><strong>Refresh Rate:</strong> {selectedProduct.specs?.screenRefreshRate}</li>
                    </ul>
                </div>

                {/* Similar Products */}
                <div className="similar-products-wrapper">
                    <h3>Similar Products</h3>
                    <div className="similar-products-container">
                        {selectedProduct.similarProducts.map((phone, index) => (
                            <ProductItem
                                key={phone.id + index}
                                product={phone}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhonePage;