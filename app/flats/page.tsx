"use client";
import { FlatsContext } from "@/components/flats-context";
import { useContext } from "react";
import FlatItem from "./FlatItem";

export default function Flats() {
  const flats = useContext(FlatsContext);
  return (
    <>
      {flats.map((flat) => (
        <FlatItem key={flat.id} flat={flat} />
      ))}
    </>
  );
}
