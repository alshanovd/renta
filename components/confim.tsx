import { SyntheticEvent } from "react";
import Button from "./button";

export default function Confirm({
  onConfirm,
  onCancel,
  confirm,
  cancel,
  children,
  loading,
}: {
  onConfirm: (e: SyntheticEvent) => void;
  onCancel?: () => void;
  confirm: string;
  cancel?: string;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="text-lg text-center">{children}</div>
        {loading ? (
          <div className="flex justify-center mt-4">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            {cancel && (
              <Button className="from-white to-slate-100" onClick={onCancel}>
                {cancel ?? "Отмена"}
              </Button>
            )}
            {confirm && (
              <Button onClick={onConfirm} className="ml-4 to-red-300">
                {confirm}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
