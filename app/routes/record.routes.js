module.exports = app => {
    const records = require("../controllers/record.controller.js");
  
    var router = require("express").Router();
  
    // Create a new record
    router.post("/", records.create);
  
    // Retrieve all records
  //  router.get("/", records.findAll);
  
    // Retrieve all published records
//    router.get("/published", records.findAllPublished);
  
    // Retrieve a single record with id
    router.get("/", records.findOne);
  
    // Update a record with id
    router.put("/:id", records.update);
  
    // Delete a record with id
    router.delete("/:id", records.delete);

    //Login auth
    router.post("/login", records.login)

    // Delete all records
  //  router.delete("/", records.deleteAll);
  
    app.use('/api/records', router);
  };