
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

let dbPromise = null;

const createDatabase = async () => {
  const db = await createRxDatabase({
    name: 'artcollectivedb',
    storage: getRxStorageDexie(),
  });
  return db;
};

export const getDb = () => {
  if (!dbPromise) {
    dbPromise = createDatabase();
  }
  return dbPromise;
};
