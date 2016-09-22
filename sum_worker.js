/**
 * Created by Dalton on 4/20/2016.
 */
onmessage = function(e){
    console.log("worker received message " + e);
    var sum = e.data.num1 + e.data.num2;
    var reply = {};
    reply.result = sum;

    postMessage(reply);
};