var whiz = require('./whiz.js');

var net = new whiz.NeuralNetwork(2,4,1);

net.train([{input: [0, 0], output: [0]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [0]}]);

console.log(net.test([{input: [0, 0]}]));   // [ 0.007183476458444264 ]
console.log(net.test([{input: [0, 1]}]));   // [ 0.9914288621830375 ]
console.log(net.test([{input: [1, 0]}]));   // [ 0.9914585626363543 ]
console.log(net.test([{input: [1, 1]}]));   // [ 0.011696192632921569 ]
