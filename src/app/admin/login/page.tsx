import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import Image from "next/image";

export const metadata: Metadata = { title: "Login Admin" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4] px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center place-items-center">
          <Image
          src="/img/LOGO_HITAM.png"
          alt="Logo ARUNIKA"
          width={50}
          height={50}
          />
          <h1 className="mt-3 text-2xl text-ink-900">Arunika Logam</h1>
          <p className="text-sm text-muted">Masuk ke panel admin</p>
        </div>

        <div className="card p-7">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
