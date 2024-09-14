"use client";
import Button from "@/components/button";
import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import NewBookingForm from "./NewBookingForm";

export default function FlatPage() {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="mt-4">
      {!showForm && (
        <div className="flex justify-center">
          <Button onClick={() => setShowForm(true)}>
            <FaCalendarCheck size={20} className="mr-2" />
            Новая бронь
          </Button>
        </div>
      )}
      {showForm && <NewBookingForm setShowForm={setShowForm} />}
    </div>
  );
}
