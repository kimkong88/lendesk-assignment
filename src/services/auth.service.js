const register = async (email, password) => {
    const user = {
        email,
        password,
    };
    return user;
};

const login = async (email, password) => {
    const user = { email, password };
    return user;
};
