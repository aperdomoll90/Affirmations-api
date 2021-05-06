const admin = require("firebase-admin");
const credentials = require("path/to/credentials.json");


exports.connectFb=()=>{
    if(admin.apps.length ===0){
        admin.initializeApp({
            credential: admin.credential.cert(credentials)
          });
    return admin.firestore()
    }
}