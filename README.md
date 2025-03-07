# Zara Phone Store Challenge - Merlin Software

This project is a front-end web application built with React that simulates an online phone store, inspired by the Zara aesthetic. It allows users to browse, select, and view detailed information about different phone models, including storage and color options. Users can also add the selected phone to a simulated cart.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Project Structure](#project-structure)
-   [Setup and Installation](#setup-and-installation)
-   [Usage](#usage)
-   [Key Components](#key-components)
-   [Context and State Management](#context-and-state-management)
-   [Routing](#routing)
-   [API Interaction](#api-interaction)
-   [Styling](#styling)
-   [Known Issues and Improvements](#known-issues-and-improvements)
-   [Author](#author)

## Features

-   **Product Listing:** Displays a list of available phone products on the main page.
-   **Detailed Product View:** Shows detailed information about a specific phone, including images, name, price, storage options, color options, and technical specifications.
-   **Dynamic Pricing:** The displayed price updates based on the selected storage option.
-   **Color Selection:** Users can select different color variants, and the main product image updates accordingly.
-   **Storage Selection:** Users can choose different storage options.
-   **Add to Cart:** A button to add the selected phone to a (simulated) cart.
-   **Similar Products:** Recommends similar products based on the current selection.
-   **Animated Transitions:** Smooth page transitions using `document.startViewTransition` (if available).
-   **Loading and Error Handling:** Displays loading and error messages as needed.
-   **Responsive Design:** Adapts to different screen sizes.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **React Router:** For client-side routing.
-   **React Context API:** For state management.
-   **JavaScript (ES6+):** The core programming language.
- **HTML5** 
## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd zara-challenge
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Open the application in your browser:**

    Open `http://localhost:5173/` to view it in your browser.

## Key Components

-   **`App.js`:** The root component that sets up routing and the overall application structure.
-   **`ProductItem.jsx`:** A reusable component for displaying a product card with basic details in the home page.
-   **`Button.jsx`:** A custom button component used throughout the application for consistency.
-   **`HomePage.jsx`:** The main page that lists all available products.
-   **`PhonePage.jsx`:** The detailed view page for a specific phone, allowing users to select storage, color, and add to the cart.

## Context and State Management

-   **`ProductContext.jsx`:** This file defines a context (`ProductContext`) that manages the following global states:
    -   `products`: An array of all products.
    -   `selectedProduct`: The currently selected product (for the detailed view).
    -   `loading`: A boolean indicating if data is being fetched.
    -   `error`: Any error that might have occurred.
    - `selectedStorage` The current selected storage option
    - `selectedColor` The current selected color option
    -   `addToCart`: A function to handle adding a product to the cart.
    -   `fetchProductById`: A function to fetch a specific product by its ID.

## Routing

-   **React Router** is used to handle routing between different pages.
-   `/`: The main page displaying the list of products.
-   `/phone/:id`: The page displaying the detailed information about a specific phone (where `:id` is the product ID).

## API Interaction

-   The `ProductContext` likely contains the logic to fetch data from an API endpoint (not defined in the file).
-   The `fetchProductById` function is responsible for fetching data for a single product by its ID.
- The `useEffect` in `PhonePage` is used to trigger the fetch when the component mount.

## Styling

-   The styling is done using CSS.
-   The `index.css` contains the global CSS styles.
-   Each component also has its own specific CSS classes.

## Known Issues and Improvements

-   **Simulated Cart:** The "Add to Cart" functionality doesn't have a real cart implementation. It would need a more robust state management solution or local storage to persist cart data.
-   **API Endpoint:** The API endpoint for fetching products is not explicitly defined in the code.
- **Add more detailed information** The API could have more information about the products.
- **Mobile support** The page is adapted for mobile but it could be improved.
-   **Error handling:** While there are error states, the handling could be more robust, with specific error messages and recovery options.
-   **Test** Unitary and integration testing could be added to validate the functionallity.

## Author

- https://github.com/IlliaHulenko/ Illia Hulenko
- **CSS3:** For the styling.

## Project Structure

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# prueba_tecnica_movil_app
