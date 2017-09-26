var Client = require('node-rest-client').Client;
var express = require('express');
var client = new Client();

var apikey = "0839c0eff6bb44b1a036e14246d87e05";

// set content-type header and data as json in args parameter
var args = {
    data: { number: "50" },
    headers: { "Content-Type": "application/json" }
};
// direct way
/*
client.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/convert?ingredientName=flour&sourceAmount=2.5&sourceUnit=cups&targetUnit=grams", function (data, response) {
        .header("X-Mashape-Key", "chok9883fzmshrstqHzza7HER55Ip1SEeCfjsnOUvkdfa4UDBb")
        .header("Accept", "application/json")    // parsed response body as js object
    console.log(data);

    // raw response
    //console.log(response);

});
*/

// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/convert?ingredientName=flour&sourceAmount=2.5&sourceUnit=cups&targetUnit=grams")
    .header("X-Mashape-Key", "chok9883fzmshrstqHzza7HER55Ip1SEeCfjsnOUvkdfa4UDBb")
    .header("Accept", "application/json")
    .end(function (result) {
        console.log(result.status, result.headers, result.body);
    });

client.delete("https://aip-rest.appspot.com/api/lock/12440816?token=7dff0e04c9ecebd73a4f3176303bbca1944ebb42e19f8dd25340c6c67d2cc932", args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
});
// registering remote methods

client.registerMethod("getToken", "https://aip-rest.appspot.com/api/token/12440816", "GET");
client.registerMethod("getSequence", "http://aip-rest.appspot.com/api/sequence/latest?token=7dff0e04c9ecebd73a4f3176303bbca1944ebb42e19f8dd25340c6c67d2cc932", "GET");

client.methods.getToken(function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
});

client.methods.getSequence(function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
});

