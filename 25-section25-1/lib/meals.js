import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db = sql("meals.db");
export async function getMeals() {
  // new Promise((resolve) => setTimeout(resolve, 7000));
  // throw new Error("vvvh");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extention = meal.image.type.split("/").pop();
  const fileName = `${meal.slug}.${extention}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferdImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferdImage), (error) => {
    if (error) {
      throw new Error("save image failed");
    }
  });
  meal.image = `/images/${fileName}`;
  db.prepare(
    `
    INSERT INTO meals 
    (title,summary,instructions,creator,creator_email,image,slug)
    VALUES(
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )`
  ).run(meal);
}