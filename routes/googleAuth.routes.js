import express from "express";

import {
  googleLogin,
  googleCallback,
} from "../controllers/googleAuth.controller.js";

const router = express.Router();

router.get("/google", googleLogin);

router.get("/", googleCallback);

export default router;