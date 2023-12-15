var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db=require('../database');
var cons = require("../constants");
var path = require('path');
var session = require('ezsession');
var MySQLStore = require('ezsession')(session);
var hash = require('pbkdf2-password')()
var hasher = require('pbkdf2-password')()
var fs = require('fs');
var multer = require("multer");
var Telebirr = require('telebirrjs');
const {matche} = require('validator')
var bodyParser = require('body-parser');
var fs = require('fs');
var mime = require('mime');
var _ =require('underscore');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());
const MySQLStore = require('express-mysql-session')(session);
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'gebeya'
};
const connection = mysql.createConnection(options); // or mysql.createPool(options);
const sessionStore = new MySQLStore({}/* session store options */, connection);
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
var destUrl=`public/images/uploads/`
/* GET users listing. */
const upload = multer({ dest: `public/images/uploads/` });
router.post('/update',upload.array("image"),  function(req, res) {
  var sess=req.session
  var prnm =req.body.prnm
  var price=req.body.price
  var qty=req.body.qty
  var tbl = `products${'25'}`
  if (req.files) {
  


    if (req.files[0].mimetype === 'image/png') {
      var mim ='png'
    } else if(req.files[0].mimetype === 'image/jpg') {
      var mim ='jpg'
    }else if(req.files[0].mimetype === 'image/jpeg') {
      var mim ='jpg'
    }
    if(req.files[0].mimetype === 'image/webp') {
      var mim ='webp'
    } if(req.files[0].mimetype !== ('image/webp'|'image/jpeg'|'image/jpg'|'image/png')) {
     
      var errm ='Unsupported image format'
    
    }
    //let usr = `SELECT * FROM customer WHERE completed=?`;
    if (errm) {
      //res.send(errm)
      res.render('product_main_page',{errm:errm})
     } 
     var x = req.files[0].filename
   var im=x+`.${mim}`
        let sql = `UPDATE +${tbl} SET owner = "Ronald",species = "cat",age = 1  WHERE id = 5`;
      
    
        db.query(sql, [prnm,price,im,mim,qty], (err, rows) => {
       //   var d_pr = [(rows[0].disc)/100]*rows[0].price
   //var pre_p=rows[0].price - (d_pr)
            if (err) throw err;
           // console.log(req.body);
            console.log(req.files);
          //  console.log("Row inserted with id = "+rows[0].insertId); 
          fs.rename(`${destUrl}${x}`,`${destUrl}${x}.${mim}`, function (err) {
            if (err) throw err;
            console.log('File Renamed.');
            res.redirect('/product-edit')
          });
         //res.send(req.files)
        
        });
      } else {
        res.json({ message: "No file uploaded!" });
      }
})
router.post('/job',  function(req, res) {

})
router.get('/',  function(req, res) {
  res.render('product_search_page')
  })
router.post('/search',  function(req, res) {
  
res.render('product_search_page')
})
router.post('/cat',  function(req, res) {
  var sess=req.session
  var bod=req.body
  var pcat=bod.output
  var sql1=db.query('SELECT scname FROM catagorys WHERE pcid = ?', [pcat], function (err, data, fields) {

if (err){
  res.json({msg:'error'})
} else{
  res.json({msg:'success',pcat:data[0]})
}

  

})})

