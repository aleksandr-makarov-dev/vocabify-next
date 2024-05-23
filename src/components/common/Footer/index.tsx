import { FC } from "react";
import NavIcon from "./NavIcon";

interface FooterProps {
  text: string;
  navIcons: Array<{ icon: any; link: string }>;
}

const Footer: FC<FooterProps> = ({ text, navIcons }) => {
  return (
    <footer className="bg-muted flex justify-center">
      <div className="max-w-screen-xl flex items-center w-full p-5">
        <div className="w-full">
          <p className="text-muted-foreground">{text}</p>
        </div>
        <div>
          {navIcons.map((item) => (
            <NavIcon key={item.link} {...item} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
