import bcrypt  from 'bcrypt';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);

let createUser = (data) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            const hashPass = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPass,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                gender: data.gender,
                roleid: data.role,
                phoneNumber: data.phonenumber,
            });
            resolve("Created OK");
        } catch (error) {
            reject(error);
        }
    })
}


let hashPassword = (password) =>{
    return new Promise( async (resolve, reject) => {
        try {
            const hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    })
}


let getAllUser = () =>{
    return new Promise( async (resolve, reject) =>{
        try {
            let users = await db.User.findAll({
                raw : true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

let getUser = (id) =>{
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } ,raw : true});
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
}


let editUser = (data) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            await db.User.update(
                {
                    email: data.email,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address: data.address,
                    phoneNumber: data.phonenumber
                },
                {where : {id : data.id}}
            );
            resolve("updated OK");
        } catch (error) {
            console.log("LỖI");
            reject(error);
        }
    })
}


let deleteUser = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.User.destroy({ where: { id: id } });
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}


export default {
    createUser,
    getAllUser, 
    getUser,
    editUser,
    deleteUser
}