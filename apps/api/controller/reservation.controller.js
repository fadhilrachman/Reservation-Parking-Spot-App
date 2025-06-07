const { PrismaClient } = require("@prisma/client");
const { createPagination } = require("../lib/helper");
const prisma = new PrismaClient();

const PostConfirmReservationOfficer = async (req, res, next) => {
    const {transaction_id,status}=req.body

  try {
    const result = await
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};
