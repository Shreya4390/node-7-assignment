const db = require("../models");
var Address = db.Address;

async function addAddress(data) {
    const address = await Address.create(data);
    return address;
};

async function updateAddress(data) {
    const address = await Address.update(data, {
        where: { UserId: data.UserId }
    });
    return address;
};

module.exports = {
    addAddress,
    updateAddress,
}