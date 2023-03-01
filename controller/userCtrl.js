const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel.js");
const dotenv = require("dotenv");
dotenv.config();


const authCtrl = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ msg: "Please enter all credentials required" });
      }

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const isEmailExist = await UserModel.findOne({ email });

      if (isEmailExist) {
        return res.status(401).json({
          msg: "Email already exist please try with different email number",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const saveData = await UserModel.create({ email, password: passwordHash });

      res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { phone, code, password } = req.body
      const passwordHash = await bcrypt.hash(password, 12);
      client.verify
        .services(serviceId)
        .verificationChecks.create({ to: phone, code: code })
        .then(async (verification_check) => {
          await User.findOneAndUpdate(
            { phone: phone },
            {
              password: passwordHash
            }
          )
          return res.status(200).json({ msg: 'Password Changed Successfully' });
        })
        .catch((error) => {
          return res.status(400).json({ error });
        });

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email) {
        if (!password) {
          return res
            .status(400)
            .json({ msg: "Please enter all credentials required" });
        }
        const userData = await UserModel.findOne({ email });
        if (!userData) {
          return res.status(400).json({ msg: "Credentials invalid" });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        const access_token = createAccessToken({ id: userData._id });

        res.status(200).json({
          message: "user logged in",
          access_token,
          user: userData,
        });
      } else {
        if (!password) {
          return res
            .status(400)
            .json({ msg: "Please enter all credentials required" });
        }
        const userData = await UserModel.findOne({ email });
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        const access_token = createAccessToken({ id: userData._id });
        const refresh_token = createRefreshToken({ id: userData._id });

        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/api/refresh_token",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        });

        res.json({
          msg: "Login Success!",
          access_token,
          user: userData
        });

      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
