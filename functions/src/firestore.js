const admin = require("firebase-admin");
const credentials = require("../credentials.json");


exports.connectFb=()=>{
    if(admin.apps.length ===0){
        admin.initializeApp({
            credential: admin.credential.cert(credentials)
          });
    return admin.firestore()
    }
}
// checking at admin and seeing if it has any apps connected and if it does not we initialize it