var whiz = require('./whiz.js');

var net = new whiz.NeuralNetwork(2,3,1);

net.train([{input: [0, 0], output: [0]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [0]}]);

console.log(net.test([{input: [0, 1]}]));