import { Router } from "express";
import {
  cancelInProgressController,
  cancelRequestController,
  completeRequestController,
  createRequestController,
  getRequestsController,
  startRequestController,
} from "../controller/controller.js";

export const router = Router();

router.get("/", getRequestsController);
router.post("/", createRequestController);
router.post("/cancel-in-progress", cancelInProgressController);
router.patch("/:id/start", startRequestController);
router.patch("/:id/complete", completeRequestController);
router.patch("/:id/cancel", cancelRequestController);
