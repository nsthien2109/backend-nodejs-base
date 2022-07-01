import db from '../../models/index';
import userService from '../../services/userService';

let handleLogin = async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode : 1,
            message : "Missing input parameters"
        });
    }
    
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode : userData.errCode,
        message : userData.message,
        data : userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req,res) =>{
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode : 1,
            message : "Missing input parameters",
            data : []
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode : 0,
        message : "OK",
        data : users
    });
}

let handleCreateUser = async (req,res) =>{
    // let email = req.body.email;
    // let firstName = req.body.firstName;
    // let lastName = req.body.lastName;
    // let address = req.body.address;
    // let phoneNumber = req.body.phoneNumber;
    // let password = req.body.password;
    let message = await userService.createUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req,res) => {
    let id = req.body.id;
    if (!id){
        return res.status(200).json({
            errCode : 1,
            message : "Missing required parameter"
        });
    }
    let message = await userService.editUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req,res) => {
    let id = req.body.id;
    if (!id){
        return res.status(200).json({
            errCode : 1,
            message : "Missing required parameter"
        });
    }
    let message = await userService.deleteUser(id);
    return res.status(200).json(message);
}




export default {
    handleLogin,
    handleGetAllUser,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser
}