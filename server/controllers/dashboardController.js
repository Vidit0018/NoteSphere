
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
    res.render('dashboard/index', {
        userName: req.user.firstName,
        locals, 
        layout: '../views/layouts/dashboard'
    });
}