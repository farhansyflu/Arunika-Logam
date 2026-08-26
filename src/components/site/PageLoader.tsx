import Image from "next/image";

export default function PageLoader() {
  return (
    <div id="page-loader" aria-hidden="true">
      <div className="loader-mark flex flex-col items-center">
        <Image
        src="/img/LOGO_HITAM.png"
        alt="LOGO ARUNIKA LOGAM"
        width={100}
        height={100}
        />
        <p className="mt-3 text-sm tracking-[0.2em] text-ink-900">ARUNIKA LOGAM</p>
        <div className="loader-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
