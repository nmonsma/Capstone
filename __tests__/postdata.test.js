//import the jsfile to test
import { postData } from '../src/client/js/postData';

global.fetch = require('node-fetch');

describe("Testing postData functionality", () => {
    test("Testing an existing route", () => {
        expect(postData('http://localhost:3000/add', {'member': 'value'})).resolves.not.toThrow();
    })    
    test("Testing a nonexistent route", () => {
        expect(postData('http://localhost:3000/nonexistenttest', {'member': 'value'})).resolves.toThrow();
    })
})