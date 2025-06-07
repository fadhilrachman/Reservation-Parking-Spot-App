const { PrismaClient } = require("@prisma/client");
const { createPagination } = require("../lib/helper");
const prisma = new PrismaClient();

const PostConfirmReservationOfficer = async (req, res, next) => {
  const { transaction_id, status } = req.body;

  try {
    // const result = await
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const PutReservationCanceledCustomer = async (req, res, next) => {
  try {
    const result = await prisma.transaction.update({
      data: {
        status: "canceled",
      },
      where: {
        id: req.params.transaction_id,
      },
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};
const PostReservationCustomer = async (req, res, next) => {
  const { time_start, time_end, space_id, price } = req.body;
  console.log({
    time_start,
    time_end,
    space_id,
    price,

    user_id: req.user.id,
  });

  try {
    const result = await prisma.transaction.create({
      data: {
        price,
        status: "unpaid",
        time_end,
        time_start,
        space_id,
        user_id: req.user.id,
      },
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

module.exports = {
  PostReservationCustomer,
  PutReservationCanceledCustomer,
};
