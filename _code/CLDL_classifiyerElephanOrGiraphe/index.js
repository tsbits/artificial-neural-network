///////////////
// VARIABLES //
///////////////

// Get and order node process arg
const argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

// C -> Coef. of multiplication to find to get $ from €
// NB: The good C is 1.24136 (according to Google convert tool the 25/01/18)
var c = Math.random()*5000; 
// A set of validated data to train the "neuron" ?...
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
 	// Giving a random value to C to start the training
	var trainingC = 15;
	var bestErrorRatio = 1000000;
	var ajustStep = 0.1;

	for( var i = 0; i < trials; i++ ){
		for( var j = 0; j < trainingDataSet.length; j++ ){
			var guessedDollars = trainingDataSet[j][0] * trainingC;
			var calculatedError = guessedDollars - trainingDataSet[j][1];
			var errorRatio = guessedDollars / trainingDataSet[j][1];

			if( Math.abs(errorRatio) < bestErrorRatio ){
				bestErrorRatio = Math.abs(errorRatio);
			}
			else{
				if( calculatedError < 0 ){
					trainingC += ajustStep * errorRatio;
				}
				else{
					trainingC -= ajustStep * errorRatio;
				}
			}

			if( !argv.quiet ){
				console.log('Iteration #' + i + ' on item #' + j + ' : € -> ' + trainingDataSet[j][0] + ' • $ -> ' + trainingDataSet[j][1] + ' • Guessed $ -> ' + guessedDollars + ' • Error -> ' + calculatedError + ' • Current trainingC -> ' + trainingC);
			}
		}


	}

	return trainingC;
}

function predict(){

}



/////////////
// PROGRAM //
/////////////

console.log('€ to $ converter : started');
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
/*
console.log('- - - - - - - - - - - - - -');
console.log('Starting the training');
console.log('- - - - - - - - - - - - - -');
var t = train(10000);
console.log('- - - - - - - - - - - - - -');
console.log('BestC -> ' + t + ' • Randomely selected convertion rate to generate the set : ' + c);*/







