import * as SQLite from "expo-sqlite";
import { Place } from "../model/place";

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
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const insertPlace = ({ title, imageURI, address, location }) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `INSERT INTO places (title, imageURI, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
        [title, imageURI, address, location.latitude, location.longitude],
        (_, result) => {
          resolve(result);
        },
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageURI,
                {
                  address: dp.address,
                  latitude: dp.latitude,
                  longitude: dp.longitude,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const fetchPlaceDetails = (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};
