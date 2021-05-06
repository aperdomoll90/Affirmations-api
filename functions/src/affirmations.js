const admin = require('firebase-admin')
const { connectFirestore } = require('./firestore')

exports.getAffirmations = (req, res) => {
  const db = connectFirestore()
  db.collection('affirmations')
    .get()
    .then(collection => {
      const affirmationList = collection.docs.map(doc => doc.data())
      res.send(affirmationList)
    })
    .catch((err) => res.status(500).send('Error getting affirmations: ' + err.message)
    )
}


exports.postAffirmations = (req, res) => {
  if (!req.body || !req.body.text) {
    res.status(400).send('Invalid Request')
    // this verifies than the request has a body and a text on it before even connecting to the data base
  }
  const db = connectFirestore()

  const { uid, text, displayName, photoUrl } = req.body
  const now = admin.firestore.FieldValue.serverTimestamp()
  // created a timestamp with firebase server and destructed the request body into the fields we gonna use to prevent differences on data

  const newAffirmation = {
    uid: uid,
    created_at: now,
    text: text,
    displayName: displayName,
    photoUrl: photoUrl,
  }

  db.collection('affirmations')
    .add(newAffirmation)
    .then(() => {
      this.getAffirmations(req, res) // pass response to get all affirmations
    })

    .catch((err) => res.status(500).send('Error posting affirmations'))
}
