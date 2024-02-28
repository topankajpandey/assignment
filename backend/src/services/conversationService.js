const { Vonage } = require("@vonage/server-sdk");
const moment = require('moment');
const pool  = require("../db/dbConfig");

const createConversation = async (payload) => {
    try {
        const { title } = payload;
        const insertData = { title: title}
        const [results] = await pool.query('INSERT INTO conversation SET ?', insertData);
        return results;
      } catch (error) {
        console.error('Error inserting conversation:', error);
        throw error;
    }
};

const getUserConversation = async (userId, conversationId) => {
    const queryText = `SELECT * FROM chat WHERE userId = '${userId}' AND conversationId = '${conversationId}'`;
    const [fetchResults] = await pool.query(queryText);
    return fetchResults;
}

const joinConversation = async (payload) => {
    try {
        const { userId,  conversationId } = payload;

        const fetchResults = await getUserConversation(userId,  conversationId);
        if(fetchResults.length){
            return fetchResults;
        }
        else{
            const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const insertData = { userId: userId, conversationId: conversationId, created: currentDate}
            await pool.query('INSERT INTO chat SET ?', insertData);
            return await getUserConversation(userId,  conversationId);
        }
      } catch (error) {
        console.error('Error inserting conversation:', error);
        throw error;
      }
};

const getConversation = async (payload) => {
    try {
        const [results] = await pool.query('select * from conversation');
        return results;
      } catch (error) {
        console.error('Error conversation:', error);
        throw error;
      }
};

const getComunication = async (payload) => {
    const { userId,  conversationId } = payload;
    try {
        const queryText = `SELECT * FROM comunication WHERE userId = '${userId}' AND conversationId = '${conversationId}'`;
        const [fetchResults] = await pool.query(queryText);
        return fetchResults;
      } catch (error) {
        console.error('Error conversation:', error);
        throw error;
    }
};

module.exports = {
    createConversation,
    getConversation,
    joinConversation,
    getComunication
};
