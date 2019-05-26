import Datastore from "nedb";

// Put this as a constant so we can reuse the code below
const dbName = "replies";

export interface InputEncryptedDoc {
  eventId: string;
  inviteeId: string;
  content: string;
}

export interface EncryptedDoc extends InputEncryptedDoc {
  _id: string;
}

const db = new Datastore({ filename: `../../data/${dbName}.db` });

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

export const findByInviteeId = async (inviteeId: string) => {
  return new Promise((resolve, reject) => {
    db.findOne({ inviteeId }, (err, doc: EncryptedDoc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};
