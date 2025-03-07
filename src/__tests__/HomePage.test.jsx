import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';

import '@testing-library/jest-dom';

jest.mock('../components/ProductList', () => jest.fn(() => <div>Mocked Product List</div>));

describe('HomePage Component', () => {
    test('renders HomePage correctly', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(screen.getByText('Mocked Product List')).toBeInTheDocument();
    });
});
