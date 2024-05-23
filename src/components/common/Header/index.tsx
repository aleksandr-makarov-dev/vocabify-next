import { FC } from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string | null;
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Header;
