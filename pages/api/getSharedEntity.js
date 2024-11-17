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
    const sharableRef = await admin.firestore().collection('sharables').doc(id).get();

    if (!sharableRef.exists) {
      return res.status(404).json({ message: 'Sharable not found' });
    }

    const sharable = sharableRef.data();

    const entityRef = sharable.target;
    const entity = await entityRef.get();

    if (!entity.exists) {
      return res.status(404).json({ message: 'Shared target not found' });
    }

    const entityData = entity.data();
    const filteredResponse = {};

    sharable.sharedFields.forEach(field => {
      if (entityData.hasOwnProperty(field)) {
        filteredResponse[field] = entityData[field];
      }
    });

    return res.status(200).json(filteredResponse);
  } catch (error) {
    console.error('Error fetching document:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
