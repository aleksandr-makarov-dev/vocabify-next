import { FC } from "react";

interface SetCardProps {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  textLang: string;
  definitionLang: string;
}

const SetCard: FC<SetCardProps> = ({ id, title, description, image }) => {
  return (
    <article>
      <a className="group" href={`/${id}`}>
        <img
          className="w-full h-56 object-center object-cover rounded-md mb-3"
          src={image ?? "placeholder.png"}
          alt="Thumbnail"
        />
        <div>
          <h5 className="text-xl font-medium text-foreground group-hover:underline">
            {title}
          </h5>
          {description && <p>{description}</p>}
        </div>
      </a>
    </article>
  );
};

export default SetCard;
