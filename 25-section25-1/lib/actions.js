"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
function isInvaildInput(text) {
  return !text || text.trim() == "";
}
export async function shareMeal(prev, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
  };
  if (
    isInvaildInput(meal.creator) ||
    isInvaildInput(meal.title) ||
    isInvaildInput(meal.creator_email) ||
    isInvaildInput(meal.summary) ||
    isInvaildInput(meal.instructions) ||
    !meal.creator_email.includes("@")
  ) {
    return { message: "invalid input" };
  }
  console.log(meal);
  saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
