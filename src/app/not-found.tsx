import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="pt-BR">
      <body className="grain flex min-h-dvh items-center justify-center px-6 text-center">
        <div>
          <p className="brushed-text text-6xl font-semibold">404</p>
          <p className="mt-4 text-white/76">
            Página não encontrada / Page not found / Página no encontrada
          </p>
          <Link
            href="/pt"
            className="mt-8 inline-flex rounded-full border border-gold-400/35 px-6 py-3 text-sm font-semibold text-gold-100"
          >
            Engaja Mais WeCare
          </Link>
        </div>
      </body>
    </html>
  );
}
