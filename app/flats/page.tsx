"use client";
import { FlatsContext } from "@/components/flats-context";
import Link from "next/link";
import { useContext } from "react";
import FlatItem from "./FlatItem";

export default function Flats() {
  const flats = useContext(FlatsContext);
  return (
    <>
      <pre className="text-black">{JSON.stringify(flats, null, 2)}</pre>
      {flats.map((flat) => (
        <FlatItem key={flat.id} flat={flat} />
      ))}
    </>
  );
}
