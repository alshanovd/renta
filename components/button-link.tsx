import Link from "next/link";
import { ButtonStyles } from "./button";

export default function ButtonLink({
  children,
  href,
  disabled,
}: {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        ButtonStyles.base +
        (disabled ? ButtonStyles.disabled : ButtonStyles.enabled)
      }
    >
      {children}
    </Link>
  );
}
