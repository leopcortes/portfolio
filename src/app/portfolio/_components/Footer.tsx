import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-borda_azul_1">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-2 px-5 py-6 sm:flex-row sm:px-8">
        <Link
          href="/"
          className="font-abril_fatface text-[1.75rem] tracking-[1px] text-texto_principal transition duration-300 sm:text-[2rem]"
        >
          <span className="text-verde_principal">L</span>PC.
        </Link>

        <p className="text-center text-[0.85rem] text-texto_secundario sm:text-right">
          &copy; Copyright {new Date().getFullYear()}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
