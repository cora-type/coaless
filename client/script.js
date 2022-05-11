var request = require("request-promise");

async function arraysum() {
  // This variable contains the data
  // you want to send
  var data = "best shampoo for oily hair";

  var options = {
    method: "POST",

    // http:flaskserverurl:port/route
    uri: "http://127.0.0.1:5000/lookup",
    body: data,

    // Automatically stringifies
    // the body to JSON
    json: true,
  };

  var sendrequest = await request(options)
    // The parsedBody contains the data sent back from the Flask server
    .then(function (parsedBody) {
      // console.log(parsedBody);

      // do something with returned data
      let result;
      result = parsedBody["result"];
      result.sort((a, b) => b.Score - a.Score);
      console.log("Result from Python ", result);
    })
    .catch(function (err) {
      console.log(err);
    });
}

arraysum();
