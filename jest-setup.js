import regeneratorRuntime from 'regenerator-runtime'; //alow us to use aync await

module.exports = () => {
    global.testServer = require('./server');
};