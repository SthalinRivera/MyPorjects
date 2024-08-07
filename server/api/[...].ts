
import * as videoController from "../controller/project"
import * as favoritesController from "../controller/favorites"

const router = createRouter()
router.get('/project',defineEventHandler(videoController.allProjets))

router.get('/project/:id',defineEventHandler(videoController.projectById));
router.post('/project',defineEventHandler(videoController.addProject));

router.post('/addlike',defineEventHandler(favoritesController.addLike));
router.get('/allfavorites',defineEventHandler(favoritesController.allFavorites));

router.put('/project/:id',defineEventHandler(videoController.actuliazar));
router.delete('/project/:id',defineEventHandler(videoController.eliminar));
export default useBase("/api/v1/", router.handler)