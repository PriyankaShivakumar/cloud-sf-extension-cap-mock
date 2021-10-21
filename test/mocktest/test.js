const chai = require('chai');
const chaiHttp = require('chai-http');
const { em_queue_url } = require('./config');
//const server = require('./server');
const config = require('./config');
let xsuaa_access_token;
//let em_access_token;
let user;
let userpic;
let skill;

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
/*
describe("get em access token", () => {
    describe("Should Get access token for em", () => {
        it(" should fetch access token", (done) => {

            var req_headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
            chai.request(config.token_url)
                .post('/oauth/token').set(req_headers).send(config.enterprise_messaging)
                .end((error, response) => {
                    try {
                        response.should.have.status(200);
                        em_access_token = response.body.access_token;
                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });
});
*/
describe('Read Projects', () => {
    describe('Should get all  Projects', () => {
        it('+ should return a list of projects', (done) => {
            chai.request(config.service_domain)
                .get('/admin/Project').set('Authorization', 'bearer ' + xsuaa_access_token)
                .end((error, response) => {
                    try {
                        console.log(response.body);
                        response.should.have.status(200);
                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });
});

describe("Read Users", () => {

    it('Read the User', (done) => {

        let url = '/sfservice-mocks/Users';
        chai.request(config.mock_service_domain)
            .get(url).send('Content-Type', 'application/x-www-form-urlencoded')
            .end((error, response) => {
                try {
                    response.should.have.status(200);
                    user = response.body.value[0];
                    console.log(user);
                    setTimeout(() => {
                        done();
                    }, 1000);
                } catch (err) {
                    done(err);
                }
            });

    })

});

describe("Read UserPhoto", () => {

    it('Read the User Photo', (done) => {

        let url = '/sfservice-mocks/Userphoto';
        chai.request(config.mock_service_domain)
            .get(url).send('Content-Type', 'application/x-www-form-urlencoded')
            .end((error, response) => {
                try {
                    response.should.have.status(200);
                    userpic = response.body.value[0];
                    console.log(userpic);
                    setTimeout(() => {
                        done();
                    }, 1000);
                } catch (err) {
                    done(err);
                }
            });

    })

});

describe("Read Skills", () => {

    it('Read the Skill', (done) => {

        let url = '/sfservice-mocks/Skill';
        chai.request(config.mock_service_domain)
            .get(url).send('Content-Type', 'application/x-www-form-urlencoded')
            .end((error, response) => {
                try {
                    response.should.have.status(200);
                    skill = response.body.value[0];
                    console.log(skill);
                    setTimeout(() => {
                        done();
                    }, 1000);
                } catch (err) {
                    done(err);
                }
            });

    })

});

describe("Create Notification", () => {
    it(" Create Notification", (done) => {
        let notification = {
            "message": "Resigned",
            "employeeId": user.userId,
            "managerId": config.xsuaa.username,
            "skills": skill.skills_SkillProfile_externalCode
        }

        chai.request(config.mock_service_domain)
            .post('/sfservice-mocks/Notifications').send(notification)
            .end((error, response) => {
                try {
                    response.should.have.status(201);
                    console.log(response.body);
                    done();
                } catch (err) {
                    done(err);

                }
            });
    })
});

describe('Read Notifications', () => {
    describe('Should get all  Notifications', () => {
        it('+ should return a list of Notifications', (done) => {
            let url = '/sfservice-mocks/Notifications?$filter=employeeId eq \'106020\'';
            chai.request(config.mock_service_domain)
                .get(url)
                .end((error, response) => {
                    try {
                        console.log(response.body);
                        response.should.have.status(200);
                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });
});


// describe("Create Notification", () => {
//     it(" Create Notification", (done) => {
//         let notification = {
//             "message": "Resigned",
//             "employeeId": "106020",
//             "managerId": config.xsuaa.username,
//             "skills": skill.skills_SkillProfile_externalCode
//         }
//         var req_headers = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + em_access_token,
//             'x-qos': '1'
//         }
//         chai.request(config.em_queue_url)
//             .post('/messages').set(req_headers).send(notification)
//             .end((error, response) => {
//                 try {
//                     response.should.have.status(204);
//                     done();
//                 } catch (err) {
//                     done(err);

//                 }
//             });
//     })
// });

// describe('Read Notifications', () => {
//     describe('Should get all  Notifications', () => {
//         it('+ should return a list of Notifications', (done) => {
//             let url = '/admin/Notifications?$filter=employeeId eq \'106020\'';
//             chai.request(config.service_domain)
//                 .get(url).set('Authorization', 'bearer ' + xsuaa_access_token)
//                 .end((error, response) => {
//                     try {
//                         console.log(response);
//                         //response.should.have.status(200);
//                         done();
//                     } catch (err) {
//                         console.log(err);
//                         done(err);
//                     }
//                 });
//         });
//     });
// });
