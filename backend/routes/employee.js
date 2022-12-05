const express = require("express");
const mongoose = require("mongoose");
const router = require('express').Router();
var Employee = require('../models/EmployeeModel')


router.get('/', function(req,res){
  res.json({
      status: 'working!',
      message: 'All good!'
  });
})
router.route('/employees').get((req,res)=> {
  Employee.find()
  .then(employees => res.json(employees))
  .catch(err => res.status(400))
})
router.route('/employees').post((req,res)=>{
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const newEmployee = new Employee({firstname, lastname, email});
  newEmployee.save()
  .then(()=>res.json('Successfully added Employee '))
  .catch(err => res.status(400).json(err));
});
router.route('/:id').get(((req,res)=>{
  Employee.findById(req.params.id)
  .then(employee => res.json(employee))
  .catch(err => res.status(400).json('Error: ' +err));
}))    
router.route(`/:id`).put((req,res)=>{
  Employee.findByIdAndUpdate(req.params.id)
  .then(employee => {
      employee.firstname = req.body.firstname;
      employee.lastname = req.body.lastname;
      employee.email = req.body.email;
      
      employee.save()
      .then(()=>res.json('Employee updated'))
      .catch(err => res.status(400)).json(err)
  })
  
});
router.route(`/:id`).delete((req,res)=>{
  Employee.findByIdAndDelete(req.params.id)
  .then(()=>res.json('Employee deleted'))
  .catch(err => res.status(400).json(err))
});

module.exports = router;