router.post('/checkout', function(req, res) {
  var sess =req.session;
  var Logid =sess.logid
  var tbl = `orders${'3'}`

  var bod =req.body
  var det=bod.details
  var bil=bod.billing
  var shp =bod.shiping
  var sql1=db.query('SELECT * FROM paym WHERE cust_id = ?', [Logid], function (err, data, fields) {
var appId =data[0].apid
  var appKey =data[0].appky;
  var appKey =data[0].appky;
  var ShortCode =data[0].shrtcd;
  var PaymentMethod=data[0].paymtd
  var tPk =data[0].tpk
  const telebirr = new Telebirr({
    appId: 'YOUR TELEBIRR APP ID',
    appKey: 'YOUR TELEBIRR APP KEY',
    shortCode: 'TELEBIRR SHORT CODE',
    publicKey: 'YOUR TELEBIRR PUBLIC KEY',
  })
  async function fetchData(PaymentMethod,Nonce,url, cb) {
    // 1. Make API request to url
    // 2. If response successful, execute callback
    const { success, response } = await telebirr.makePayment({
      paymentMethod: 'web or app',
      nonce: 'unique string',
      notifyUrl: 'callback url for payment confirmation',
      totalAmount: 4.5, // amount to charge
      outTradeNo: 'unique identifier (order no)',
      receiveName: 'company name',
      returnApp: 'com.example.app', // your application package name
      returnUrl: 'https://yourwebsite.com', // redirect url after payment completion'
      subject: 'payment for',
      timeoutExpress: '120', // valid for 2 hours
      
    })
    cb(res);
    
    
  }
  
  function callback(res) {
    // Do something with results
    if (res.success) {
      
    
    const {
      msisdn, // the phone number from which the payment was done
      outTradeNo, // unique identifier provided when creating the payment
      totalAmount,
      tradeDate,
      tradeNo,
      tradeStatus,
      transactionNo,
    } = Telebirr.getDecryptedCallbackNotification(encryptedTextFromTelebirr)
    const bill =[msisdn,outTradeNo,totalAmount,tradeDate,tradeNo,tradeStatus,transactionNo]
    var Bill =JSON.stringify(bill)
    let sql = `INSERT INTO ${tbl} (details, shping, billing) VALUES (?, ?, ? );`;
    db.query(sql, [det,shp,Bill], (err, rows) => {
  try {
    if (!err) 
    {
     res.send(rows)
     
    }
    
  } catch (err) {
    res.send(err)
  }
      
    })
  } else {
    res.send(res.response)
  }
  }
  
  // Do something
  fetchData('web','xt46f','https://sitepoint.com', callback);



 

  

 
  })
  
  

 });
 var pUpload = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }])
 router.post('/many',pUpload,  function(req, res) {
  //var sess=req.session
 var prnm =req.body.prnm
 var price=req.body.price
 var qty=req.body.invnt
 var desc =req.body.desc
 var tbl = `products${'25'}`
 
 
 
if (req.files['image1'][0].mimetype ==='image/png') {
 var mim1 ='png'
} else if (req.files['image1'][0].mimetype ==='image/jpg') {
 var mim1 ='jpg'
} else if (req.files['image1'][0].mimetype ==='image/jpeg') {
 var mim1 ='jpg'
} else if (req.files['image1'][0].mimetype ==='image/webp') {
 var mim1 ='webp'
}

if (req.files['image2'][0].mimetype ==='image/png') {
 var mim2 ='png'
} else if (req.files['image2'][0].mimetype ==='image/jpg') {
 var mim2 ='jpg'
} else if (req.files['image2'][0].mimetype ==='image/jpeg') {
 var mim2 ='jpg'
} else if (req.files['image2'][0].mimetype ==='image/webp') {
 var mim2 ='webp'
}
if (req.files['image3'][0].mimetype ==='image/png') {
 var mim3 ='png'
} else if (req.files['image3'][0].mimetype ==='image/jpg') {
 var mim3 ='jpg'
} else if (req.files['image3'][0].mimetype ==='image/jpeg') {
 var mim3 ='jpg'
} else if (req.files['image3'][0].mimetype ==='image/webp') {
 var mim3 ='webp'
}
if (req.files['image4'][0].mimetype ==='image/png') {
 var mim4 ='png'
} else if (req.files['image4'][0].mimetype ==='image/jpg') {
 var mim4 ='jpg'
} else if (req.files['image4'][0].mimetype ==='image/jpeg') {
 var mim4 ='jpg'
} else if (req.files['image4'][0].mimetype ==='image/webp') {
 var mim4 ='webp'
}
var x1 =req.files['image1'][0].filename
  var im1=x1+`.${mim1}`
var x2 =req.files['image2'][0].filename
  var im2=x2+`.${mim2}`
  var x3 =req.files['image3'][0].filename
  var im3=x3+`.${mim3}`
  var x4 =req.files['image4'][0].filename
  var im4=x4+`.${mim4}`


       let sql = `INSERT INTO ${tbl} (name, price, primg, mime,qty, descr,primg2,primg3,primg4) VALUES (?,?,?,?,?,?,?,?,?);`;
      
       db.query(sql, [prnm,price,im1,'NULL',qty,desc,im2,im3,im4], (errx, rows) => {
      
        if (errx) throw errx;
        // console.log(req.body);
        // console.log(req.files);
       //  console.log("Row inserted with id = "+rows[0].insertId); 
       if (!errx) {
        fs.rename(`${destUrl}${x1}`,`${destUrl}${x1}.${mim1}`, function (err) {
          if (err) throw err;
          fs.rename(`${destUrl}${x2}`,`${destUrl}${x2}.${mim2}`, function (err) {
            if (err) throw err;
            fs.rename(`${destUrl}${x3}`,`${destUrl}${x2}.${mim3}`, function (err) {
              if (err) throw err;
              fs.rename(`${destUrl}${x4}`,`${destUrl}${x4}.${mim4}`, function (err) {
         if (err) throw err;
          console.log('File Renamed.');
          res.redirect('/inventory/add')
        }); 
      });
    });
  });
       } else {
        res.json({ message: "err!" });
       }
    
      //res.send(req.files)
     
          
       
       });
     //  res.send(mim1);
})

