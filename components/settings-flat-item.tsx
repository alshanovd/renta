import { Flat } from "@prisma/client";
import ButtonLink from "./button-link";

export default function SettingsFlatItem({ flat }: { flat: Flat }) {
  return (
    <div
      className="border my-2 flex justify-between items-center text-base pl-2 py-1 mx-1"
      key={flat.id}
    >
      <span>{flat.title}</span>
      <div className="flex">
        <ButtonLink href={`/settings/${flat.id}`}>Настроить</ButtonLink>
      </div>
    </div>
  );
}
