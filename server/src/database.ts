import Datastore from "nedb";

const DB_PATH = process.env.DB_PATH || "../data";

export interface EncryptedDoc {
  _id: string;
  eventId?: string;
  content: string;
}

const factory = (dbName: string) => {
  const db = new Datastore({ filename: `${DB_PATH}/${dbName}.db` });

  db.loadDatabase(err => {
    if (err) {
      console.error(
        `Database ${dbName} failed to load with error #DeorBE`,
        err
      );
    } else {
      if (process.env.NODE_ENV === "development") {
        console.log(`Database ${dbName} loaded #ltaCHF`);
      }
    }
  });

  // @TODO Figure out why this fails typing
  // const insert = async (doc: EncryptedDoc): Promise<EncryptedDoc> => {
  const insert = async (doc: EncryptedDoc) => {
    return new Promise((resolve, reject) => {
      db.insert(doc, (err, newDoc: EncryptedDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    });
  };

  // @TODO Figure out why this fails typing
  // const findById = async (_id: string): Promise<EncryptedDoc> => {
  const findById = async (_id: string) => {
    return new Promise((resolve, reject) => {
      db.findOne({ _id }, (err, doc: EncryptedDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  };

  const findByEventId = async (eventId: string) => {
    return new Promise((resolve, reject) => {
      db.find({ eventId }, (err, docs: EncryptedDoc[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  };

  return {
    insert,
    findById,
    findByEventId: dbName === "invitees" ? findByEventId : undefined
  };
};

export const events = factory("events");
export const invites = factory("invites");
export const invitees = factory("invitees");
