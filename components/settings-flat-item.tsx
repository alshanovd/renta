"use client";
import { FrontendFlat } from "@/models/flat";
import Link from "next/link";
import Button from "./button";

export default function SettingsFlatItem({ flat }: { flat: FrontendFlat }) {
  return (
    <div
      className="border my-2 flex justify-between items-center text-base pl-2 py-1 mx-1"
      key={flat.id}
    >
      <span>{flat.title}</span>
      <div className="flex">
        <Link href={`/settings/${flat.id}`}>
          <Button className="ml-4" onClick={() => 0}>
            Настроить
          </Button>
        </Link>
      </div>
    </div>
  );
}
