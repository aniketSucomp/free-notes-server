module.exports = (app) => {
  app.use("/api", [
    require("../validators-services-routes/user/routes"),
    require("../validators-services-routes/field/routers"),
    require("../validators-services-routes/subject/routes"),
    require("../validators-services-routes/documents/routes"),
  ]);
  app.get("/", (req, res) => {
    res.send("Server is working now");
  });
  app.all("*", (req, res) => {
    return res.status(404).jsonp({
      status: 404,
      message: "route Not Found",
    });
  });
};
