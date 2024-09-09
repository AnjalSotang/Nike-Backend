const payment = (req, res) => {
    // console.log(payload);
    var KHALTI_VERIFY = "https://khalti.com/api/v2/payment/verify/";
    // var secret_key = process.env.KHALTI_SECRET_KEY;
    var SECRET_KEY = "test_secret_key_0e92d34825544efa8073e9ba124528c5";

    let options = {
        method: 'POST',
        uri: KHALTI_VERIFY,
        body: JSON.stringify({
            'token': req.body.token,
            'amount': req.body.amount
        }),
        headers: {
            "Authorization": `Key ${SECRET_KEY}`,
            "Content-Type": 'application/json'
        }
    }
    requestp(options)
        .then((result) => {
            console.log('charged', result);
            res.jsonp({
                data: result,
                status: "success"
            });
        })
        .catch((error) => {
            res.status(500).send({
                error: error.response.data,
                status: 'failed',
            });
        })
};

module.exports = {
    payment
}