router.post('/nprd', function(req, res) {
  var sess=req.session;
 var prnm =req.body.prnm;
 var price=req.body.price;
 var qty=req.body.qty;
 var desc =req.body.desc;
 var color =req.body.color;
 var tbl = `products${'25'}`
 
   

 



       let sql = `INSERT INTO ${tbl} (name, price, qty, color,cid) VALUES (?, ?, ?,?,?);`;
      
       db.query(sql, [prnm,price,qty,color,sess.logid], (err, rows) => {
      //   var d_pr = [(rows[0].disc)/100]*rows[0].price
  //var pre_p=rows[0].price - (d_pr)
           if (err) throw err;
           var tid = rows.insertId;
          
         
        res.render('add_opt',{tid:tid,prnm:prnm,qty:qty,price:price,color:color})
      // res.send({prnm})
       });
     
})

router.post('/ty',upload.array("image"),  function(req, res) {
   var sess=req.session
  var prnm =req.body.prnm
  var price=req.body.price
  var qty=req.body.invnt
  var desc =req.body.desc
  var tbl = `products${'25'}`
  
    
if (req.files) {
  


if (req.files[0].mimetype === 'image/png') {
  var mim ='png'
} else if(req.files[0].mimetype === 'image/jpg') {
  var mim ='jpg'
}else if(req.files[0].mimetype === 'image/jpeg') {
  var mim ='jpg'
}
if(req.files[0].mimetype === 'image/webp') {
  var mim ='webp'
} if(req.files[0].mimetype !== ('image/webp'|'image/jpeg'|'image/jpg'|'image/png')) {
 
  var errm ='Unsupported image format'

}
//let usr = `SELECT * FROM customer WHERE completed=?`;
if (errm) {
  //res.send(errm)
  res.render('product_main_page',{errm:errm})
 } 
var x =req.files[0].filename
   var im=x+`.${mim}`
        let sql = `INSERT INTO ${tbl} (name, price, primg, mime,qty, descr) VALUES (?, ?, ? ,?,? ,?);`;
       
        db.query(sql, [prnm,price,im,mim,qty,desc], (err, rows) => {
       //   var d_pr = [(rows[0].disc)/100]*rows[0].price
   //var pre_p=rows[0].price - (d_pr)
            if (err) throw err;
           // console.log(req.body);
            console.log(req.files);
          //  console.log("Row inserted with id = "+rows[0].insertId); 
          fs.rename(`${destUrl}${x}`,`${destUrl}${x}.${mim}`, function (err) {
            if (err) throw err;
            console.log('File Renamed.');
            res.redirect('/inventory/upadatepr')
          });
         //res.send(req.files)
        
        });
      } else {
        res.json({ message: "No file uploaded!" });
      }
})
const uploadImage = async (req, res, next) => {
  // to declare some path to store your converted image
  var img = req.body.image
  var matches = _.isMatch(req.body.image, /^data:([A-Za-z-+\/]+);base64,(.+)$/),
 
  response = {};

if (matches !== true) {
  return new Error('Invalid input string');
}

response.type = img;
response.data = new Buffer(img, 'base64');
let decodedImg = response;
let imageBuffer = decodedImg.data;
let type = decodedImg.type;
let extension = mime.extension(type);
let fileName =  "image." + extension;
try {
  fs.writeFileSync("public/images/uploads/" + fileName, imageBuffer, 'utf8');
  return res.send({"status":"success"});
} catch (e) {
  next(e);
}
}
  
var xUpload = upload.any([{ name: 'image', maxCount: 1 },{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }])

