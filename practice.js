/**
 * Created by Dalton on 4/19/2016.
 */
function list(){
    var x = new Promise(function(resolve, reject){
       resolve("X");
    });

    var y = new Promise(function(resolve, reject){
       resolve("Y");
    });
    var z = new Promise(function(resolve, reject){
        resolve(1);
    })

    var array = new Array();
    array.push(x);
    array.push(y);
    array.push(z);

    Promise.all(array).then(function(value){
        value.forEach(function(item){
            document.getElementById("changedStuff").innerHTML += item;
            console.log(item);
        });
    });
}

function iterate(num, toI){
    var promArray = new Array();
    var toReturn = 0;
    var toIterate = toI;

    for (var i = 0; i < num; i++){
        promArray.push(new Promise(function(resolve, reject){
            resolve(toIterate);
        }));
    }

    Promise.all(promArray).then(function(values){
        values.forEach(function(value){
            toReturn += value;
        });
        document.getElementById("iterationResult").innerHTML = toReturn;
        console.log(toReturn);
    });
}

function main()
{
    if(window.Worker){
        document.getElementById("sumButton").onclick = sendWorker;
    }
    else
    {
        console.log("WebWorker not supported");
    }
};

function sendWorker(){
    var myWorker = new Worker("sum_worker.js");
    var first = document.getElementById("firstNumber").value;
    var second = document.getElementById("secondNumber").value;

    //create an object with two attributes, num1 and num2
    var message = {};
    message.num1 = parseInt(first);
    message.num2 = parseInt(second);

    console.log("posting message to worker");
    myWorker.postMessage(message);

    myWorker.onmessage=function(e){
        console.log("received message " + e.data.result);
        document.getElementById('demo').innerHTML = e.data.result;
    };
};