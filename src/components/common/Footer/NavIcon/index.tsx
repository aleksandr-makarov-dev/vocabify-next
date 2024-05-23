import { FC } from "react";

interface NavIconProps {
  icon: any;
  link: string;
}

const NavIcon: FC<NavIconProps> = ({ icon, link }) => {
  return <a href={link}>{icon}</a>;
};

export default NavIcon;
