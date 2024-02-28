const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const { Vonage } = require("@vonage/server-sdk");
const smsRouter = require("./routes/smsRouter");
const userRouter = require("./routes/userRouter");
const conversationRouter = require("./routes/conversationRouter");

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());
app.use("/sms", smsRouter);
app.use("/user", userRouter);
app.use("/conversation", conversationRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
