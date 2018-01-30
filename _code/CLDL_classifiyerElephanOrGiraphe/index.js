///////////////
// VARIABLES //
///////////////

// Get and order node process arg
const argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

// A -> An average value that defines separations between Giraph and Elephant
var A = 0.25; // Parameter of the classifyer 
var lrate = 0.3; // Value used to temperate the correction we apply after having found the error
var trainingDataSet = [
	{
		"weight": 3,
		"neck": 1,
		"type": 0 // 0 -> Elephant • 1 -> Giraph
	},
	{
		"weight": 1,
		"neck": 3,
		"type": 1
	}
];



///////////////
// FUNCTIONS //
///////////////

//Generate a training data set wit h slightly weight / neck variations
function generateTrainingDataSet( dataSetLength ){
	var generatedTrainingDataSet = [];

	// Create random animals and add them to our generatedDataSet
	for( var i = 0; i < dataSetLength; i++ ){
		var animal;

		if( Math.random() <= 0.5 ){
			// Create an elephant
			animal = {
				"weight": 2 + Math.random(),
				"neck": Math.random(),
				"type": 0
			}
		}
		else{
			// Create an elephant
			animal = {
				"weight": Math.random(),
				"neck": 2 + Math.random(),
				"type": 1
			}
		}

		generatedTrainingDataSet.push( animal );
	}

	return generatedTrainingDataSet;
}

// Iterate through the trainingDataSet "trials" time, trying to find the best C to get $ from €
function train( trials ){
 	// Giving a random value to A to start the training
	var trainingA = 0.25;
	var trainingDA; // The proportion of A to take care when updating A
	var trainingLearningRate = 0.3;

	for( var i = 0; i < trials; i++ ){
		for( var j = 0; j < trainingDataSet.length; j++ ){
			var cAnimal = trainingDataSet[j];
			// x weight • y neck length
			var y = trainingA * cAnimal.weight // y = Ax
			var z = cAnimal.neck; // The good y
			var e = z - y;// e = z - y 

			trainingDA = trainingLearningRate * e / cAnimal.weight;
			trainingA += trainingDA; 

			
			if( !argv.quiet ){
				console.log('Iteration #' + i + ' on item #' + j + ' : type -> ' + trainingDataSet[j]['type'] + ' • weight -> ' + trainingDataSet[j]['weight'] + ' • neck : ' + trainingDataSet[j]['neck'] + ' • Error -> ' + e + ' • Current trainingA -> ' + trainingA);
			}
		}


	}

	return trainingA;
}

function predict(){

}



/////////////
// PROGRAM //
/////////////

console.log('Elephant or Giraph linear classifyer : started');
console.log('- - - - - - - - - - - - - -');
console.log('Training data set generation : started');
console.log('- - - - - - - - - - - - - -');
// trainingDataSet = generateDataSetEuroDollars(1, 1.24136);
trainingDataSet = generateTrainingDataSet(100);
console.log('Training data set generation : over');
console.log('- - - - - - - - - - - - - -');
console.log('Datas :');
console.log( JSON.stringify(trainingDataSet) );
console.log( trainingDataSet.length );
console.log('- - - - - - - - - - - - - -');
console.log('Starting the training');
console.log('- - - - - - - - - - - - - -');
var t = train(10000);
console.log('- - - - - - - - - - - - - -');
console.log('BestA -> ' + t);







