const fs = require('fs');
const express = require('express');
const multer  = require('multer')
const multerUpload = multer({ dest: 'uploads/' })
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Only POST method accepted with multipart file");
})

router.post('/', multerUpload.array('testFile'), (req, res) => {
    req.files.map(i => {
        console.log(i);

        fs.rename(i.path, './uploads/' + i.originalname, function (err) {
            if (err) throw err;
            console.log('renamed complete');
            res.send("Test");
        });
    })
})

module.exports = router;