import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem('dark') === 'true')

    useEffect(() => {
        document.querySelector('html').classList.toggle('dark', theme);
        localStorage.setItem('dark', theme);
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => !prev);
    }

    const value = {
        theme,
        toggleTheme,
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export {ThemeContext, ThemeProvider};