/*
	CODE WRITTEN WHILE WATCHING "Neural Networks: Perceptron Part 1" by The Coding Train (https://www.youtube.com/watch?v=ntKn5TPHHAk)

	- - - - - - -

	PERCEPTRON ALGORITHM :

	• For every inputs, multiply that input by its weight.
	• Sum all of the weighted inputs.
	• Compute the output of the perceptron based on that sum passed throught
		 an activation function (the sin of the sum).
*/


/*
	PERCEPTRON CLASS :
	• This is the thing we wants to be smarter
	• This thing is capable of be trained with a trainingDataSet (a set of datas with parameters + good answers)
	• This thing can "guess" an output based on input after having been trained
*/

var Perceptron = function(){
	// The array of weight to apply to values
	this.weights = [0, 0];
	
	// We start by setting random weight
	for(var i = 0; i < this.weights.length; i++){
		this.weights[i] = (Math.random() * 2) - 1;
	}
}

Perceptron.prototype.guess = function( inputs ){
	var sum = 0;

	for( var i = 0; i < this.weights.length; i++ ){
		sum += inputs[i] * this.weights[i];
	}

	// We use the activation function called "sign", that return -1 or + 1
	var output = this.sign( sum );

	return output;
}

Perceptron.prototype.sign = function( value ){
	if( value >= 0 ){
		return 1;
	}
	else{
		return -1;
	}
}


/*
	POINT CLASS
*/

var Point = function( spaceWidth, spaceHeight ){
	this.x = Math.random() *  spaceWidth;
	this.y = Math.random() *  spaceHeight;
	this.label = (x > y) ? 1 : -1;
}



/*
	RUNNING THE PERCEPTRON
*/

var inputsDatas = [-1, 0.5];
var trainingDatasSet = [
	
];

console.log('- - - - - - - - - - - - - - - - - - -');
console.log('Perceptron Program Started');
console.log('- - - - - - - - - - - - - - - - - - -');

// Creating an instance of our Perceptron class
var p = new Perceptron();
p.generateTrainingSet();
var guess = p.guess( inputsDatas );
console.log(guess);
















