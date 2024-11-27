import { crateAacontControll, uploadControll, confirmControll, listControll, introControll, imageControll } from '../controlers/apiController';
import { Router } from 'express';


const router = Router()


router.post("/createaacont", crateAacontControll)
router.post("/upload", uploadControll)
router.post("/confirm", confirmControll)

router.get("/:customercode/list", listControll)
router.get('/public/:imageName', imageControll);
router.get("/", introControll)


export default router