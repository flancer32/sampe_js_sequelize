/**
 Connect to Sample DB
 Create 3 tables
 Set relations
 Insert 3 rows
 get 2nd row
 Update 2nd row
 Delete 3rd row
*/

/* Define dependencies */
var Sequelize = require('sequelize')
var colors = require('colors')

/* Creating conection instance (one per app) */
var sequelize = new Sequelize('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW', {
    host: 'localhost', dialect: 'mysql', define: {
        timestamps: false /* If true then are created 2 extra fields per table - CreatedDate and UpdatedDate */
    }
})

// Models are defined with sequelize.define('name', {attributes}, {options}).
var Employee = sequelize.define('employee', {
    position: Sequelize.STRING, salary: Sequelize.STRING
})
var Person = sequelize.define('person', {
    name_first: Sequelize.STRING, name_last: Sequelize.STRING
})
var Company = sequelize.define('company', {
    name: Sequelize.STRING
})

Employee.belongsTo(Person)
Employee.belongsTo(Company)

Employee.drop()
Person.drop()
Company.drop()

// Create tables on sequelize.sync()
sequelize.sync()
    .then(function() {return Company.create({name: 'HTC'})})
    .then(function() {return Company.create({name: 'F. Lancer'})})
    .then(function() {return Company.create({name: 'Nokia'})})
    .then(function() {return Company.findById(2)})
    .then(function (obj) {return obj.updateAttributes({name: 'F. Lancer 2'}) })
    .then(function() {return Company.findById(3)})
    .then(function(obj) {return obj.destroy()})

