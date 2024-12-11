"use client";
import { useFormStatus } from "react-dom";

export default function MealFormSubmiting() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "submiting" : "share meal"}</button>
  );
}
