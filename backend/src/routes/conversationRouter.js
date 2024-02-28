const express = require("express");
const router = express.Router();
const conversationService = require("../services/conversationService");


router.post("/create-conversation", async (req, res) => {
    try {
        await conversationService.createConversation(req.body);
        res.status(200).json({
            success: true,
            message: "Created data successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

router.get("/get-conversation", async (req, res) => {
    try {
        const conversation = await conversationService.getConversation(req.body);
        res.status(200).json({
            success: true,
            conversation: conversation,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});
router.post("/get-comunication", async (req, res) => {
    try {
        const conversation = await conversationService.getComunication(req.body);
        res.status(200).json({
            success: true,
            conversation: conversation,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

router.post("/join-conversation", async (req, res) => {
    try {
        const conversation = await conversationService.joinConversation(req.body);
        res.status(200).json({
            success: true,
            conversation: conversation,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});



module.exports = router;
