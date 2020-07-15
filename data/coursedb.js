const CosmosClient = require('@azure/cosmos');
const courceData = ('./coourceData.json');
const client = new CosmosClient({
    endpoint:'',
    key:''
});

const databaseId = '';
const containerId = '';

let container;

const getContainer = async ()=>{
    if(!container){
        container = await client.database(databaseId).container(containerId);
    }
    return container;
};

module.exports.queryCourses = async ()=>{
    const c = await getContainer();
    const { resources } = await c.items.readAll().fetchAll();
    return resources;
}

module.exports.createCources = async ()=>{
    const c = await getContainer();
    await Promise.all(courceData.map(course =>c.items.create(course)))
    return {itemCount: courceData.length};
};