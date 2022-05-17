const express = require("express");
const supertokens = require("supertokens-node");
const cors = require('cors')
const Session = require("supertokens-node/recipe/session");
const { middleware } =  require("supertokens-node/framework/express");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { Google, Github, Facebook, Apple } = ThirdPartyEmailPassword;
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
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                Google({
                    clientSecret: "TODO: GOOGLE_CLIENT_SECRET",
                    clientId: "TODO: GOOGLE_CLIENT_ID"
                }),
                Github({
                    clientSecret: "TODO: GITHUB_CLIENT_SECRET",
                    clientId: "TODO: GITHUB_CLIENT_ID"
                }),
                Facebook({
                    clientSecret: "TODO: FACEBOOK_CLIENT_SECRET",
                    clientId: "TODO: FACEBOOK_CLIENT_ID"
                }),
                // Apple({
                //     clientSecret: {
                //         teamId: "APPLE_TEAM_ID",
                //         privateKey: "APPLE_PRIVATE_KEY",
                //         keyId: "KEY_ID"
                //     },
                //     clientId: "APPLE_CLIENT_ID"
                // })
            ]
        }),
        Session.init()
    ]
})

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());

const port = 3001
app.listen(port, () => console.log(`Server running on the ${port}`))