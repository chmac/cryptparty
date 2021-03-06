import Datastore from "nedb";

const DB_PATH = process.env.DB_PATH || "../data";

// Put this as a constant so we can reuse the code below
const dbName = "replies";

export interface InputEncryptedDoc {
  eventId: string;
  inviteId: string;
  content: string;
}

export interface EncryptedDoc extends InputEncryptedDoc {
  _id: string;
}

const db = new Datastore({ filename: `${DB_PATH}/${dbName}.db` });

db.loadDatabase(err => {
  if (err) {
    console.error(`Database ${dbName} failed to load with error #DeorBE`, err);
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log(`Database ${dbName} loaded #ltaCHF`);
    }
  }
});

// @TODO Figure out why this fails typing
// const insert = async (doc: EncryptedDoc): Promise<EncryptedDoc> => {
export const insert = async (doc: InputEncryptedDoc) => {
  return new Promise((resolve, reject) => {
    db.update(
      {
        eventId: doc.eventId,
        inviteId: doc.inviteId
      },
      doc,
      { upsert: true },
      (err, _numUpdated: number, newDoc: EncryptedDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      }
    );
  });
};

// @TODO Figure out why this fails typing
// const findById = async (_id: string): Promise<EncryptedDoc> => {
export const findById = async (_id: string) => {
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

export const findByEventId = async (eventId: string) => {
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

export const findByInviteId = async (inviteId: string) => {
  return new Promise((resolve, reject) => {
    db.findOne({ inviteId }, (err, doc: EncryptedDoc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};
