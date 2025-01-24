
import * as productController from "../controller/product"
import * as favoritesController from "../controller/favorites"
import * as userController from "../controller/user"
import * as projectsByCategoryIdController from "../controller/portafolio"
import * as categoryController from "../controller/category"
import * as orderController from "../controller/order"

const router = createRouter()
router.post('/product', defineEventHandler(productController.addProduct))
router.get('/product', defineEventHandler(productController.allProduct))
router.get('/product/:id', defineEventHandler(productController.productById));
router.get('/productByCategoryId/:id', defineEventHandler(productController.productByCategoryId));

router.post('/addOrder', defineEventHandler(orderController.addOrder));
router.get('/orders/:id', defineEventHandler(orderController.getOrderById));
router.get('/ordersByUser/:id', defineEventHandler(orderController.getOrdersByUser));

router.post('/addlike', defineEventHandler(favoritesController.addLike));
router.get('/allfavorites', defineEventHandler(favoritesController.allFavorites));

router.get('/projectsByCategoryId/:id', defineEventHandler(projectsByCategoryIdController.projectsByCategoryId));

router.get('/allProjetsCategory', defineEventHandler(projectsByCategoryIdController.allProjets));

router.get('/category', defineEventHandler(categoryController.allCategory));
router.post('/addCategory', defineEventHandler(categoryController.addCategory));
router.put('/updateCategory/:id', defineEventHandler(categoryController.updateCategory));
router.delete('/deleteCategory/:id', defineEventHandler(categoryController.deleteCategory));

router.post('/addUser', defineEventHandler(userController.addUser));

router.put('/project/:id', defineEventHandler(productController.actuliazar));
router.delete('/project/:id', defineEventHandler(productController.eliminar));
export default useBase("/api/v1/", router.handler)