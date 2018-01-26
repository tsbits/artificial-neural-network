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
var trainingDataSet;



///////////////
// FUNCTIONS //
///////////////

// Func • That function generate a random set of € / $ pair
// Args length:uint (The number of pair to generate)
// Args coefEuroDollars:Number (The multiplyer that gives $ from €)
function generateDataSetEuroDollars( length, coefEuroDollars ){
	var generatedDataSet = [];

	for( var i = 0; i < length; i++ ){
		var euro = Math.random() * 100;
		generatedDataSet.push( [ euro, euro * coefEuroDollars ] );
	}

	return generatedDataSet;
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
trainingDataSet = generateDataSetEuroDollars(100, c);
console.log('Training data set generation : over');
console.log('- - - - - - - - - - - - - -');
console.log('Datas length :');
console.log( trainingDataSet.length );
console.log('- - - - - - - - - - - - - -');
console.log('Starting the training');
console.log('- - - - - - - - - - - - - -');
var t = train(10000);
console.log('- - - - - - - - - - - - - -');
console.log('BestC -> ' + t + ' • Randomely selected convertion rate to generate the set : ' + c);







