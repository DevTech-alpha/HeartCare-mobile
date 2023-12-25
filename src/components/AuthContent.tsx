import React, { createContext } from 'react';

import User from '../model/User';

interface IAuthContext {

    signIn: (user: typeof User) => void; 
   
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default AuthContext;

