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
        addToCart,
        setSelectedStorage,
        setSelectedColor,
        selectedStorage,
        selectedColor
    } = useProductContext();

    const { id } = useParams();

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
        if (!selectedStorage) {
            setSelectedStorage(selectedProduct.storageOptions[0]);
        }
    };

    // Check if the add to cart button is disabled
    const isAddToCartDisabled = !selectedStorage || !selectedColor;

    return (
        <div className="phone-page-wrapper">
            {/* TODO: Add onClick to the back button */}
            <Button
                id='back-button'
                title='Back'
                leftIcon={<span>{'<'}</span>}
                containerClass='phone-page-back-button'
            />
            <div className="phone-page-container">
                <div className="phone-page-main-info-container">
                    <div className="phone-page-img-container">
                        <img
                            src={phoneImage}
                            alt={selectedProduct.name}
                        />
                    </div>
                    <div className="phone-page-info-container">
                        <div className="phone-page-info-container-title">
                            <h3 id='title-name'>{selectedProduct.name}</h3>
                            {!selectedStorage ? (
                                <h3>{`From ${finalPrice} EUR`}</h3>
                            ) : (
                                <h3>{`${finalPrice} EUR`}</h3>
                            )}
                        </div>

                        {/* Storage Options */}
                        <h3 className='phone-page-storage-title'>Storage¿How much space do you need?</h3>
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
                        <h3 className='phone-page-color-title'>Color. Pick your favorite.</h3>
                        <div className="color-options-container">
                            {selectedProduct.colorOptions?.map((colorOption, index) => (
                                <div
                                    key={index}
                                    className="color-option"
                                    onClick={() => handleColorSelection(colorOption)}
                                >
                                    <div className={`color-option-wrapper ${selectedColor === colorOption ? 'selected' : ''}`}>
                                        <div
                                            className="color-option-square"
                                            style={{ backgroundColor: colorOption.hexCode }}
                                        />
                                    </div>
                                    <p className={`color-name ${selectedColor === colorOption ? 'visible' : ''}`}>
                                        {colorOption.name}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            id='add-to-cart-button'
                            title='añadir'
                            containerClass='add-to-cart-btn'
                            disabled={isAddToCartDisabled}
                            onClick={addToCart} // Now each phone is stored independently
                        />

                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="phone-specs-container">
                    <h2>Specifications</h2>
                    <div className='phone-specs-info'><h4>Brand</h4> <p>{selectedProduct?.brand}</p></div>
                    <div className='phone-specs-info'><h4>Name</h4> <p>{selectedProduct?.name}</p></div>
                    <div className='phone-specs-info'><h4>Description</h4> <p>{selectedProduct?.description}</p></div>
                    <div className='phone-specs-info'><h4>Screen</h4> <p>{selectedProduct.specs?.screen}</p></div>
                    <div className='phone-specs-info'><h4>Resolution</h4> <p>{selectedProduct.specs?.resolution}</p></div>
                    <div className='phone-specs-info'><h4>Processor</h4> <p>{selectedProduct.specs?.processor}</p></div>
                    <div className='phone-specs-info'><h4>Main Camera</h4> <p>{selectedProduct.specs?.mainCamera}</p></div>
                    <div className='phone-specs-info'><h4>Selfie Camera</h4> <p>{selectedProduct.specs?.selfieCamera}</p></div>
                    <div className='phone-specs-info'><h4>Battery</h4> <p>{selectedProduct.specs?.battery}</p></div>
                    <div className='phone-specs-info'><h4>OS</h4> <p>{selectedProduct.specs?.os}</p></div>
                    <div className='phone-specs-info'><h4>Scrren refresh rate</h4> <p>{selectedProduct.specs?.screenRefreshRate}</p></div>
                </div>

                {/* Similar Products */}
                <div className="similar-products-wrapper">
                    <h2>Similar items</h2>
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