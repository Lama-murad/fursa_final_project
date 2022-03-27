const express = require('express');
const router = express.Router();
import jwt from "jwt-simple";
import Users from '../model/userModel'
import { isUser } from '../controllers/userController'
const bcrypt = require("bcrypt");

router.post("/get-user", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) throw ' invalid fields'
        const _user = await Users.findOne({ email: email }, 'name password email phone location gender type');
        if (_user) {
            const validPassword = await bcrypt.compare(password, _user.password);
            if (validPassword) {
                const JWT_SECRET = process.env.JWT_SECRET;
                const encodedJWT = jwt.encode(
                    { userId: _user._id, role: _user.type },
                    JWT_SECRET
                );
                if (_user.type == "admin" || _user.type == "org") {
                    res.cookie('user', encodedJWT, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    })
                } else {
                    res.cookie('user', encodedJWT, {
                        httpOnly: true,
                    })
                }
                res.send({ ok: true, user: _user })
            }
            else {
                res.send({ ok: false, message: "wrong email or password!" });
            }
        }
        else {
            res.send({ ok: false })
        }
    } catch (error) {
        res.send({ error: error.message });
    }
})

router.post('/sign-up', async (req, res) => {
    try {
        const { name, email, phone, location, password, gender } = req.body;
        if (!name || !gender || !email || !phone || !location || !password) throw "invalid fields"
        const result = await Users.find({ email: email });
        if (result.length > 0)
            res.send({ "log": false })
        else {
            // crypt pass
            const user = new Users({ "name": name, "email": email, "gender": gender, "phone": phone, "location": location, "password": password, "type": "public" })
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            user.password = await bcrypt.hash(user.password, salt)
            await user.save()
            const JWT_SECRET = process.env.JWT_SECRET;
            const encodedJWT = jwt.encode(
                { userId: user._id, role: user.type },
                JWT_SECRET
            );
            if (user.type == "admin" || user.type == "org") {
                res.cookie('user', encodedJWT, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                })
            } else {
                res.cookie('user', encodedJWT, {
                    httpOnly: true,
                })
            }
            res.send({ "log": true, "user": { "name": user.name, "email": user.email, "gender": user.gender, "phone": user.phone, "location": user.location, "type": user.type } })
        }
    } catch (error) {
        res.send({ error });
    }

})

router.get('/get-authentication', async (req, res) => {
    try {
        const { user } = req.cookies;
        if (user) {
            const JWT_SECRET = process.env.JWT_SECRET;
            const decodedJWT = jwt.decode(user, JWT_SECRET);
            const { userId } = decodedJWT;
            if (userId) {
                const result = await Users.find({ "_id": userId }, '_id name email phone location gender type');
                if (result.length > 0) {
                    res.send({ "log": true, "user": result[0] })
                } else res.send({ "log": false })
            }
            else res.send({ "log": false })
        }
        else {
            const JWT_SECRET = process.env.JWT_SECRET;
            //add to db
            const newUser = new Users({ "type": "anonymous", "email": Date.now().toString() })
            const result = await newUser.save()
            const encodedJWT = jwt.encode(
                { userId: result._id, role: "anonymous" },
                JWT_SECRET
            );
            res.cookie('user', encodedJWT, {
                httpOnly: true,
            })
            res.send({ "log": true, "user": result })
        }
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message });
    }
})

router.get('/log-out', isUser, async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const newUser = new Users({ "type": "anonymous", "email": Date.now().toString() })
    const result = await newUser.save()
    const encodedJWT = jwt.encode(
        { userId: result._id, role: "anonymous" },
        JWT_SECRET
    );
    res.cookie('user', encodedJWT, {
        httpOnly: true,
    })
    res.send({ "log": true, "user": result })
})

module.exports = router;