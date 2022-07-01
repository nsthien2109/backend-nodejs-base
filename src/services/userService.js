import db from "../models/index";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExistEmail = await checkEmailInput(email);
      if (isExistEmail) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: [
            "id",
            "email",
            "password",
            "firstName",
            "phoneNumber",
            "roleid",
          ],
          raw: true,
        });
        if (user) {
          const match = await bcrypt.compare(password, user.password);
          user.password = undefined;
          if (match) {
            userData.errCode = 0;
            userData.message = "Login successfully";
            userData.user = user;
          } else {
            userData.errCode = 2;
            userData.message = "Wrong password";
          }
        } else {
          userData.errCode = 3;
          userData.message = "User not found";
        }
      } else {
        userData.errCode = 1;
        userData.message = "Your email isn't exist";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkEmailInput = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      } else if (id) {
        users = await db.User.findAll({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

let createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmailInput(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Email is already exist in our system",
        });
      } else {
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
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check user
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        // update user
        await db.User.update(
          {
            email: data.email,
            firstName: data.firstname,
            lastName: data.lastname,
            address: data.address,
            phoneNumber: data.phonenumber,
          },
          { where: { id: data.id } }
        );
        resolve({
          errCode: 0,
          message: "OK",
        });
      } else {
        resolve({
          errCode: 2,
          message: "User isn't exits",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (UserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: UserId } });
      if (!user) {
        resolve({
          errCode: 1,
          message: "User isn't exist",
        });
      } else {
        await db.User.destroy({ where: { id: UserId } });
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  checkEmailInput,
  handleUserLogin,
  getAllUser,
  createUser,
  editUser,
  deleteUser,
};
