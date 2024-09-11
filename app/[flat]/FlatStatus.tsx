import React from "react";

export default function FlatStatus({ busy }: { busy: boolean }) {
  const color = busy
    ? " from-green-300 to-green-200 text-green-800"
    : " from-red-300 to-red-200 text-red-800";
  return (
    <div
      className={
        "my-2 text-center py-2 uppercase tracking-wider bg-gradient-to-b " +
        color
      }
    >
      {busy ? "Занята" : "Свободна"}
    </div>
  );
}
