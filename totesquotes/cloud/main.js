require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

Parse.Cloud.define("simple", function(request, response) {
    response.success("Cloud Code Works!");
});