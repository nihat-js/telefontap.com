const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
prisma.$use(async (params, next) => {
  if (["findMany", "findUnique"].includes(params.action)) {


    // Check for a custom flag to include deleted records
    if (params.args?.includeDeleted) {
      delete params.args.includeDeleted; // Remove the flag
    } else {
      // Add the condition to filter out soft-deleted records
      if (!params.args.where) {
        params.args.where = {};
      }
      params.args.where.deletedAt = null;
    }
    // }

  }
  return next(params);
})

module.exports = prisma