const db = require("../models");
var User = db.User;
const Op = db.Sequelize.Op;

async function createUser(data) {
    const userdata = await User.create(data);
    return userdata;
};

async function updateUser(data, id) {
    const userdata = await User.update(data, {
        where: { id }
    });
    return userdata;
};

async function deleteUser(id) {
    const userdata = await User.destroy({
        where: { id }
    });
    return userdata;
};

async function findUser(id) {
    const userdata = await User.findOne({
        include: [{
            model: db.Address,
        }],
        where: { id }
    });
    return userdata;
};

async function findAllUser(search) {
    const userdata = await User.findAll({
        include: [{
            model: db.Address,
            where: {
                country: { [Op.like]: `%${search}%` }
            }
        }],
        where: {
            [Op.or]: {
                occupation: {
                    [Op.in]: ['self employed', 'job']
                },
                age: {
                    [Op.between]: [44, 90]
                }
            }
        }
    });

    return userdata;
};

async function deleteAllUser() {
    const userdata = User.destroy({
        where: {},
        truncate: false
    });
    return userdata;
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    findUser,
    findAllUser,
    deleteAllUser
}