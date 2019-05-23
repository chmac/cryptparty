import Datastore from "nedb";

interface EncryptedDoc {
  _id: string;
  content: string;
}

const factory = (dbName: string) => {
  const db = new Datastore({ filename: `../data/${dbName}.db` });

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
    const { _id, content } = doc;
    return new Promise((resolve, reject) => {
      db.insert({ _id, content }, (err, newEvent: EncryptedDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve(newEvent);
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

  return {
    insert,
    findById
  };
};

export const events = factory("events");
export const invites = factory("invites");
export const invitees = factory("invitees");
