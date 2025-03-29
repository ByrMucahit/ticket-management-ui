import { Button } from "@material-tailwind/react";

interface ButtonProps {
  content: string;
  onClick: () => void;
}
export function ButtonDefault(props: ButtonProps) {
  const { content, onClick } = props;
  return <Button onClick={onClick} className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 border-2 border-solid rounded-lg w-32">{content}</Button>;
}