const { PrismaClient } = require("@prisma/client");
const { createPagination } = require("../lib/helper");
const prisma = new PrismaClient();

const GetFloorCustomer = async (req, res, next) => {
  const { start_time, end_time } = req.query;

  try {
    const result = await prisma.floor.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        space: {
          orderBy: {
            created_at: "asc",
          },
          include: {
            transaction: {
              where: {
                user_id: req.user.id,
                status: {
                  not: "canceled",
                },
                AND: [
                  {
                    time_start: {
                      lt: end_time,
                    },
                  },
                  {
                    time_end: {
                      gt: start_time,
                    },
                  },
                ],
              },
            },
          },
          where: {
            deleted_at: null,
          },
        },
      },
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const GetFloorOfficer = async (req, res, next) => {
  try {
    const result = await prisma.floor.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        space: {
          orderBy: {
            created_at: "asc",
          },
          where: {
            deleted_at: null,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};
const PostFloorOfficer = async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await prisma.floor.create({ data: { name } });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const PutFloorOfficer = async (req, res, next) => {
  const { name } = req.body;
  const floorId = req.params.floor_id;
  try {
    const result = await prisma.floor.update({
      data: { name },
      where: {
        id: floorId,
      },
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const DeleteFloorController = async (req, res, next) => {
  const floorId = req.params.floor_id;
  try {
    const result = await prisma.floor.update({
      data: { deleted_at: new Date() },
      where: {
        id: floorId,
      },
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

module.exports = {
  PostFloorOfficer,
  PutFloorOfficer,
  DeleteFloorController,
  GetFloorOfficer,
  GetFloorCustomer,
};
