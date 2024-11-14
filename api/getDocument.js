import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  const { id } = req.query; // Get the document ID from the query parameters

  try {
    const doc = await admin.firestore().collection('sharables').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.status(200).json(doc.data());
  } catch (error) {
    console.error('Error fetching document:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
