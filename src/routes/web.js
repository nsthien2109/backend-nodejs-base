import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

const initialWebRouter = (app) =>{
    //home controller
    router.get('/',homeController.getHomePage);
    // user controller
    router.get('/user',userController.getUserPage);
    router.get('/create-user',userController.getCreateUserPage);
    router.post('/user',userController.createUser);
    router.get('/edit-user/:id',userController.getEditPage);
    router.post('/update-user',userController.editUser);
    router.get('/delete-user/:id', userController.deleteUser);


    return app.use('/',router);
}

export default initialWebRouter;