const cred = require('./appEnv')
const vcap = cred.system_env_json.VCAP_SERVICES;
const appenv = cred.application_env_json.VCAP_APPLICATION;
let mockserverurl = appenv.application_uris[0].split(".");
mockserverurl[0] = "sf-srv-mocks";
mockserverurl = mockserverurl.join(".");


module.exports = {
    "token_url": vcap.xsuaa[0].credentials.url,
    "em_queue_url": vcap["enterprise-messaging"][0].credentials.messaging[2].uri + '/messagingrest/v1/topics/referenceappscf%2Femsf%2F1909%2Fsfemessage',
    "service_domain": 'https://' + appenv.application_uris[0],
    "mock_service_domain": 'https://' + mockserverurl,
    "xsuaa": {
        "grant_type": "password",
        "client_id": vcap.xsuaa[0].credentials.clientid,
        "client_secret": vcap.xsuaa[0].credentials.clientsecret,
        "username": cred.pusername,
        "password": cred.puserpwd

    },
    "enterprise_messaging": {
        "grant_type": "client_credentials",
        "client_id": vcap["enterprise-messaging"][0].credentials.messaging[2].oa2.clientid,
        "client_secret": vcap["enterprise-messaging"][0].credentials.messaging[2].oa2.clientsecret
    },
}