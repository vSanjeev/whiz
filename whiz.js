var NeuralNetwork = function (inputNodes, hiddenNodes, outputNodes, options){

  this.inputNodes = inputNodes;
  this.hiddenNodes = hiddenNodes;
  this.outputNodes = outputNodes;
  this.inputLayer = [];
  this.hiddenLayer = [];
  this.outputLayer = [];
  options = options || {};
  this.learningRate = options.learningRate || 0.3;

  Node = function(type){
    if(type=='input'){
		this.input = 0;
		this.output = 0;
    }

    else if(type=='hidden'){
		this.input = 0;
		this.output = 0;
		this.bias = 0.5;
		this.weight = [];
		for(j=0; j<inputNodes; j++){
		  this.weight[j] = 0.5;
		}
    }

    else if(type=='output'){
		this.input = 0;
		this.output = 0;
      this.bias = 0.5;
      this.weight = [];
      for(j=0; j<hiddenNodes; j++){
        this.weight[j] = 0.5;
      }
    }	
  }
  this.init();
}

NeuralNetwork.prototype = {
init: function() {
	for(i=0;i<this.inputNodes;i++){
      this.inputLayer.push((new Node('input')));
    }


    for(i=0;i<this.hiddenNodes;i++){
      this.hiddenLayer.push((new Node('hidden')));
    }

    for(i=0;i<this.outputNodes;i++){
      this.outputLayer.push((new Node('output')));
    }
},

train : function(data){

    for(var i=0; i<data.length; i++){

      if(this.inputNodes!=data[i].input.length || this.outputNodes!=data[i].output.length){
        console.log("Error: mismatch in number of neurons, inputs & outputs")
        return;
      }
      else{
        for(j=0; j<this.inputNodes; j++){
          this.inputLayer[j].input = this.inputLayer[j].output = data[i].input[j];
        }

        results = [];
        results.hidden = [];
        for(j=0; j<this.hiddenNodes; j++){
          this.hiddenLayer[j].input = this.hiddenLayer[j].bias;
          for(k=0; k<this.inputNodes; k++){
            this.hiddenLayer[j].input +=  this.inputLayer[k].output * this.hiddenLayer[j].weight[k];
          }
          this.hiddenLayer[j].output = 1 / (1 + Math.exp(-this.hiddenLayer[j].input));
          results.hidden.push(this.hiddenLayer[j].output);
        }

        results.output = [];
        for(j=0; j<this.outputNodes; j++){
          this.outputLayer[j].input = this.outputLayer[j].bias;
          for(k=0; k<this.hiddenNodes; k++){
            this.outputLayer[j].input +=  this.hiddenLayer[k].output * this.outputLayer[j].weight[k];
          }
          this.outputLayer[j].output = 1 / (1 + Math.exp(-this.outputLayer[j].input));
          results.output.push(this.outputLayer[j].output);
        }

        this.deltaChange(i,data,results);

      }
    }
    return results.output;
  },
  
deltaChange : function(nodeNumber, expected, obtained){
	for(j=0; j<this.outputNodes; j++){
      this.outputLayer[j].error = obtained.output[j] * (1 - obtained.output[j]) * (expected[nodeNumber].output[j] - obtained.output[j]);
    }

    for(j=0; j<this.hiddenNodes; j++){
      summation = 0;
      for(k=0; k<this.outputNodes; k++){
        summation += this.outputLayer[k].error * this.outputLayer[k].weight[j];
      }
      this.hiddenLayer[j].error = obtained.hidden[j] * (1 - obtained.hidden[j]) * summation;
    }

    for(i=0; i<this.inputNodes; i++){
      for(j=0; j<this.hiddenNodes; j++){
        this.hiddenLayer[j].weight[i] += this.learningRate * this.hiddenLayer[j].error * this.inputLayer[i].output;
      }
    }

    for(i=0; i<this.hiddenNodes; i++){
      for(j=0; j<this.outputNodes; j++){
        this.outputLayer[j].weight[i] += this.learningRate * this.outputLayer[j].error * this.hiddenLayer[i].output;
      }
    }


      for(j=0; j<this.hiddenNodes; j++){
        this.hiddenLayer[j].bias += this.learningRate * this.hiddenLayer[j].error;
      }

      for(j=0; j<this.outputNodes; j++){
        this.outputLayer[j].bias += this.learningRate * this.outputLayer[j].error;
      }
  },
  
test : function(data){
	
    for(var i=0; i<data.length; i++){

      if(this.inputNodes!=data[i].input.length){
        console.log("Error: mismatch in number of neurons & inputs")
        return;
      }
      else{
        for(j=0; j<this.inputNodes; j++){
          this.inputLayer[j].input = this.inputLayer[j].output = data[i].input[j];
        }

        results = [];
        results.hidden = [];
        for(j=0; j<this.hiddenNodes; j++){
          this.hiddenLayer[j].input = this.hiddenLayer[j].bias;
          for(k=0; k<this.inputNodes; k++){
            this.hiddenLayer[j].input +=  this.inputLayer[k].output * this.hiddenLayer[j].weight[k];
          }
          this.hiddenLayer[j].output = 1 / (1 + Math.exp(-this.hiddenLayer[j].input));
          results.hidden.push(this.hiddenLayer[j].output);
        }

        results.output = [];
        for(j=0; j<this.outputNodes; j++){
          this.outputLayer[j].input = this.outputLayer[j].bias;
          for(k=0; k<this.hiddenNodes; k++){
            this.outputLayer[j].input +=  this.hiddenLayer[k].output * this.outputLayer[j].weight[k];
          }
          this.outputLayer[j].output = 1 / (1 + Math.exp(-this.outputLayer[j].input));
          results.output.push(this.outputLayer[j].output);
        }
      }
    }
    return results.output;
},

  setLearningRate : function(learningRate){
    this.learningRate = learningRate;
  },

  getLearningRate : function (){
    return this.learningRate;
  },

}

// export
module.exports.NeuralNetwork = NeuralNetwork;
