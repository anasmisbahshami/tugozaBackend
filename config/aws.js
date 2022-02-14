const aws = require('aws-sdk');
aws.config.setPromisesDependency();
aws.config.update({
    accessKeyId: process.env.BUCKET_ACCESS_ID,
    secretAccessKey:process.env.BUCKET_SECRET_ACCESS_KEY,
    region:process.env.BUCKET_REGION,
    bucket:process.env.BUCKET_NAME
});

const s3 = new aws.S3();
module.exports = s3;



