import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Get the stored value from local storage or use the initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key “" + key + "”: ", error);
            return initialValue;
        }
    });

    // Set the value in local storage whenever it changes
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error writing localStorage key “" + key + "”: ", error);
        }
    };

    // Function to remove the item from local storage
    const removeLocalToken = (key) => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue); // Reset storedValue to initialValue
        } catch (error) {
            console.error("Error removing localStorage key “" + key + "”: ", error);
        }
    };

        // Function to get the item from local storage directly
        const getLocalItem = () => {
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.error("Error reading localStorage key “" + key + "”: ", error);
                return initialValue;
            }
        };

    return [storedValue, setValue, removeLocalToken, getLocalItem]; // Return as part of the array
};

export default useLocalStorage;
