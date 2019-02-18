var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

let stockHistoryRouter = require("./routes/stockHistoryService");
let randomDataRouter = require("./routes/randomRawDataService");
let streamFromFile = require('./routes/streamFromFile');
let aServiceThatLogs = require('./routes/aServiceThatLogs');
let mongoRouter = require('./routes/mongoLand');

var app = express();
app.use("/stockHistory", stockHistoryRouter);
app.use("/randomRawDataService", randomDataRouter);
app.use('/streamFromFile', streamFromFile);
app.use('/logger', aServiceThatLogs);
app.use('/mongo', mongoRouter);
app.use(express.static('public'));

// can you parameterize your query with convenience variables like 
//let diceCount = 2, sideCount = 20;

let myPhotos = [
  { id: "wedding", name: "our awesome wedding" },
  { id: "funeral", name: "our well attended funeral" },
  { id: "graduation", name: "a field in Spanaway" }];

// Construct a schema, using GraphQL schema language
// An argument that ends in '!' means that it it required.  Otherwise the argument can be null, and have a default value. 
var schema = buildSchema(`
  type Photo {
    id: ID!,
    name: String!
  }

  type Query {
   photos: [Photo],
   photo(id: ID!) : Photo
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  photos: () => {
    return myPhotos;
  },
  photo: (args) => {
    var john = myPhotos.filter(m => m.id === args.id);
    return john[0];
  },
  hello: () => {
    return 'Hello world!';
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((thing) => {
      return Math.ceil(Math.random() * 6)
    });
  },
  rollSomeDice: (args) => {
    let nSides = args.numSides || 6;
    console.log(`args.numDice is ${args.numDice}.  nSides is ${nSides}.`);
    return [...Array(args.numDice)].map((thing) => {
      var result = Math.ceil(Math.random() * nSides);
      console.log(`about to return ${result}`);
      return result;
    });
  }
};

app.post("/foo", function (req, res) {
  console.log("inside foo!");
  var payload = { 'msg': 'Hey There!' };
  res.send(JSON.stringify(payload));
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

//following https://graphql.org/graphql-js/graphql-clients/

//see https://itnext.io/hosting-multiple-apps-on-the-same-server-implement-a-reverse-proxy-with-node-a4e213497345