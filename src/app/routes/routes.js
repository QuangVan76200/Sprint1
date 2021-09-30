const express = require('express');
const router = express.Router();
const Accounts = require('../models/Accounts');
const Argon2 = require('argon2');
const jwt = require('jsonwebtoken');
// const AdminBro = require('admin-bro');
// const AdminBroExpressjs = require('admin-bro-expressjs');
// const { application } = require('express');
// const Role = require('_helpers/role');




// const AccountController= require('../controllers/AccountController');


// router.post('/register',AccountController.index);

// router.post('/login',AccountController.show);

// router.get('/login',)

// async function check(req, res , next){
//     const header=req.header('Authorization')
//     const token=(!!header)?header.split(' ')[1]:header;
//     if(!token){
//         return res.json({
//             message:'A token is required for authentication',
//             success:false
//         })
//     }
//     try {
//         const decoded= await jwt.verify(token,'afakdaskjbddaskdbs');
//         if(!!decoded)
//         {
//            req.UserID=decoded.UserID;
//         //console.log(req.UserID),
//            next();  
//         }
//         else{
//             return res.json({
//                 success:false,
//                 message:'Token not found'
//             })
//         }
//     } catch (error) {
//         return res.json({
//             message:'Invalid Token',
//             success:false
//         })
//     }
// }


//XAC THUC DANG KY



router.post('/', async (req, res) => {
  try {
    const {
        userName,
        passWord,
        active
    } = req.body;
    if (!userName || !passWord || !active) {
        return res.json('Username or Password is not missing');
    }
    const User = await Accounts.findOne({
        userName
    });
    if (User) {
        return res.json('Da Ton Tai');

    }
    const passwordhash = await Argon2.hash(passWord);
    const newUser = new Accounts({
        userName,
        passWord: passwordhash,
        active
    });
    await newUser.save();

    const token = await jwt.sign({
        idUser: newUser._id
    }, 'afakdaskjbddaskdbs');
    return res.json({
        newUser,
        tokenprocess: token
        
        
    })
  } catch (error) {
      console.log(error)
      return res.json({success:false,
         message:'Internal Server Error'
    })
  }
})



//XAC THUC DANG NHAP





router.post('/login1', async (req, res, next) => {
    try {
        const {
            userName,
            passWord
        } = req.body;

        console.log(userName,passWord)
        
        if (!userName || !passWord) {
            return res.json({
                success: false,
                message: 'All input is required',
            })
        }
        const User = await Accounts.findOne({
            userName
        });
        if (User) {
           
            const passwordhash = await Argon2.verify(User.passWord, passWord); //Verify đk ss
           
            if (!passwordhash) {
                return res.json({
                    success: false,
                    message: 'Wrong password',
                })
            } else {
                // console.log('Hello')
                const token = await jwt.sign({UserID: User._id}, 'afakdaskjbddaskdbs') //.sign truyen 1 doi tuong
                // console.log(token)
                     return res.json({
                        token:token,
                        message:'Successful Login',
                        success: true
                    })
            }
        } else {
            return res.json({
                message:'Account does not exist',
                success: false,
            })
        }
    } catch (error) {
        return res.json({
            success:false,
            message:'Fail Connect'

        })
    }

    


})


// router.get('/auth',async(req, res, next)=>{
//     // const token= req.query.token || req.header.token["Access Token"];
//     const header=req.header('Authorization');
//     const token=(!!header)?header.split(' ')[1]:header;
//     if(!token){
//         return res.json({
//             message:'A token is required for authentication',
//             success:false
//         })
//     }
//     try {
//         const decoded= await jwt.verify(token,'afakdaskjbddaskdbs');
//         if(!!decoded)
//         {
//             const user=Accounts.findById({_id:decoded.UserID});
//             if(!!user){
//                 return res.json({
//                     success:true,
//                     token
//                 })
//             }
//             else{
//                 return res.json({
//                     success:false,
//                     message:'Token not is not definded'
//                 })
//             }
//         }
//         else{
//             return res.json({
//                 success:false,
//                 message:'Token not found'
//             })
//         }
//     } catch (error) {
//         return res.json({
//             message:'Invalid Token',
//             success:false
//         })
//     }
//     return next();
// })

// route.get('/all',(req, res, next)=>{
//     try{
//         if(!!token)
//         next()
//     }
//     catch(err){
//             res.json({
//                 message:'Fail Token',
//                 success:false,
//             })      
//     }
// })



// router.get('/user',check, (req, res, next)=>{
//     next()
// },(req, res, next)=>{
//     res.json('User')
// })


// router.get('/admin', check, (req, res, next)=>{
//     next()
// },(req, res, next)=>{
//     res.json('Admin')
// })




module.exports=router

