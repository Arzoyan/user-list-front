"use client";
import { useRouter } from "next/navigation";;

export const useRouting = () => {
  const router = useRouter();

  const redirectToPage = (destination) => {
    router.push(destination);
  };

  return { redirectToPage };
};
