const expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should return valid object', () => {
        var from = "ayush";
        var text = "hello!!";
        var message = generateMessage(from, text);
        
        expect(typeof message).toBe('object');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeTruthy();
    });
});