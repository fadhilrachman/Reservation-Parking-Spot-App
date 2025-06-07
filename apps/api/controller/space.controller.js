const { PrismaClient } = require("@prisma/client");
const { createPagination } = require("../lib/helper");
const prisma = new PrismaClient();

const GetSpaceCustomer = async (req, res, next) => {
  const { page = 1, per_page = 10, floor_id } = req.query;
  const skip = (page - 1) * per_page;

  let filter = {
    deleted_at: null,
  };

  if (floor_id) filter.floor_id = floor_id;
  try {
    const count = await prisma.space.count({
      where: filter,
    });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.space.findMany({
      skip,
      take: Number(per_page),
      where: {
        deleted_at: null,
      },
    });
    return res.status(200).json({ data: result, pagination });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const GetSpaceOfficer = async (req, res, next) => {
  const { page = 1, per_page = 10, floor_id } = req.query;
  const skip = (page - 1) * per_page;
  let filter = {
    deleted_at: null,
  };

  if (floor_id) filter.floor_id = floor_id;
  try {
    const count = await prisma.space.count({
      where: filter,
    });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.space.findMany({
      skip,
      take: Number(per_page),
      where: {
        deleted_at: null,
      },
    });
    return res.status(200).json({ data: result, pagination });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};
const PostSpaceOfficer = async (req, res, next) => {
  const { name, floor_id } = req.body;
  try {
    const result = await prisma.space.create({ data: { name, floor_id } });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const PutSpaceOfficer = async (req, res, next) => {
  const { name, floor_id } = req.body;

  const spaceId = req.params.space_id;
  try {
    const result = await prisma.space.update({
      data: { name, floor_id },
      where: {
        id: spaceId,
      },
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

const DeleteSpaceOfficer = async (req, res, next) => {
  const spaceId = req.params.space_id;
  try {
    const result = await prisma.space.update({
      data: { deleted_at: new Date() },
      where: {
        id: spaceId,
      },
    });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: error || "Internal Server Error" });
  }
};

module.exports = {
  PostSpaceOfficer,
  PutSpaceOfficer,
  DeleteSpaceOfficer,
  GetSpaceOfficer,
  GetSpaceCustomer,
};
