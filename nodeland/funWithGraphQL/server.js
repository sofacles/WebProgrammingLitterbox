var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


// Construct a schema, using GraphQL schema language
// An argument that ends in '!' means that it it required.  Otherwise the argument can be null, and have a default value. 
var schema = buildSchema(`
  type Query {
    hello: String,
    rollThreeDice: [Int],
    rollSomeDice(numDice: Int!, numSides: Int): [Int] 
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
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

var app = express();
app.use(express.static('public'));

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