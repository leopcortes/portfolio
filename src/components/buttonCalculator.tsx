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
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-[7px] border-none p-[10px] text-center text-xl font-normal text-white decoration-transparent drop-shadow-[0px_0px_2px_#101010] transition ease-in-out hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_fundo active:translate-y-[2px] active:shadow-[0.5px_0.5px_rgb(59,59,59)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:text-2xl ${color}`}
    >
      <span className="shrink-0">{icon}</span>
      {text}
    </Link>
  );
}
