import express from "express";
import auth from "./auth.route";
import role from './user.route'


const router = express.Router();

router.use("/auth", auth);
router.use("/role", role);


export default router;
