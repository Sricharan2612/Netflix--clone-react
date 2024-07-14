import { type } from "@testing-library/user-event/dist/type";

export const login = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};