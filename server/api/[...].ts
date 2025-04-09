
import * as productController from "../controller/product"
import * as favoritesController from "../controller/favorites"
import * as userController from "../controller/user"
import * as projectsByCategoryIdController from "../controller/portafolio"
import * as categoryController from "../controller/category"
import * as roleController from "../controller/role"
import * as orderController from "../controller/order"

const router = createRouter()
router.post('/addProduct', defineEventHandler(productController.addProduct))
router.get('/product', defineEventHandler(productController.allProduct))
router.get('/product/:id', defineEventHandler(productController.productById));
router.delete('/deleteProduct/:id', defineEventHandler(productController.deleteProduct));
router.get('/productByCategoryId/:id', defineEventHandler(productController.productByCategoryId));
router.put('/updateProduct/:id', defineEventHandler(productController.updateProduct));

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

router.get('/allUser', defineEventHandler(userController.allUser));
router.get('/userById/:id', defineEventHandler(userController.userById));
router.post('/addUser', defineEventHandler(userController.addUser));
router.put('/updateUserPhone/:id', defineEventHandler(userController.updateUserPhone));
router.delete('/userDelete/:id', defineEventHandler(userController.deleteUser));
router.put('/updateUser/:id', defineEventHandler(userController.updateUser));

router.get('/roles', defineEventHandler(roleController.allRole));




export default useBase("/api/v1/", router.handler)