const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    bcrypt = require('bcryptjs');

chai.use(chaiAsPromised).should();

const User = require('../models/users-model');

describe('Users model tests', () => {
    it('should be a valid user object', async () => {
        const userInstance = new User(null, null, null, 'matt@bmx.com', null, null);
        const theUser = await userInstance.getUserByEmail();
        console.log('the user is', theUser);
        expect(theUser).to.be.an('object');
    });

    it('should NOT be undefined', async () => {
        const userInstance = new User(null, null, null, 'matt@bmx.com', null, null);
        const theUser = await userInstance.getUserByEmail();
        console.log('the user is', theUser);
        expect(theUser.id).to.not.be.an('undefined');    
    });

    it('should make sure incorrect passwords are incorrect', async () => {
        const users_password = 'wrongpassword';
        const users_email = 'matt@bmx.com';
        const userInstance = new User(null, null, null, users_email, users_password, null, null);
        const userData = await userInstance.getUserByEmail();
        console.log(userData);
        const isValid = bcrypt.compareSync(users_password, userData.users_password);
        console.log(isValid);
        expect(isValid).to.be.false;
    });

    it('should make sure correct passwords are correct', async () => {
        const users_password = 'password';
        const users_email = 'matt@bmx.com';
        const userInstance = new User(null, null, null, users_email, users_password, null);
        const userData = await userInstance.getUserByEmail();
        console.log(userData);
        const isValid = bcrypt.compareSync(users_password, userData.users_password);
        console.log(isValid);
        expect(isValid).to.be.true;
    });

})



    