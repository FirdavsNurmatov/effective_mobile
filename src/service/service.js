import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createRequestService(topic, message) {
  try {
    const res = await prisma.request.create({ data: { topic, message } });

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function startRequestService(id) {
  try {
    const updated = await prisma.request.update({
      where: { id },
      data: { status: "IN_PROGRESS" },
    });

    return updated;
  } catch (error) {
    throw new Error(error);
  }
}

export async function completeRequestService(id, resolution) {
  try {
    const updated = await prisma.request.update({
      where: { id },
      data: { status: "COMPLETED", resolution },
    });

    return updated;
  } catch (error) {
    throw new Error(error);
  }
}

export async function cancelRequestService(id, reason) {
  try {
    const updated = await prisma.request.update({
      where: { id },
      data: { status: "CANCELLED", cancelReason: reason },
    });

    return updated;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getRequestsService(date, from, to) {
  try {
    let where = {};

    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      where.createdAt = { gte: d, lt: next };
    } else if (from && to) {
      where.createdAt = {
        gte: new Date(from),
        lte: new Date(to),
      };
    }

    const res = await prisma.request.findMany({ where });

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function cancelInProgressService() {
  try {
    const updated = await prisma.request.updateMany({
      where: { status: "IN_PROGRESS" },
      data: { status: "CANCELLED", cancelReason: "Auto cancelled" },
    });

    return { updated: updated.count };
  } catch (error) {
    throw new Error(error);
  }
}
