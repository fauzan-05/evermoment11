"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type FormErrors = {
  email?: string;
  password?: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextErrors.email = "Enter your admin email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must contain at least 6 characters.";
    }

    setErrors(nextErrors);
    setNotice("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      router.push("/admin");
    }, 700);
  };

  return (
    <main className="fixed inset-0 z-[200] overflow-y-auto bg-[#090909] text-white">
      <div className="grid min-h-full lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden min-h-screen overflow-hidden border-r border-white/10 lg:flex">
          <Image
            src="/evermoment-eyewear-hero.png"
            alt="Ever Moment premium eyewear"
            fill
            priority
            sizes="55vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(7,7,7,0.96)_8%,rgba(7,7,7,0.68)_54%,rgba(7,7,7,0.25)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(217,160,91,0.19),transparent_34%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-16">
            <Link href="/" className="w-fit" aria-label="Go to Ever Moment home">
              <Image
                src="/everlogo/everlogo.png"
                alt="Ever Moment"
                width={178}
                height={58}
                className="h-auto w-44 object-contain"
              />
            </Link>

            <div className="max-w-xl pb-8">
              <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-[#D9A05B]/30 bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E5B477] backdrop-blur-md">
                <Sparkles size={14} />
                Private administration
              </div>

              <h1 className="max-w-lg text-5xl font-medium leading-[1.08] xl:text-6xl">
                Curate every detail with confidence.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/60">
                Manage appointments, services, and gallery collections from one
                focused workspace designed for the Ever Moment team.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/45">
              <ShieldCheck size={17} className="text-[#D9A05B]" />
              Authorized team members only
            </div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-10 lg:px-14">
          <div className="absolute -right-32 top-[-7rem] h-80 w-80 rounded-full bg-[#D9A05B]/10 blur-[100px]" />
          <div className="absolute -bottom-36 -left-28 h-80 w-80 rounded-full bg-[#D9A05B]/5 blur-[100px]" />

          <div className="relative z-10 w-full max-w-md">
            <div className="mb-10 flex items-center justify-between lg:hidden">
              <Link href="/" aria-label="Go to Ever Moment home">
                <Image
                  src="/everlogo/everlogo.png"
                  alt="Ever Moment"
                  width={145}
                  height={48}
                  className="h-auto w-36 object-contain"
                />
              </Link>
              <span className="rounded-full border border-[#D9A05B]/25 bg-[#D9A05B]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#D9A05B]">
                Admin
              </span>
            </div>

            <div className="mb-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#D9A05B]">
                Welcome back
              </p>
              <h2 className="text-4xl font-medium sm:text-5xl">
                Sign in to continue
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/45">
                Enter your administrator credentials to access the dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2.5 block text-xs font-semibold text-white/70"
                >
                  Email address
                </label>
                <div
                  className={`group flex items-center rounded-2xl border bg-[#111111] px-4 transition ${
                    errors.email
                      ? "border-red-400/70"
                      : "border-white/10 focus-within:border-[#D9A05B]/70 focus-within:ring-4 focus-within:ring-[#D9A05B]/10"
                  }`}
                >
                  <Mail
                    size={18}
                    className="shrink-0 text-white/30 transition group-focus-within:text-[#D9A05B]"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrors((current) => ({ ...current, email: undefined }));
                    }}
                    placeholder="admin@evermoment.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="h-14 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/20"
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <label
                    htmlFor="admin-password"
                    className="text-xs font-semibold text-white/70"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setNotice(
                        "Password recovery will be available after the authentication API is connected."
                      )
                    }
                    className="text-xs font-semibold text-[#D9A05B] transition hover:text-[#F1C38B]"
                  >
                    Forgot password?
                  </button>
                </div>
                <div
                  className={`group flex items-center rounded-2xl border bg-[#111111] px-4 transition ${
                    errors.password
                      ? "border-red-400/70"
                      : "border-white/10 focus-within:border-[#D9A05B]/70 focus-within:ring-4 focus-within:ring-[#D9A05B]/10"
                  }`}
                >
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-white/30 transition group-focus-within:text-[#D9A05B]"
                  />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        password: undefined,
                      }));
                    }}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className="h-14 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="rounded-lg p-2 text-white/30 transition hover:bg-white/5 hover:text-white/70"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-2 text-xs text-red-300">
                    {errors.password}
                  </p>
                )}
              </div>

              <label className="flex w-fit cursor-pointer items-center gap-3 text-xs text-white/55">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="peer sr-only"
                />
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-[#111111] transition after:h-2 after:w-1 after:rotate-45 after:border-b-2 after:border-r-2 after:border-black after:opacity-0 peer-checked:border-[#D9A05B] peer-checked:bg-[#D9A05B] peer-checked:after:opacity-100 peer-focus-visible:ring-4 peer-focus-visible:ring-[#D9A05B]/20" />
                Keep me signed in on this device
              </label>

              {notice && (
                <p
                  role="status"
                  className="rounded-xl border border-[#D9A05B]/20 bg-[#D9A05B]/10 px-4 py-3 text-xs leading-5 text-[#E8BC86]"
                >
                  {notice}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#D9A05B] px-5 text-sm font-bold text-[#111111] shadow-[0_15px_45px_rgba(217,160,91,0.15)] transition hover:bg-[#E7B576] focus:outline-none focus:ring-4 focus:ring-[#D9A05B]/25 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in securely
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 flex items-center justify-center gap-2 text-center text-[11px] text-white/30">
              <ShieldCheck size={14} />
              Protected administrative access
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
