// LocalStorage wrapper

export const getStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return null;
  }
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage', error);
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage', error);
  }
};
