import express from 'express';

import userController from '../controllers/api/userController';

let router = express.Router();

const initialApiRouter = (app) =>{

    router.post('/login',userController.handleLogin);
    router.get('/user',userController.handleGetAllUser);
    router.post('/create-user', userController.handleCreateUser);
    router.put('/edit-user', userController.handleEditUser);
    router.delete('/delete-user', userController.handleDeleteUser);

    return app.use('/api',router);
}

export default initialApiRouter;