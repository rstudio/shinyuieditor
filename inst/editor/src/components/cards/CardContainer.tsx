export type CardContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  title: string;
};

export function CardContainer(props: CardContainerProps) {
  return (
    <div>
      <h1>Hi, I'm a card</h1>
      {props.children}
    </div>
  );
}
