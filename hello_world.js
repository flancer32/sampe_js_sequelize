//
// Connect to test3nfJS DB
// Create 3 tables
// Set relations
// Insert 3 rows
// get 2nd row
// Update 2nd row
// Delete 3rd row

// Define dependencies
var Sequelize = require('sequelize');
var colors = require('colors');

// Creating conection instance (one per app)
var sequelize = new Sequelize('test3nfJS', 'victor', '3Jcftix7VycNkEYKxIDW', {
host: 'localhost',
dialect: 'mysql',
	// If true then are created 2 extra fields per table - CreatedDate and UpdatedDate
define: {
timestamps: false,
	}});


// Models are defined with sequelize.define('name', {attributes}, {options}).
var Employee = sequelize.define('employee', {
position: Sequelize.STRING,
salary: Sequelize.STRING
});
var Person = sequelize.define('person', {
	name_first: Sequelize.STRING,
	name_last: Sequelize.STRING  
});
var Company = sequelize.define('company', {
name: Sequelize.STRING
});
Employee.belongsTo(Person);
Employee.belongsTo(Company);

// Create tables on sequelize.sync()
sequelize.sync().then(function () {
	// Create rows
	Company.create(
	{name:'HTC'}
	)}).then(function () {
	Company.create({
name:'FLancer'
	})}).then(function () {
	Company.create({
name:'Nokia'
	})})
	
	
	


function readProp() {

	// Read a property
	Company.findById(2).then(function(object) {
		if (object.get().name=='FLancer')
		{console.log(object.get().name.green + " - Property is correct!".green);
			// Update field
			object.updateAttributes({name:'FLancer2'});
		}
		else {console.log("failed to read a property: ".red + object.get().name.red);}
	})
}

function deleteProp() {
	// Delete a property
	Company.findById(3).then(function(object) {
		object.destroy({});
	}) }
	
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}