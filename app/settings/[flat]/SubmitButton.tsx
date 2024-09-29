import Button from "@/components/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div className="loader w-10"></div>
      ) : (
        <Button type="submit" disabled={pending}>
          {children}
        </Button>
      )}
    </>
  );
}
