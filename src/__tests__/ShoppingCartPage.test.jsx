import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductContextProvider } from '../context/ProductContext'; // Assuming ProductContextProvider is used to wrap components
import ShoppingCartPage from '../pages/ShoppingCartPage';
import '@testing-library/jest-dom';

jest.mock('../context/ProductContext', () => ({
    useProductContext: jest.fn(),
}));

describe('ShoppingCartPage Component', () => {
    const mockAddToCart = jest.fn();
    const mockRemoveFromCart = jest.fn();
    const mockSetSelectedStorage = jest.fn();
    const mockSetSelectedColor = jest.fn();
    const mockFetchProductById = jest.fn();

    beforeEach(() => {
        // Reset mock functions before each test
        mockAddToCart.mockClear();
        mockRemoveFromCart.mockClear();
        mockSetSelectedStorage.mockClear();
        mockSetSelectedColor.mockClear();
        mockFetchProductById.mockClear();
    });

    const mockContextValue = {
        fetchProductById: mockFetchProductById,
        selectedProduct: {
            id: '1',
            name: 'Test Phone',
            basePrice: 500,
            storageOptions: [{ capacity: '64GB', price: 500 }, { capacity: '128GB', price: 600 }],
            colorOptions: [{ name: 'Black', hexCode: '#000' }, { name: 'White', hexCode: '#FFF' }],
            specs: { screen: '6.1', resolution: '1080p', processor: 'Snapdragon', battery: '4000mAh' },
            similarProducts: [
                { id: '2', name: 'Phone A', basePrice: 450, imageUrl: 'url-to-image' },
                { id: '3', name: 'Phone B', basePrice: 550, imageUrl: 'url-to-image' },
            ],
        },
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
        setSelectedStorage: mockSetSelectedStorage,
        setSelectedColor: mockSetSelectedColor,
        selectedStorage: null,
        selectedColor: null,
        loading: false,
        error: null,
        products: [{ id: '1', name: 'Test Phone', basePrice: 500 }],
    };

    test('renders shopping cart page correctly', async () => {
        mockFetchProductById.mockReturnValueOnce({ id: '1' });

        render(
            <ProductContextProvider value={mockContextValue}>
                <BrowserRouter>
                    <ShoppingCartPage />
                </BrowserRouter>
            </ProductContextProvider>
        );

        const phoneTextElements = screen.getAllByText('Test Phone');
        expect(phoneTextElements.length).toBe(1); // Ensure only one "Test Phone" text appears
        expect(screen.getByText('From 500 EUR')).toBeInTheDocument();
    });

    test('calls fetchProductById on render with correct id', async () => {
        render(
            <ProductContextProvider value={mockContextValue}>
                <BrowserRouter>
                    <ShoppingCartPage />
                </BrowserRouter>
            </ProductContextProvider>
        );

        await waitFor(() => expect(mockFetchProductById).toHaveBeenCalledWith('1'));
    });

    test('disables add to cart button when no storage or color selected', async () => {
        render(
            <ProductContextProvider value={mockContextValue}>
                <BrowserRouter>
                    <ShoppingCartPage />
                </BrowserRouter>
            </ProductContextProvider>
        );

        const addButton = screen.getByText(/añadir/i);
        expect(addButton).toBeInTheDocument();
        expect(addButton).toBeDisabled(); // Ensure button is disabled when storage and color are not selected
    });

    test('enables add to cart button when storage and color are selected', async () => {
        // Mock the selection of storage and color
        mockContextValue.selectedStorage = mockContextValue.selectedProduct.storageOptions[0];
        mockContextValue.selectedColor = mockContextValue.selectedProduct.colorOptions[0];

        render(
            <ProductContextProvider value={mockContextValue}>
                <BrowserRouter>
                    <ShoppingCartPage />
                </BrowserRouter>
            </ProductContextProvider>
        );

        const addButton = screen.getByText(/añadir/i);
        expect(addButton).toBeInTheDocument();
        expect(addButton).not.toBeDisabled(); // Ensure button is enabled when storage and color are selected
    });

    test('handles adding product to cart', async () => {
        // Mock the selection of storage and color
        mockContextValue.selectedStorage = mockContextValue.selectedProduct.storageOptions[0];
        mockContextValue.selectedColor = mockContextValue.selectedProduct.colorOptions[0];

        render(
            <ProductContextProvider value={mockContextValue}>
                <BrowserRouter>
                    <ShoppingCartPage />
                </BrowserRouter>
            </ProductContextProvider>
        );

        const addButton = screen.getByText(/añadir/i);
        fireEvent.click(addButton);

        await waitFor(() => expect(mockAddToCart).toHaveBeenCalled()); // Ensure addToCart is called
    });

    test('displays error message when there is an error', async () => {
        const errorContextValue = { ...mockContextValue, error: 'An error occurred' };

        render(
            <ProductContextProvider value={errorContextValue}>
                <BrowserRouter>
                    <ShoppingCartPage />
                </BrowserRouter>
            </ProductContextProvider>
        );

        expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
});
