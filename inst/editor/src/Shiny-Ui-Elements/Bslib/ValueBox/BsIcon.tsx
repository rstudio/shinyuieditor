import React from "react";

import * as icons from "react-bootstrap-icons";
interface IconProps extends icons.IconProps {
  // Cannot use "name" as it is a valid SVG attribute
  // "iconName", "filename", "icon" will do it instead
  icon_name: string;
}

function clean_icon_name(icon_name: string): string {
  // Convert from dash case to camel case
  // e.g. "arrow-left" to "ArrowLeft"
  // e.g. "1-circle" to "Icon1Circle"

  // Split the string into an array of words
  const words = icon_name.split("-");
  // Capitalize the first letter of each word
  const capitalized_words = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together
  let camel_case = capitalized_words.join("");

  // Check if the first character is a number and if it is, prefix with the word "icon"
  if (/[0-9]/.test(camel_case.charAt(0))) {
    camel_case = "Icon" + camel_case;
  }

  return camel_case;
}

export const BsIcon = ({ icon_name, ...props }: IconProps) => {
  let icon_name_clean = "icon_name";
  try {
    icon_name_clean = clean_icon_name(icon_name);
  } catch (error) {
    return (
      <span>
        Failed to find <strong>{icon_name}</strong>
      </span>
    );
  }

  if (!(icon_name_clean in icons)) {
    return (
      <span>
        Failed to find <strong>{icon_name}</strong>
      </span>
    );
  }
  const BootstrapIcon = icons[icon_name_clean as keyof typeof icons];

  return <BootstrapIcon {...props} />;
};
