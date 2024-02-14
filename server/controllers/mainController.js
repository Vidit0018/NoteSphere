/**
 * GET /
 * Homepage
 */
exports.homepage = async (req,res)=>{
    const locals = {
        title : "NoteSphere",
        description : "Notes Making App",
    }
    res.render('index', {
        locals, 
        layout: '../views/layouts/frontpage'
    });
}
/**
 * GET /
 * About
 */
exports.about = async (req,res)=>{
    const locals = {
        title : " About : NoteSphere",
        description : "Notes Making App",
    }
    res.render('about', locals);
}