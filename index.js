const express = require("express");
const supertokens = require("supertokens-node");
const cors = require('cors')
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { middleware } =  require("supertokens-node/framework/express");

const app = express();

supertokens.init({
    framework: 'express',
    supertokens: {
        connectionURI : 'https://try.supertokens.com'
    },
    appInfo: {
    appName: 'auth-with-supertokens',
    apiDomain: 'http://localhost:3001/',
    websiteDomain: 'http://localhost:3000/',
    apiBasePath: '/api/auth',
    websiteBasePath: '/auth'
    },
    recipeList: [EmailPassword.init(), Session.init()]
})

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());

const port = 3001
app.listen(port, () => console.log(`Server running on the ${port}`))