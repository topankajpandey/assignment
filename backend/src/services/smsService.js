const { Vonage } = require("@vonage/server-sdk");
const moment = require('moment');
const { crendential } = require('./../constants');
const pool  = require("../db/dbConfig");

const { apiKey, apiSecret} = crendential;
const vonage = new Vonage({
    apiKey: apiKey,
    apiSecret: apiSecret,
});

const VonageSMS = async (from, to, text ) => {
    try {
        const response = await vonage.sms.send({ from, to, text });  
        console.log("Message sent successfully:", response);
        return response;
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
};

const sendSMS = async (payload) => {
    try {
        const { sender, receiver, conversationId, message } = payload;
        await VonageSMS(sender, receiver, message); 
        const created = moment().format('YYYY-MM-DD HH:mm:ss');
        const insertData = { userid: sender, conversationId:conversationId, toUser:receiver, textData: message, created: created }
        const [results] = await pool.query('INSERT INTO comunication SET ?', insertData);
        return results;
      } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
      }
};

module.exports = {
    sendSMS,
};
