module.exports = (app) => {
    app.use("/users", require("./auth-routes"));
    app.use("/update", require("./user-update-routes"));
    app.use("/pokemons/favourite", require("./favourite-pokemons-routes"));
    app.use("/pokemons/team", require("./team-pokemons-routes"));
    app.use("/users", require("./users-routes"));
    app.use("/battles", require("./battles-routes"));
    app.use("/pokemons", require("./pokemons-routes"));
}