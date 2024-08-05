
import * as videoController from "../controller/project"
const router = createRouter()
router.get('/project',defineEventHandler(videoController.allProjets))
router.get('/project/:id',defineEventHandler(videoController.projectById));
router.post('/project',defineEventHandler(videoController.addProject));

router.put('/project/:id',defineEventHandler(videoController.actuliazar));
router.delete('/project/:id',defineEventHandler(videoController.eliminar));
export default useBase("/api/v1/", router.handler)