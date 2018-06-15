const expect = require('expect');

const {Users} = require('./users.js');

describe('Users Class', () => {

    var users = new Users();
    beforeEach(() => {
        users.users = [{
            id : 1,
            name : 'Ayush',
            room : 'Hulk'
        },{
            id : 2,
            name : 'Hello',
            room : 'Hulk'
        },{
            id : 3,
            name : 'Asshole',
            room : 'Hulk1'
        }];
    });

    it('Should add New User', () => {
        var user = {
            id : "1k1h3h1h1",
            name : "ayush",
            room : "hulk"
        };
        var users = new Users();

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]); 
    });

    it('Should return users for hulk course', () => {
        var userList = users.getUserList('Hulk');
        expect(userList).toEqual(['Ayush', 'Hello']);
    });

    it('Should return users for hulk1 course', () => {
        var userList = users.getUserList('Hulk1');
        expect(userList).toEqual(['Asshole']);
    });

    it('Should remove a user', () => {
        var removedUser = users.removeUser(1);
        expect(users.users.find((data) => {
            return data.id == 1;
        })).toBe(undefined);

        expect(users.users.length).toBe(2);
    });

    it('Should not remove user , invalid user', () => {
        var removedUser = users.removeUser(12312);

        expect(users.users.length).toBe(3);
    });

    it('Should find user with valid name', () => {
        var userIdOne = users.getUser(1);

        expect(users.users.find((data) => {
            return data.id == 1;
        })).toEqual(userIdOne);
    });

    it('Should not get user for invalid user', () => {

    });



});