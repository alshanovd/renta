import { SyntheticEvent } from "react";
import Button from "./button";

export default function Confirm({
  onConfirm,
  onCancel,
  confirm,
  children,
}: {
  onConfirm: (e: SyntheticEvent) => void;
  onCancel: () => void;
  confirm: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="text-lg text-center">{children}</div>
        <div className="flex justify-center mt-4">
          <Button onClick={onCancel}>Отмена</Button>
          <Button onClick={onConfirm} className="ml-4 to-red-300">
            {confirm}
          </Button>
        </div>
      </div>
    </div>
  );
}
