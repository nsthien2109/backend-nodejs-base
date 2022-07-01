- Cài đặt như khóa nodeJs Basic [tại_đây](https://github.com/nsthien2109/NodeJSBasic/blob/master/Note_nodeJS.md)

- Cài đặt thêm Sequelize để có thể sử dụng ORM trên SQL : 
 + Các thứ cần cài đặt : 
    - [npm-sequelize](npmjs.com/package/sequelize)
    - [npm-sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
    - [sequelize-cli-tutorial](https://sequelize.org/docs/v6/other-topics/migrations/#installing-the-cli)

    -[mysql2](https://www.npmjs.com/package/mysql2) 


 + Tạo file config sequelize :
    + .sequelizerc
    + Thêm : const path = require('path');
            module.exports = {
            'config': path.resolve('./src/configs', 'config-sequelize.json'),
            'migrations-path': path.resolve('./src', 'migrations'),
            'models-path': path.resolve('./src', 'models'),
            'seeders-path': path.resolve('./src', 'seeders')
            }
    + Chạy lệnh : node_modules/.bin/sequelize init

 + cd vào src folder : 
   - npx sequelize-cli init

 + Cách sử dụng sequelize : 
   Tạo model : npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
   Chạy migration : npx sequelize-cli db:migrate
   Tạo seed fake data : npx sequelize-cli seed:generate --name demo-user



+ Tao connectDB in src/configs


+ cài đặt bycrypt để mã hóa mật khẩu
 [bycrypt](https://www.npmjs.com/package/bcrypt)






npx sequelize-cli model:generate --name User --attributes id:integer,email:string,firstName:string,lastName:string,address:string,gender:tinyint, roleid:string
npx sequelize-cli model:generate --name Allcode --attributes key:string,type:string,value_vi:string,value_en:string

npx sequelize-cli model:generate --name Schedule --attributes currentNumber:integer,maxNumber:integer,date:date  

npx sequelize-cli model:generate --name Booking --attributes statusId:string,doctorId:integer,patientId:integer,date:date,timeType:string

npx sequelize-cli model:generate --name Clinic --attributes address:string,description:text,image:string,name:string


npx sequelize-cli model:generate --name History --attributes patientId:integer,doctorId:integer,description:text,files:string

npx sequelize-cli model:generate --name Specialty --attributes description:text,image:string,name:string

npx sequelize-cli model:generate --name Doctor_clinic_specialty --attributes doctorId:integer,clinicId:integer,specialtyId:integer





npx sequelize-cli db:migrate

