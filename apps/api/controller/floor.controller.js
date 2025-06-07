const { PrismaClient } = require("@prisma/client");
const { createPagination } = require("../lib/helper");
const prisma = new PrismaClient();

const GetFloorCustomer = async (req, res, next) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;
  try {
    const count = await prisma.floor.count({
      where: {
        deleted_at: null,
      },
    });
    const result = await prisma.floor.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        space: true,
      },
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const GetFloorOfficer = async (req, res, next) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;
  try {
    const count = await prisma.floor.count({
      where: {
        deleted_at: null,
      },
    });
    // const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.floor.findMany({
      // skip,
      // take: Number(per_page),
      where: {
        deleted_at: null,
      },
      include: {
        space: {
          orderBy: {
            created_at: "asc",
          },
        },
      },
      // distinct:'created_at'
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
  const { name } = req.body;
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
