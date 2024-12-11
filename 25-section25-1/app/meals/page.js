import { Suspense } from "react";
import MealsGrid from "@/components/meals/Meals-grid";
import classes from "./page.module.css";
import Link from "next/link";
import { getMeals } from "@/lib/meals";

export const metadata = {
  title: "All meals",
  description: "Delicious meals, shared by a food-loving community.",
};
async function MealsSection() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
export default async function Meals() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Dlicious meals , created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          choose your favorite recipe and cook it yourself. it is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">share your recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>fetching data...</p>}
        >
          <MealsSection />
        </Suspense>
      </main>
    </>
  );
}
