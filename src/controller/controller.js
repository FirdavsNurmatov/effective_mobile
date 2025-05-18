import {
  cancelInProgressService,
  cancelRequestService,
  completeRequestService,
  createRequestService,
  getRequestsService,
  startRequestService,
} from "../service/service.js";

export async function createRequestController(req, res, next) {
  try {
    const { topic, message } = req.body;
    const data = await createRequestService(topic, message);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function startRequestController(req, res, next) {
  try {
    const { id } = req.params;
    const data = await startRequestService(id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function completeRequestController(req, res, next) {
  try {
    const { id } = req.params;
    const { resolution } = req.body;
    const data = await completeRequestService(id, resolution);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function cancelRequestController(req, res, next) {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const data = await cancelRequestService(id, reason);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getRequestsController(req, res, next) {
  try {
    const { date, from, to } = req.query;
    const data = await getRequestsService(date, from, to);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function cancelInProgressController(_, res) {
  try {
    const data = await cancelInProgressService();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
