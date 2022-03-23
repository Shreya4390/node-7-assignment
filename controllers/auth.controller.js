
const { createUser, updateUser, deleteUser, findUser, findAllUser, deleteAllUser } = require('../repository/user-sequlizer')
const { addAddress, updateAddress } = require('../repository/address-sequlizer')
const { validationResult } = require('express-validator');

// Create and Save a new User
exports.createUser = (req, res) => {
    try {
        // Create a User
        const user = {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            age: req.body.age,
            occupation: req.body.occupation
        };
        // Save User in the database
        createUser(user).then((data) => {
            if (data) {
                if (data?.dataValues?.id) {
                    const address = {
                        UserId: data.dataValues.id,
                        street: req.body.street,
                        city: req.body.city,
                        country: req.body.country
                    };
                    addAddress(address).then((userAddress) => {
                        res.send({ message: "User added successfully" });
                    })
                }
            }
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

// Update a User by the id in the request
exports.updateUserDetails = async (req, res) => {
    try {
        const id = JSON.parse(req.params.id);

        updateUser(req.body, id).then((data) => {
            if (data) {
                const address = {
                    UserId: id,
                    street: req.body.street,
                    city: req.body.city,
                    country: req.body.country
                };
                updateAddress(address).then((userAddress) => {
                    res.send({
                        message: "User details updated successfully."
                    });
                })
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: `Error updating User with id=${id}`
            });
        });
    } catch (err) {
        res.status(400).json(err);
    };
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
    const id = JSON.parse(req.params.id);
    deleteUser(id).then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
};

// Find a single User with an id
exports.findUser = (req, res) => {
    const id = JSON.parse(req.params.id);
    findUser(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: `Error retrieving User with id=${id}.`
            });
        });
};

// Retrieve all Users from the database.
exports.findAllUser = (req, res) => {
    const searchby = req.query.search;
    findAllUser(searchby).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users details."
            });
        });
};

// Delete all Users from the database.
exports.deleteAllUsers = (req, res) => {
    deleteAllUser().then(data => {
        if (data) {
            res.send({ message: `Users were deleted successfully!` });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all users details."
        });
    });
};
