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
var Colors = require('colors')
var Promise = require('promise');

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

sequelize.drop().then(function() {
    sequelize.sync()
    .then(function () {
        return Promise.all([
            Company.create({name: 'HTC'}),
            Company.create({name: 'F. Lancer'}),
            Company.create({name: 'Nokia'})])
    })
    .then(function () {
        return Promise.all([
            Company.findById(2),
            Company.findById(3)
        ])
    })
    .then(function (obj1, obj2) {
        return Promise.all([
            obj1.updateAttributes({name: 'F. Lancer 2'}),
            obj2.destroy()
            ])
    })

})

