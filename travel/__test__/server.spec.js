const req = require('supertest')
const server = require('../../travel/src/Server/server')

describe("test the root path" , () => {
    test ('It should respone the GET method' , () => {
        return req(server)
        .get('/')
        .expect(200)
    });
});