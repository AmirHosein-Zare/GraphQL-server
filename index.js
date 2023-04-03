const app = require('express')();
const path = require('path');
const {loadFilesSync} = require('@graphql-tools/load-files');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const { createHandler } =  require('graphql-http/lib/use/express');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));

const root = {
    products: require('./Model/products/Product.model'),
    orders: require('./Model/orders/Order.model')
}

const schema = makeExecutableSchema({
    typeDefs: typesArray
});

app.use('/graphql', createHandler({
    schema: schema,
    rootValue: root
}));

app.listen(process.env.PORT | 4000, () => {
    console.log("Listening on port 4000 ...");
})