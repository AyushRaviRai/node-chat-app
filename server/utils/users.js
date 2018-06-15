class Users {
    /**
     * [constructor description]
     * @return {[type]} [description]
     */
    constructor () {
        this.users = [];
    }

    /**
     * [addUser description]
     */
    addUser (id, name, room) {
        var newUser = {id, name, room};
        this.users.push(newUser);
        return newUser;
    }

    /**
     * [removeUser description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    removeUser (id) {
        if (this.users && id) {
            var removedUser = null;
            this.users = this.users.filter( function (data) {
                if (data.id != id) {    
                    return true;
                } else {
                    removedUser = data
                    return false;
                }
            });
            return removedUser;
        }
        return null;
    }

    /**
     * [getUser description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    getUser (id) {
        if (this.users && id) {
            return this.users.find(function (data) {
                if (data.id == id) {
                    return data
                }
            });
        }
        return null;
    }

    /**
     * [getUserList description]
     * @return {[type]} [description]
     */
    getUserList (room) {
        if (this.users && room) {
            var users = this.users.filter(function (data) {
                return data.room == room;
            });
            var userNamesInRoom = users.map((user) => {
                return user.name;
            });
            return userNamesInRoom;
        }
        return null;
    }
}

module.exports = {Users};