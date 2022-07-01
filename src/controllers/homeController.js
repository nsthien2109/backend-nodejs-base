import db from '../models/index';


let getHomePage = async (req, res) =>{
    //let data = await db.User.findAll();
    //return res.send(data);
    return res.render('home_page.ejs');
}


export default {
    getHomePage
}