const bcrypt = require('bcryptjs');
const helpers = {};

helpers.ecryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) =>{
    try{
        const prueba = await bcrypt.compare(password, savedPassword);
        return prueba;
    }catch(e){
        console.log(e);
    }
    
};

module.exports = helpers;