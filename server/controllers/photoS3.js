const dotenv = require('dotenv')
const aws = require('aws-sdk')
dotenv.config()

aws.config.update({
  'accessKeyId': process.env.accessKeyId_FEC,
  'secretAccessKey': process.env.secretAccessKey_FEC,
  'region': process.env.aws_region_FEC,
  'bucketname': process.env.awsBucket_FEC
});

const s3 = new aws.S3()
const S3_BUCKET = process.env.awsBucket_FEC;

module.exports = (req, res) => {
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 10000,
    Body: req.file.buffer,
    ContentType: fileType,
    ACL: 'public-read'
  }

  s3.putObject(s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 409;
      res.json({success: false, error: err})
    }

    const mediaUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    console.log(mediaUrl)
    res.send(mediaUrl)
  })
}