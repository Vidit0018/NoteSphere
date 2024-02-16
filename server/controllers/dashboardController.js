
const Note = require('../models/notes')
const mongoose = require('mongoose')
/**
 * GET /
 * Homepage
 */
exports.dashboard = async (req,res)=>{
    const locals = {
        title : "Dashboard",
        description : "Notes Making App",
    }
    try{
        const notes= await Note.find({});
        
        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals, 
            notes,
            layout: '../views/layouts/dashboard'
        });

    }
    catch(error){
        console.log(error);
    }

}