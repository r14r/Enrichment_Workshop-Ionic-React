import { createContext } from 'react';

export type User = {
    name: string;
    email: string;
}

const UserContext = createContext<Partial<User>>({});

export default UserContext;

