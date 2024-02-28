const express = require("express");
const router = express.Router();
const userService = require("../services/userService");


router.post("/create-user", async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.status(200).json({
            success: true,
            message: "SMS sent successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

router.get("/get-user", async (req, res) => {
    try {
        const users = await userService.getUser(req.body);
        res.status(200).json({
            success: true,
            listUser: users,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});


module.exports = router;
