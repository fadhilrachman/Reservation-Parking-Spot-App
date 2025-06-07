const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PostFloorOfficer = async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await prisma.floor.create({ data: { name } });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};
module.exports = { PostFloorOfficer };
