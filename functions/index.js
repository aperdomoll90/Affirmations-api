const functions = require("firebase-functions");
const express =require('express')
const cors =require('cors')
const {getAffirmations,postAffirmations } = require('./src/affirmations')

const app = express()
app.use(cors())

app.get('./affirmations', getAffirmations)
app.post('./affirmations', postAffirmations)



exports.app=functions.https.onRequest(app)