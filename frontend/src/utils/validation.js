const validateLoginData = (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    return true;
}

const validateRegisterData = (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    return true;
}

export { validateLoginData, validateRegisterData };
