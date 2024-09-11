export default function FlatBookingInput({
  onChange,
  name,
  type,
  value,
  label,
  disabled,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  value?: string;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <>
      <label htmlFor="days" className="mr-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        className="border py-2 px-4 w-full"
        value={value}
        disabled={disabled}
      />
    </>
  );
}
