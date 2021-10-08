
/*
    AWS SDK for Node.js provides the s3.listObjects API which
    lists the objects from a bucket. However, if you have a lot
    of objects in your bucket then the response of this API is 
    truncated. So, the entire contents of a bucket cannot be
    fetched in a single API call and you need to call the API
    multiple times, each time passing a `marker` parameter which
    is the `Key` of the last element of the previous response.
    This gist is demonstrating the same. This script uses async/await
    feature of the Node.js so make sure you have the appropirate
    version of Node installed for this to work
*/

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function getAllObjectsFromS3Bucket(bucket) {
    let isTruncated = true;
    let marker;
    while(isTruncated) {
        let params = {Bucket: bucket};
        if (marker) params.Marker = marker;
        const response = await s3.listObjects(params).promise();
        response.Contents.forEach(item => {
            console.log(item.Key);
            // do something with the object
            // Note that this will only get you the object metadata
            // if you need the object body then you will need to 
            // call the getObject operation using the item.Key
        });
        isTruncated = response.IsTruncated
        if (isTruncated) {
            marker = response.Contents.slice(-1)[0].Key;
        }
    }
}

// Ensuite, je check dans la base de données les URLs utilisée, et je suppriment toutes celle qui ne s'y trouve pas et qui sont plus vieille que 7 jours.