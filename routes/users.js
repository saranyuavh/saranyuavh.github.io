const express = require('express')
const router = express.Router();
const app = express();
const mongoose = require('mongoose')

const Register = require('../models/userModel')
router.use(express.static("public"));

router.post('/', (req, res, next) => {
    var email = req.body.name;
    var password = req.body.password
    Register.findOne({ email: email, password: password }, function(err, user) {
        if (err) {
            console.log('Error')
            return res.status(500).redirect('/')
        }
        if (!user) {
            return res.status(404).redirect('/')
        }
        if (user) {
            return res.status(200).redirect('/home')
        }

    })

})

const userid = '5ecfdb64e215d63578ae4532'
router.use('/addFav/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $push: { favourite: bookId } }).exec()
        .catch(err => { console.log(err) })
})

router.use('/delFav/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $pull: { favourite: bookId } }).exec()
        .catch(err => { console.log(err) })
})

router.use('/addToCart/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $push: { wishlist: bookId } }).exec()
        .catch(err => { console.log(err) })
})

router.use('/delFromCart/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $pull: { wishlist: bookId } }).exec()
        .catch(err => { console.log(err) })
})



router.get('/showFav', async(req, res) => {
    const results = await Register.find({ _id: userid }, { favourite: 1 });
    let favObj = (results[0].favourite).toString();
    let favlist = favObj.split(",")
    return res.send({ arrList: favlist });
})

router.get('/showCart', async(req, res) => {
    const results = await Register.find({ _id: userid }, { wishlist: 1 });
    let cartObj = (results[0].wishlist).toString();
    let cartlist = cartObj.split(",")
    return res.send({ arrList: cartlist });
})

module.exports = router