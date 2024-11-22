import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


const convertTimestamps = (obj, seen = new WeakSet()) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return obj;  // Prevent circular references
  seen.add(obj);
  
  if (obj instanceof admin.firestore.Timestamp) {
    return obj.toDate();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertTimestamps(item, seen));
  }
  
  return Object.keys(obj).reduce((result, key) => {
    // Skip converting the actual Firestore reference
    if (obj[key] && typeof obj[key].get === 'function') {
      result[key] = obj[key];
    } else {
      result[key] = convertTimestamps(obj[key], seen);
    }
    return result;
  }, {});
};


export default async function handler(req, res) {
  const { id } = req.query;

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

    const response = {
      ...convertTimestamps(sharable),
      target: convertTimestamps(entity.data())
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching document:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
