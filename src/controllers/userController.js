import db from '../models/index';
import CRUDservice from '../services/crud_service';


let getUserPage = async (req, res) =>{
    let data = await CRUDservice.getAllUser();
    return res.render('user/read_user_page.ejs',{data : data});
}

let getCreateUserPage = (req, res) =>{
    return res.render('user/create_user_page.ejs');
}


let createUser = async (req, res) =>{
    await CRUDservice.createUser(req.body);
    return res.send("CREATEED USER");
}

let getEditPage = async (req,res) =>{
    let data = await CRUDservice.getUser(req.params.id);
    return res.render('user/edit_user_page.ejs',{data : data});
}

let editUser = async (req, res) => {
    await CRUDservice.editUser(req.body);
    return res.redirect('/user');
}

let deleteUser = async (req, res)=>{
    await CRUDservice.deleteUser(req.params.id);
    return res.redirect('/user');
}


export default {
    getUserPage,
    getCreateUserPage,
    createUser,
    getEditPage,
    editUser,
    deleteUser
}