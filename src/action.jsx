"use server";
import { auth, signIn, signOut, update } from "@/auth";

export const signInWithCredentials = async (formData) => {
  await signIn("credentials", {
    email: formData.email || "",
    password: formData.password || "",
    redirectTo: "/",
  });
};

export const signInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};
