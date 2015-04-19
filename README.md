# whiz
[Artificial Neural Networks](http://en.wikipedia.org/wiki/Artificial_neural_network) are used to predict results based on patterns. One such library is `whiz`.

## Usage
This library can only be used as node package.
`npm install whiz`

You could choose to use this package with either [node.js](https://nodejs.org/) or [io.js](https://iojs.org).

### Creating an Object
You should create an object with required arguments to use the Neural Network.

```javascript
var whiz = require('whiz');

var net = new whiz.NeuralNetwork(2,3,1);
```

The function takes 3 arguments, number of `inputNodes, hiddenNodes & outputNodes`.

### Training the Neural Network
To train the neural network, use the following code snippet.

```javascript
net.train([{input: [0, 0], output: [0]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [0]}]);
```

Here, the neural network is trained with XOR inputs.
Note that the number of input nodes & output nodes given during training should match with numbers given during the [creation of the object](#Creating-an-object).
This method returns the output predicted at the end of training, which can be logged using `console.log();`.

### Testing the Neural Network
After training the neural network sufficiently, we can classify the unclassified inputs by,

```javascript
net.test([{input: [0, 1]}]);
```

This method also returns the output predicted, which can be logged using `console.log();`.

```javascript
console.log(net.test([{input: [0, 1]}]));
```

## Optional Methods
### Set Learning Rate
This method is used to set the learning rate of the neural network. It can be accessed by,

```javascript
net.setLearningRate(0.5);
```

### Get Learning Rate
This method is used to get the learning rate of the neural network. It can be accessed by,

```javascript
net.getLearningRate();
```

This method return the learningRate, which can also be logged using `console.log();`.
