'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
// app.use(bodyParser.json());
//
// app.use(function (req, res) {
//     if (req.body) {
//         var requestBody = req.body;
//         console.log(requestBody.result.resolvedQuery)
//     }
//
// });

app.post('/actualite', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {

            var requestBody = req.body;
            console.log(requestBody.result)
            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    console.log(requestBody.result.fulfillment)
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'elidje-aka-emmanuel'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

app.listen((process.env.PORT || 3000), function () {
    console.log("Server listening on port 3000");
});
