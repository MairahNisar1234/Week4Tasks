"use client";
import { useEffect } from "react";
import { useFilterStore } from "../store/useFilterStore";

export default function HydrationHandler() {
  useEffect(() => {
    useFilterStore.persist.rehydrate();
  }, []);

  return null;
}