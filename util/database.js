import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageURI TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL NOT NULL, 
      longitude REAL NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
