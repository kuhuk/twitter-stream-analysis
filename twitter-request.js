var TwitterRequest = require('TwitterRequest');

var oauth = {
    //Mandatory
    consumer_key: "VSMro0GOcgm2Vb1dYNC7sC4yG",
    consumer_secret: "8D8NO5yeZR6tUpLaQ6FUdh5gYZVpb8MHxzEZSWmN308oqfq9kC",

    //optional
    token: "556724396-2nv3jLh5J05MQi8D7kgXAQzq3nspKsINaoTy2abg",
    token_secret: "LXgwTrUUEoIQvhc8WJN9Zv1CSG8M1OZD44qSinlpt4omH"
};

var treq = new TwitterRequest(oauth);

//
treq.request('statuses/update', {
   //
   query: {
       'status': 'Hello twitter'
   }
}, function(err, res, body) {
    // err => ERROR
    // res => ServerResponse
    // body => Body of the response

    if(err) throw err;

    if(res.statusCode != 200)
        throw new Error('For some reason, Twitter reject the request D:\n\rMore information:\n\r' + JSON.parse(body));

    setTimeout(function() {
        treq.request('statuses/destroy', {
            params: {
                id: JSON.parse(body).id_str
            }
        });
    }, 5000);
});

//Support of streaming API
var req = treq.request('statuses/filter', {
    //Add data to the body
    body: {
        'track': 'nodejs'
    }
});

req.on('data', function(data) {
    console.log(data.toString());
});

// You can find and rewrite oauth data here (This object is passed to the request oauth function)
console.log(treq.oauth);
treq.oauth.consumer_key = "NEW_CONSUMER_KEY";