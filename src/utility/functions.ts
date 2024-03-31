import Cookies from 'js-cookie'

/**
 * This function can be used anywhere in the app to greet the user
 * @param userName The user's first name
 * @returns A kind greeting message
 */
export const sayHello = (userName: string): string => {
    return 'Welcome ' + userName + '!'
}

// Set data to localStorage
export const setLocalStorageData = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

// Get data from localStorage
export const getLocalStorageData = (key: string) => {
    return localStorage.getItem(key)
}

export const setCookieData = (name: string, value: string, days: number) => {
    Cookies.set(name, value, { expires: days })
}

// Get data from cookie
export const getCookieData = (name: string): string | undefined => {
    return Cookies.get(name)
}
