//import the jsfile to test
import { postData } from '../src/client/js/postData';

global.fetch = require('node-fetch');

describe("Testing API routes", () => {
    test("Testing /location", () => {
        expect(postData('http://localhost:3000/location', {'location': 'Test, AA'})).resolves.toBe({'msg': 'success'});
    })    
    test("Testing /forecast", () => {
        expect(postData('http://localhost:3000/forecast', {'lat': '360'})).resolves.toBe({'msg': 'success'});
    })    
    test("Testing /aqi", () => {
        expect(postData('http://localhost:3000/aqi', {'lat': '360'})).resolves.toBe({'msg': 'success'});
    })    
    test("Testing /advisory", () => {
        expect(postData('http://localhost:3000/advisory', {'country__code': '@@'})).resolves.toBe({'msg': 'success'});
    })    
    test("Testing /image", () => {
        expect(postData('http://localhost:3000/image', {'location': 'Test, AA'})).resolves.toBe({'msg': 'success'});
    })    
})