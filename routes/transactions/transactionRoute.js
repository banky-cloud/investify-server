import { verifyAdmin, verifyToken } from "../users/verify.js";
import { approveTransaction, declineTransaction, deposit, invest, withdraw } from "./controllers.js";
import { Router } from "express";
const transactionRouter= Router()
transactionRouter.post("/deposit", verifyToken, deposit)
transactionRouter.post("/withdraw", verifyToken, withdraw)
transactionRouter.post("/invest", verifyToken, invest)
transactionRouter.post("/approve/:id", verifyAdmin, approveTransaction)
transactionRouter.post("/decline/:id", verifyAdmin, declineTransaction)







export default transactionRouter