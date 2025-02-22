import { useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { useEffect } from 'react';

const PhonePage = () => {
    const { fetchProductById, selectedProduct, loading, error, products } = useProductContext();
    const { id } = useParams();

    useEffect(() => {
        // Used the id from useParams instead of productId prop
        fetchProductById(id);
    }, [id]);

    const phone = products.find(product => product.id === id); 
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!selectedProduct) return <div>No product found</div>;

    // Destructure specs for easier access
    const { 
        screen,
        resolution,
        processor,
        mainCamera,
        selfieCamera,
        battery,
        os,
        screenRefreshRate
    } = selectedProduct.specs || {};

    return (
        <div className="phone-page-wrapper">
            {/* IMG */}
            <div className="phone-page-img-container">
                <img 
                    src={phone.imageUrl} 
                    alt={selectedProduct.name} 
                    width={500} 
                    height={500} 
                />
            </div>
            <div className="phone-page-info-container">
                {/* TEXT */}
                <div className="phone-page-text-container">
                    <h2>{selectedProduct.brand}</h2>
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.description}</p>
                </div>
                {/* PRICE */}
                <div>
                    <p>$ {selectedProduct.basePrice}</p>
                </div>
                {/* SPECS */}
                <h3>Specs</h3>
                <p>Screen: {screen}</p>
                <p>Resolution: {resolution}</p>
                <p>Processor: {processor}</p>
                <p>Main Camera: {mainCamera}</p>
                <p>Selfie Camera: {selfieCamera}</p>
                <p>Battery: {battery}</p>
                <p>OS: {os}</p>
                <p>Screen Refresh Rate: {screenRefreshRate}</p>

                {/* COLOR OPTIONS */}
                <h3>Color Options</h3>
                <div className="color-options-container" style={{ display: 'flex', gap: '1rem' }}>
                    {selectedProduct.colorOptions && selectedProduct.colorOptions.map((colorOption, index) => (
                        <div key={index} className="color-option" style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: colorOption.hexCode,
                                border: '1px solid #ccc'
                            }} />
                            <p>{colorOption.name}</p>
                            <img 
                                src={colorOption.imageUrl} 
                                alt={colorOption.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhonePage;