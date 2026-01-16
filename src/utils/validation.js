export const validateLogin = (username, password) => {
    if (!username.trim()) return 'Username required';
    if (password.length < 6) return 'Password min 6 chars';
    return null;
};
