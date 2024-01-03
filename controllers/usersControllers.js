const User = require("../db/models/userModel");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userFind = await User.findOne({ email });
  if (userFind) {
    res.status(409).json({ message: "User with this email already exists" });
    return;
  }
  const avatar = gravatar.url(email)

  const newUser = new User({ name, email, password, avatar });

  await newUser.hashPassword();

  await newUser.save();

  const payload = {
    id: newUser._id,
  }

  const token = jwt.sign(payload, SECRET_KEY);

await User.findByIdAndUpdate(newUser._id,  {token});

  res.status(201).json({
    token, user: {name, email, avatar}
  })
};

const signin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) {
        res.status(401).json({message: "Email or password invalid"});
        return;
    }

    const checkPassword = await user.checkPassword(password);
    if (!checkPassword) {
        res.status(401).json({message: "Email or password invalid"});
        return;
    }

    const payload = {
        id: user._id,
      }
    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token, user: {name: user.name, email, avatar: user.avatar}
      })
}

module.exports = {
    signup,
    signin,
}