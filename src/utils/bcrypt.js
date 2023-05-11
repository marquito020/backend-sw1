const { hash, compare } = require('bcrypt');

exports.hashPassword = async (password) => {
    const salt = await hash(password, 8);
    return salt;
};

exports.comparePassword = async (password, hash) => {
    const match = await compare(password, hash);
    return match;
}