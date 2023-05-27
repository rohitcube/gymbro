const db = require("../models");
const Record = db.records;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.stu_num) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    if (!req.body.password) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    // Create a Record
    const record = {
      stu_num: req.body.stu_num,
      password: req.body.password,
      tele_id: req.body.tele_id
    };
  
    // Save Record in the database
    Record.create(record)
      .then(data => {
        res.send({
            message: "Account created successfully!",
            data: data
        });
     //   res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
  };

// Retrieve all records from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Record.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving records."
        });
      });
  };

  /*
// Find a single Record with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Record.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Record with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Record with id=" + id
        });
      });
  };
*/

// Find a single Record with student number 
exports.findOne = (req, res) => {
    const currNum = req.params.stu_num;
    Record.findOne({ stu_num: currNum })
    .then(data => {
        if (data) {
          res.send({
            message: "Account " + currNum + " logged in successfully!",
            data: data
        });
        } else {
          res.status(404).send({
            message: `Cannot find Record with student number=${currNum}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Record with student number=" + currNum
        });
      });
  };

// Update a Record by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Record.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Record was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Record with id=${id}. Maybe Record was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Record with id=" + id
        });
      });
  };

// Delete a Record with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Record.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Record was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Record with id=${id}. Maybe Record was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Record with id=" + id
        });
      });
  };

  /*
// Delete all records from the database.
exports.deleteAll = (req, res) => {
    Record.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} records were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all records."
        });
      });
  };

// Find all published records
exports.findAllPublished = (req, res) => {
    Record.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving records."
        });
      });
  };

*/