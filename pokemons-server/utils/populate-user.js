const populationFields = "_id name sprites stats types";

const populateUser = async (user, field) => {
    return await user.populate(field, populationFields).execPopulate();
}

module.exports = {
    populateUser,
    populationFields
}
