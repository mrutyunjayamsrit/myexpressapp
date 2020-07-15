const {
    BlobServiceClient,
    BlobSASPermission,
    generateBlobSASQueryParameters
} = require('@azure/storage-blob');

const moment = require('moment');
const {v1: uuidv1} = require('uuid');

const CONNECTION_STRING = '';
const ContainerName = 'userImages';

let _containerClient;

const getContainerClient = async ()=>{
    if(!_containerClient){
        const blobServiceClient = await BlobServiceClient.fromConnectionString(CONNECTION_STRING);
        _containerClient = blobServiceClient.getContainerClient(ContainerName);
    }
    return _containerClient;
}

const getSASQueryString = (fileId, credential)=>{
    const params = {
        containerName: ContainerName,
        blobName: fileId,
        permissions: BlobSASPermission.parse('r'),
        startsOn: new Date(),
        expiresOn: moment().add(30, 'minutes')
    };
    return generateBlobSASQueryParameters(params, credential);
}

module.exports.uploadImages = async (stream)=>{
    const containerClient = await getContainerClient();
    const fileId = uuidv1();
    const blockBlobClient = containerClient.getBlockBlobClient(fileId);
    await blockBlobClient.uploadStream(stream);
    return {
        id: fileId
    }
}

module.exports.getImageUri = async (id)=>{
    const containerClient = await getContainerClient();
    const blockBlobClient = containerClient.getBlockBlobClient(id);
    return `${blockBlobClient.url}? ${getSASQueryString(id,containerClient.credential)}`;
}