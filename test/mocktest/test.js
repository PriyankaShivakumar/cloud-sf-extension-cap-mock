const chai = require('chai');
const chaiHttp = require('chai-http');
//const server = require('./server');
const config = require('./config');
let xsuaa_access_token;
let arr;
let businessspartner;
let riskid;
let bp;
let autoRiskID;
// Configure chai
chai.use(chaiHttp);
chai.should();




describe("get access token for xsuaa", () => {
    describe("Should Get access token for xsuaa", () => {
        it(" should fetch access token", (done) => {

            var req_headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
            chai.request(config.token_url)
                .post('/oauth/token').set(req_headers).send(config.xsuaa)
                .end((error, response) => {
                    try {
                        response.should.have.status(200);
                        xsuaa_access_token = response.body.access_token;
                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });
});