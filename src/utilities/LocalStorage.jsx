
export const setProductInLocalStorage = (key, value) => {
    try {
        if (!key || typeof key !== 'string') {
            throw new Error('Invalid storage key provided');            
        }
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};
export const getProductFromLocalStorage = (key) => {
    try {
        if (!key || typeof key !== 'string') {
            throw new Error('Invalid storage key provided');
        }

        const item = window.localStorage.getItem(key);        
        return item ? JSON.parse(item) : undefined;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

export const removeProductFromLocalStorage = (key) => {
    try {
        if (!key || typeof key !== 'string') {
            throw new Error('Invalid storage key provided');
        }
        window.localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
};