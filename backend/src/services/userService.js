const { Vonage } = require("@vonage/server-sdk");
const pool  = require("../db/dbConfig");

const createUser = async (payload) => {
    try {
        const { username, mobile } = payload;
        const insertData = { username: username, mobile:mobile}
        const [results] = await pool.query('INSERT INTO users SET ?', insertData);
        return results;
      } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
      }
};

const getUser = async (payload) => {
    try {
        const [results] = await pool.query('select * from users');
        return results;
      } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
      }
};

module.exports = {
    createUser,
    getUser
};
