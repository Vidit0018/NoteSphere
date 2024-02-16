
// const Note = require('../models/notes')
// const mongoose = require('mongoose')
// /**
//  * GET /
//  * Homepage
//  */
// exports.dashboard = async (req,res)=>{
//     let perPage=12;
//     let page= req.query.page||1
//     const locals = {
//         title : "Dashboard",
//         description : "Notes Making App",
//     }
//     try{
//             Note.aggregate([
//                 {
//                     $sort:{
//                         createdAt:-1,
//                     }
//                 },
//                 {   
//                     $match :{
//                         user:  new mongoose.Types.ObjectId(req.user.id)
//                     }
//                 },
//                 {
//                     $project: {
//                         title: {$substr:['$title',0,30]},
//                         body: {$substr: ['body',0,100]},
//                     }
//                 }

//             ]).skip(perPage * page -perPage)
//             .limit(perPage)
//             .exec(function(err,notes){
//                 Note.count().exec(function(err,count){
//                     if(err) return next(err);
//                     res.render('dashboard/index', {
//                         userName: req.user.firstName,
//                         locals, 
//                         notes,
//                         layout: '../views/layouts/dashboard',
//                         current: page,
//                         pages: Math.ceil(count / perPage)
//                 });
//             })


        
//         });

//     }
//     catch(error){
//         console.log(error);
//     }

// }

const Note = require('../models/notes')
const mongoose = require('mongoose')
exports.dashboard = async (req, res) => {
    const perPage = 20;
    const page = req.query.page || 1;
    const locals = {
        title: "Dashboard",
        description: "Notes Making App",
    };

    try {
        const notes = await Note.aggregate([
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {   
                $match: {
                     user: new mongoose.Types.ObjectId(req.user.id),



                }
                
            },
            
            {
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 100] },
                },
            },
        ])
            .skip(perPage * page - perPage)
            .limit(perPage);

        const count = await Note.countDocuments({
            user: new mongoose.Types.ObjectId(req.user.id),
        });

        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard',
            current: page,
            pages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
        // Handle error appropriately, such as sending an error response
        res.status(500).send('Internal Server Error');
    }
};
