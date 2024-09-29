import ButtonLink from "@/components/button-link";
import SettingsFlatItem from "@/components/settings-flat-item";
import { GetFlats } from "@/tools/get-flats";

export default async function SettingsPage() {
  const flats = await GetFlats();
  return (
    <div className="text-slate-800 mx-4">
      <h1 className="text-xl mb-4 text-center font-bold">Настройки</h1>
      <div className="flex justify-center text-slate-900 my-4">
        <ButtonLink href="/settings/0">Новая квартира</ButtonLink>
      </div>
      {flats.map((flat) => (
        <SettingsFlatItem flat={flat} key={flat.id} />
      ))}
    </div>
  );
}
