const userService = require('../services/users')

const getUser = async (email, userRepository) => {
    return await userService.getUser({ email }, userRepository)
}

const saveUser = async (email, userRepository) => {
    return await userService.getUser({ email }, userRepository)
}

const deleteUser = async (email, userRepository) => {
    return await userService.getUser({ email }, userRepository)
}

module.exports = {
    getUser,
    saveUser,
    deleteUser
}