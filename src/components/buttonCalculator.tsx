import Link from "next/link";
import { type ReactNode } from "react";

type ButtonCalculatorProps = {
  link: string;
  text: string;
  icon: ReactNode;
  color?: string;
};

export default function ButtonCalculator({
  link,
  text,
  icon,
  color = "bg-[#606582] hover:bg-[#474a5c] active:bg-[#474a5c]",
}: ButtonCalculatorProps) {
  return (
    <Link
      href={link}
      className={`m-[9px] flex w-3/4 cursor-pointer items-center justify-center gap-1.5 self-center justify-self-center rounded-[7px] border-none p-[10px] text-2xl font-normal text-white decoration-transparent drop-shadow-[0px_0px_2px_#101010] hover:-translate-y-[1px] active:translate-y-[2px] active:shadow-[0.5px_0.5px_rgb(59,59,59)] ${color}`}
    >
      {icon}
      {text}
    </Link>
  );
}
