import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import PhonePage from '../pages/PhonePage.jsx';
import '@testing-library/jest-dom';

jest.mock('../context/ProductContext', () => ({
    useProductContext: jest.fn()
}));

describe('PhonePage Component', () => {
    const mockFetchProductById = jest.fn();
    const mockAddToCart = jest.fn();
    const mockSetSelectedStorage = jest.fn();
    const mockSetSelectedColor = jest.fn();

    const mockContextValue = {
        fetchProductById: mockFetchProductById,
        selectedProduct: {
            id: '1',
            name: 'Test Phone',
            brand: 'Test Brand',
            description: 'Test Description',
            specs: {
                screen: '6.5 inches',
                resolution: '1080x2400',
                processor: 'Test Processor',
                mainCamera: '50MP',
                selfieCamera: '16MP',
                battery: '4500mAh',
                os: 'Test OS',
                screenRefreshRate: '120Hz'
            },
            storageOptions: [
                { capacity: '128GB', price: 500 },
                { capacity: '256GB', price: 600 }
            ],
            colorOptions: [
                { name: 'Black', hexCode: '#000', imageUrl: 'black.jpg' },
                { name: 'White', hexCode: '#fff', imageUrl: 'white.jpg' }
            ],
            similarProducts: []
        },
        loading: false,
        error: null,
        products: [],
        addToCart: mockAddToCart,
        setSelectedStorage: mockSetSelectedStorage,
        setSelectedColor: mockSetSelectedColor,
        selectedStorage: null,
        selectedColor: null
    };

    beforeEach(() => {
        useProductContext.mockReturnValue(mockContextValue);
    });

    test('renders phone page correctly', () => {
        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        const phoneTextElements = screen.getAllByText('Test Phone');
        expect(phoneTextElements.length).toBe(1);
        expect(phoneTextElements[0]).toBeInTheDocument();
        expect(screen.getByText('From 500 EUR')).toBeInTheDocument();
    });

    test('calls fetchProductById on render', () => {
        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        expect(mockFetchProductById).toHaveBeenCalledWith('1');
    });

    test('handles storage selection', () => {
        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByText('128GB'));
        expect(mockSetSelectedStorage).toHaveBeenCalledWith({ capacity: '128GB', price: 500 });
    });

    test('handles color selection', () => {
        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByText('Black'));
        expect(mockSetSelectedColor).toHaveBeenCalledWith({ name: 'Black', hexCode: '#000', imageUrl: 'black.jpg' });
    });

    test('displays error message when there is an error', () => {
        useProductContext.mockReturnValue({ ...mockContextValue, error: 'Failed to load product' });
        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        expect(screen.getByText('Error: Failed to load product')).toBeInTheDocument();
    });

    test('disables add to cart button when no storage or color selected', () => {
        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        const addButton = screen.getByText(/añadir/i);
        expect(addButton).toBeInTheDocument();
        expect(addButton).toBeDisabled();
    });

    test('enables add to cart button when storage and color are selected', () => {
        useProductContext.mockReturnValue({
            ...mockContextValue,
            selectedStorage: mockContextValue.selectedProduct.storageOptions[0],
            selectedColor: mockContextValue.selectedProduct.colorOptions[0]
        });

        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        const addButton = screen.getByText('añadir');
        expect(addButton).not.toBeDisabled();
    });

    test('handles adding product to cart', () => {
        useProductContext.mockReturnValue({
            ...mockContextValue,
            selectedStorage: mockContextValue.selectedProduct.storageOptions[0],
            selectedColor: mockContextValue.selectedProduct.colorOptions[0]
        });
        render(
            <BrowserRouter>
                <PhonePage />
            </BrowserRouter>
        );
        const addButton = screen.getByText('añadir');
        fireEvent.click(addButton);
        expect(mockAddToCart).toHaveBeenCalled();
    });
});
