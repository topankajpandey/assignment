const express = require("express");
const router = express.Router();
const smsService = require("../services/smsService");


router.post("/send-sms", async (req, res) => {
    try {
        await smsService.sendSMS(req.body);
        res.status(200).json({
            success: true,
            message: "SMS sent successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});


module.exports = router;
