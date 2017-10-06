var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

router.post('/fileUpload', upload.single('image'), (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db, 'public/images/uploads/' + req.file.filename, () => {
            db.close();
            res.json({'message': 'File uploaded successfully'});
        });
    });
});

module.exports = router;

var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('user');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}