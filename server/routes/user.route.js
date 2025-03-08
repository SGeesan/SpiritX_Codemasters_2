const Team = require("../models/team.model");
const User = require("../models/user.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); 
const router = express.Router();

dotenv.config();

router.post("/adduser", async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, Number(process.env.PASSWORD_HASH_SALT));
    const newUser = new User({ firstName, lastName, username, email, password: hashedPassword });
    try {
        await newUser.save();
        const newuser = await User
            .findOne({ email: email, username: username })
            .select("_id")
            .exec();
        const newTeam = new Team({ userId: newuser._id, name: `${"My team " + newUser._id}` });
        await newTeam.save();
        res.status(201).send("User added successfully");
    } catch (err) {
        res.status(400).send("Unable to save to database");
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User
        .findOne({ username: username }, {})
        .exec();
    if (user === null) {
        res.status(400).send("User not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
        const token = jwt.sign({ user : {firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username} }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.cookie("SpiritX2", token, { 
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).send("Login successful");
    } else {
        res.status(400).send("Invalid password");
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("SpiritX2");
    res.status(200).send("Logout successful");
});

router.get("/getuser", async (req, res) => {
    const token = req.cookies["SpiritX2"];
    if (!token) {
        res.status(400).send("User not found");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(400).send("User not found");
        } else {
            res.status(200).send(decoded);
        }
    });
});


module.exports = router;