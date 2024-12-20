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
  
  // Handle Firestore DocumentReference
  if (obj instanceof admin.firestore.DocumentReference) {
    return {
      path: obj.path,
      id: obj.id
    };
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertTimestamps(item, seen));
  }
  
  return Object.keys(obj).reduce((result, key) => {
    result[key] = convertTimestamps(obj[key], seen);
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

    // Filter the entity data based on sharedFields
    const entityData = entity.data();
    const filteredEntityData = sharable.sharedFields.reduce((acc, field) => {
      if (field in entityData) {
        acc[field] = entityData[field];
      }
      return acc;
    }, {});

    const response = {
      ...convertTimestamps(sharable),
      target: convertTimestamps(filteredEntityData)
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching document:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
