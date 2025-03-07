import { setProductInLocalStorage, getProductFromLocalStorage, removeProductFromLocalStorage } from '../utilities/LocalStorage.jsx';

describe('LocalStorage Utility Functions', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('setProductInLocalStorage should store a value correctly', () => {
        const key = 'testKey';
        const value = { id: 1, name: 'Test Product' };
        expect(setProductInLocalStorage(key, value)).toBe(true);
        expect(JSON.parse(localStorage.getItem(key))).toEqual(value);
    });

    test('setProductInLocalStorage should handle invalid keys', () => {
        expect(setProductInLocalStorage('', { test: 'data' })).toBeUndefined();
        expect(console.error).toHaveBeenCalled();
    });

    test('getProductFromLocalStorage should retrieve a stored value', () => {
        const key = 'testKey';
        const value = { id: 2, name: 'Another Product' };
        localStorage.setItem(key, JSON.stringify(value));
        expect(getProductFromLocalStorage(key)).toEqual(value);
    });

    test('getProductFromLocalStorage should return undefined for non-existing keys', () => {
        expect(getProductFromLocalStorage('nonExistentKey')).toBeUndefined();
    });

    test('getProductFromLocalStorage should handle invalid keys', () => {
        expect(getProductFromLocalStorage('')).toBeNull();
        expect(console.error).toHaveBeenCalled();
    });

    test('removeProductFromLocalStorage should remove a stored item', () => {
        const key = 'testKey';
        localStorage.setItem(key, JSON.stringify({ id: 3, name: 'Removable Product' }));
        expect(removeProductFromLocalStorage(key)).toBe(true);
        expect(localStorage.getItem(key)).toBeNull();
    });

    test('removeProductFromLocalStorage should handle invalid keys', () => {
        expect(removeProductFromLocalStorage('')).toBe(false);
        expect(console.error).toHaveBeenCalled();
    });
});