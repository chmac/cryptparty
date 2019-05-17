import Datastore from "nedb";

const events = new Datastore({ filename: "../data/events.db" });

events.loadDatabase(err => {
  if (err) {
    console.error("Event db failed to load with error #DeorBE", err);
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log("Event db loaded #ltaCHF");
    }
  }
});

export const insert = async ({
  _id,
  content
}: {
  _id: string;
  content: string;
}) => {
  return new Promise((resolve, reject) => {
    events.insert({ _id, content }, (err, newEvent) => {
      if (err) {
        reject(err);
      } else {
        resolve(newEvent);
      }
    });
  });
};

export const findById = async (_id: string) => {
  return new Promise((resolve, reject) => {
    events.findOne({ _id }, (err, event) => {
      if (err) {
        reject(err);
      } else {
        console.log("got event #5xWpIb", event);
        resolve(event);
      }
    });
  });
};
