# GraphQL Wrapper for Episerver B2B Commerce by Insite

## Introduction
This is an experimental project that I wished to work on for quite some time but couldn't make much time through 2020 with a busy schedule. Finally, I could make time at the end of the year. Is it complete? Not at all. It's not meant to be a complete project (I said experimental, right?). The purpose of the project is to show 'how we can take existing Insite RestApis and produce GraphQL endpoints from them'.\
\
InsiteCommerce is acquired by Episerver this year released their latest frontend called Spire built on React. Insite was going to release GraphQL APIs but, for some reason pushed it back. The GraphQL APIs will be a much better fit than RestAPIs for Spire. I hope it will be released soon. In the meantime, if someone wants to use graphQL endpoints for Insite wrapping up the RestApis is an option.\

## Implementation Approach
For implementing GraphQL endpoints, I have used graphql-yoga as the GraphQL Server. Specifically used approach to merge typedefs and resolvers using @graphql-tools/merge package. I have declared typedefs and resolvers in separate files and using the @graphql-tools/load-files package to load them and export them. This enables GraphQL Server to load typedefs and resolvers when the server starts.\
### Application Configuration
Application configuration is managed using node-config package. You will find the default.json file in the config folder. This contains configuration for default environment when no environment is mentioned NODE_ENV. There is an empty production.json that can be used to provide configuration for NODE_ENV=production. In the resolver code, you will find how the configuration is read. For example,
```javascript
const baseURL = config.get('RestApi.baseUrl');
```

### GraphQL Endpoints
I have implemented GraphQL endpoints only for Insite Catalog APIs at this time. Endpoints like products, categories, search autocomplete, etc.
#### Typedefs
The schemas for the endpoints are declared in separate files in the typedefs folder. Schemas are broken into smaller types in separate files and merged in index.ts. 
#### Resolvers
Resolvers are used to convert RestApi results from Insite to GraphQL queries. For example, product.resolvers.ts fetches data from the product by id RestApi (/api/v1/products/id) and returns the result when the product query is called. Resolvers are created to handle RestApi parameters. Insite APIs return custom properties as a dynamic object. Since GraphQL is strongly typed, I have converted Insite custom properties to an array of key/value pairs.
### Running and debugging in VS Code
For running the application in VS Code, I have used nodemon and VS Code node.js debugger. I have installed the nodemon package as dev dependencies and below lines of code in package.json to run the server in dev mode. This enables me to work on the code without restarting the application every time I change the code.
```Javascript
  "scripts": {
    "start": "ts-node index.ts",
    "dev": "nodemon --exec ts-node index.ts"
  }
```
For debugging code in VS Code, I have added launch.json with the below configuration so that I can attach the debugger to the process.
```Javascript
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Node: Nodemon",
            "processId": "${command:PickProcess}",
            "restart": true,
            "protocol": "inspector",
        },
    ]
}

```
To run the application in VS Code, start a terminal and run the command 'npm run dev'. You can now open the GraphQL Playground at http://localhost:4000.

![](graphql-wrapper.gif)

### Running the application in Heroku
Follow the below steps to deploy and run the application in Heroku
* Create an account in [Heroku](https://Heroku.com) if you do not have it already.
* Download [Heroku Cli](https://devcenter.heroku.com/articles/heroku-cli) if you do not have it already.
* Open the application in VS Code.
* Make sure you have git client installed. If not [download](https://git-scm.com/) and install. 
* Login to Heroku. It will open up the browser for you to log in.
  * heroku login
* Clone the repository to your local machine.
  * heroku git:clone -a graphql-wrapper-epib2bcommerce
* Change directory. 
  * cd graphql-wrapper-epib2bcommerce
* Deploy to Heroku.
  * git add .
  * git commit -am "commit comment"
  * git push heroku master
* Run the application.
  * heroku open

You can run GraphQL query now from the browser.
