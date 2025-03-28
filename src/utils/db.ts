import * as SQLite from "expo-sqlite";
import { Card } from "../models/Card";
import { useAddRowCallback } from "tinybase/ui-react";

export interface ICardFromDb extends Card {
  possessed: number;
}

export const openDatabase = () => {
  const db = SQLite.openDatabaseSync("swu-local");

  db.withTransactionSync(() => {
    db.runSync(
      `create table if not exists cards (id integer primary key not null, name text, subtitle text, number text, aspects text, types text, cost integer, _set text, hp integer, power integer, arena text, traits text, keyword text, rarity text, front_art text, back_art text, possessed integer );`,
    );
  });

  return db;
};

export function addCard(data: Card, occurrence: number) {
  useAddRowCallback("swu-local", () => ({
    ["name"]: data.name,
    ["subtitle"]: data.subtitle,
    ["number"]: data.number,
    ["aspects"]: `[${data.aspects}]`,
    ["types"]: `[${data.types}]`,
    ["cost"]: data.cost,
    ["_set"]: data.set,
    ["hp"]: data.hp,
    ["power"]: data.power,
    ["arena"]: `[${data.arena}]`,
    ["traits"]: `[${data.traits}]`,
    ["keyword"]: `[${data.keyword}]`,
    ["rarity"]: `[${data.rarity}]`,
    ["front_art"]: data.front_art,
    ["back_art"]: data.back_art,
    ["possessed"]: occurrence,
  }));
}

export const updateCard = (
  db: SQLite.SQLiteDatabase,
  cardId: number | undefined,
  possessed: number,
) => {
  if (!cardId || !possessed) return;

  db.withTransactionSync(() => {
    db.runSync(
      "update cards set possessed = ? where id = ?",
      possessed,
      cardId,
    );
  });
};

export const dropTable = (db: SQLite.SQLiteDatabase) => {
  db.withTransactionSync(() => {
    db.runSync(`drop table cards;`);
  });
};

export const getCard = async (
  db: SQLite.SQLiteDatabase,
  cardName: string | undefined,
): Promise<ICardFromDb | null> => {
  let prout: ICardFromDb | null = null;
  await db.withTransactionSync(() => {
    const test = db.getFirstSync<ICardFromDb | null>(
      `SELECT * FROM cards WHERE name="${cardName}"`,
    );
    prout = test;
  });

  return Promise.resolve(prout);
};