router.post('/image', upload.single('image'),  function(req, res) {
  
  var sess=req.session;
 var prnm =req.body.prnm
 var price=req.body.price
 var qty=req.body.invnt
 var desc =req.body.desc
 var pid = req.body.pidx
 var tbl = `products25`;
 var op=req.body.opn
 if (req.file.mimetype ==='image/png') {
  var mim ='png'
 } else if (req.file.mimetype ==='image/jpg') {
  var mim ='jpg'
 } else if (req.file.mimetype ==='image/jpeg') {
  var mim ='jpg'
 } else if (req.file.mimetype ==='image/webp') {
  var mim ='webp'
 }

 //var sql = 'SELECT ?? FROM ?? WHERE LK_USER_FNAME = ? AND LK_USER_LOGIN = ? ORDER BY ?? DESC LIMIT ?,?';
//var columns = ['LK_USER_ID', 'LK_USER_STATUS', 'LK_USER_CONATCT_OFF'];
 
 
 var x =req.file.filename
   var im=x+`.${mim}`
 
 
   
   if (op==='0') {
     //var sql = `UPDATE ${tbl} SET primg = ${im} WHERE product_id = ${pid}`;  
     const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?';
     const params = [tbl,'primg',im,'product_id',pid,'cid',sess.logid]
   //let sql = `INSERT INTO ${tbl} (name, price, primg, mime,qty, descr,primg2,primg3,primg4) VALUES (?,?,?,?,?,?,?,?,?);`;
   db.query(sql,params, (errx, rows) => {
     if (errx) throw errx
     console.log(req.body);
     fs.rename(`${destUrl}${x}`,`${destUrl}${x}.${mim}`, function (err) {
       if (err) throw err;
       console.log(req.body)
     })
   })
   } if (op==='1') {
      //var sql = `UPDATE ${tbl} SET primg = ${im} WHERE product_id = ${pid}`;  
      const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
      const params = [tbl,'primg1',im,'product_id',pid]
    //let sql = `INSERT INTO ${tbl} (name, price, primg, mime,qty, descr,primg2,primg3,primg4) VALUES (?,?,?,?,?,?,?,?,?);`;
    db.query(sql,params, (errx, rows) => {
      if (errx) throw errx
      console.log(req.body);
      fs.rename(`${destUrl}${x}`,`${destUrl}${x}.${mim}`, function (err) {
        if (err) throw err;
        console.log(req.body)
      })
    })
   } if (op==='2') {
    //var sql = `UPDATE ${tbl} SET primg = ${im} WHERE product_id = ${pid}`;  
    const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    const params = [tbl,'primg2',im,'product_id',pid]
  //let sql = `INSERT INTO ${tbl} (name, price, primg, mime,qty, descr,primg2,primg3,primg4) VALUES (?,?,?,?,?,?,?,?,?);`;
  db.query(sql,params, (errx, rows) => {
    if (errx) throw errx
    console.log(req.body);
    fs.rename(`${destUrl}${x}`,`${destUrl}${x}.${mim}`, function (err) {
      if (err) throw err;
      console.log(req.body)
    })
  })
 } if (op==='3') {
  //var sql = `UPDATE ${tbl} SET primg = ${im} WHERE product_id = ${pid}`;  
  const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
  const params = [tbl,'primg3',im,'product_id',pid]
//let sql = `INSERT INTO ${tbl} (name, price, primg, mime,qty, descr,primg2,primg3,primg4) VALUES (?,?,?,?,?,?,?,?,?);`;
db.query(sql,params, (errx, rows) => {
  if (errx) throw errx
  console.log(req.body);
  fs.rename(`${destUrl}${x}`,`${destUrl}${x}.${mim}`, function (err) {
    if (err) throw err;
    console.log(req.body)
  })
})
}if (op==='4') {
  //var sql = `UPDATE ${tbl} SET primg = ${im} WHERE product_id = ${pid}`;  
  const sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
  const params = [tbl,'primg4',im,'product_id',pid]
//let sql = `INSERT INTO ${tbl} (name, price, primg, mime,qty, descr,primg2,primg3,primg4) VALUES (?,?,?,?,?,?,?,?,?);`;
db.query(sql,params, (errx, rows) => {
  if (errx) throw errx
  console.log(req.body);
  fs.rename(`${destUrl}${x}`,`${destUrl}${x}.${mim}`, function (err) {
    if (err) throw err;
    console.log(req.body)
  })
})
}
   
 
        
//console.log(req.file)
})
router.get('/asearch', function(req, res) {
var data =[{isrc:'product05.png',name:'Oppo Mobile A56',price:'150'},{isrc:'product02.png',name:'ABC Phone',price:'11,569'}]
res.json(data)
})
modul