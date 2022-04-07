import ListInputOriginal from ".";

export const ListInput = () => {
  return (
    <ListInputOriginal
      name="MyListInput"
      value={["a", "b"]}
      onChange={(x) => console.log("onChange", x)}
    />
  );
};
