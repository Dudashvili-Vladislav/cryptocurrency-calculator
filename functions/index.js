/* eslint-disable require-jsdoc */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();

function handleGetTokenRequest(req, res) {
  cors(req, res, () => {
    const uid = req.body.uid;
    admin
        .auth()
        .setCustomUserClaims(uid, {admin: true})
        .then(() => {
          // The new custom claims will propagate to the user's ID token the
          // next time a new one is issued.
        });
  });
}

exports.getToken = functions.https.onRequest(handleGetTokenRequest);

