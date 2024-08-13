
import * as videoController from "../controller/project"
import * as favoritesController from "../controller/favorites"
import * as userController from "../controller/user"
import * as projectsByCategoryIdController from "../controller/portafolio"
import * as categoryController from "../controller/category"

const router = createRouter()
router.get('/project',defineEventHandler(videoController.allProjets))

router.get('/project/:id',defineEventHandler(videoController.projectById));
router.post('/project',defineEventHandler(videoController.addProject));

router.post('/addlike',defineEventHandler(favoritesController.addLike));
router.get('/allfavorites',defineEventHandler(favoritesController.allFavorites));

router.get('/projectsByCategoryId/:id',defineEventHandler(projectsByCategoryIdController.projectsByCategoryId));

router.get('/allProjetsCategory',defineEventHandler(projectsByCategoryIdController.allProjets));

router.get('/category',defineEventHandler(categoryController.allCategory));
router.post('/addCategory',defineEventHandler(categoryController.addCategory));
router.put('/updateCategory/:id',defineEventHandler(categoryController.updateCategory));
router.delete('/deleteCategory/:id',defineEventHandler(categoryController.deleteCategory));



router.post('/addUser',defineEventHandler(userController.addUser));

router.put('/project/:id',defineEventHandler(videoController.actuliazar));
router.delete('/project/:id',defineEventHandler(videoController.eliminar));
export default useBase("/api/v1/", router.handler)