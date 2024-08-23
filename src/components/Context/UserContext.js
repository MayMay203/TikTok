import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)

    const toggleLogin = () => {
        setIsLogin(prev => !prev);
    }

    const value = {
        isLogin,
        toggleLogin,
    }

    return (<UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>);
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export  {UserContext, UserProvider};