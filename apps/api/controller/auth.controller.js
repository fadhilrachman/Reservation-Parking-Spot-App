const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PostLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const checkCredenttial = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkCredenttial)
      return res.status(401).json({ message: "Login Failed" });

    const checkPassword = await bcrypt.compare(
      password,
      checkCredenttial.password
    );

    if (!checkPassword)
      return res.status(403).json({ message: "Login Failed" });

    const token = await jwt.sign(checkCredenttial, process.env.JWT_KEY, {
      expiresIn: "28d",
    });
    return res.status(200).json({
      result: {
        token,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const PostRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkDuplicateEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (checkDuplicateEmail)
      return res.status(400).json({ message: "Email Already Registered" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
      data: {
        password: hashedPassword,
        name,
        email,
        is_officer: false,
      },
    });
    return res.status(201).json({ message: "Success Register" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  PostLogin,
  PostRegister,
};
