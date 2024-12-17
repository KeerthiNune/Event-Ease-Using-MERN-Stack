import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addRequest,getRequests,getRequest,getRequestDetail,updateRequest,deleteRequest} from "../controllers/requestController.js"

const router = express.Router()

router.post("/add",authMiddleware,addRequest)
router.get("/:id",authMiddleware,getRequest)
router.get("/detail/:id",authMiddleware,getRequestDetail)
router.put("/:id",authMiddleware,updateRequest)
router.get("/",authMiddleware,getRequests)
router.delete("/:id",authMiddleware, deleteRequest);


export default router;