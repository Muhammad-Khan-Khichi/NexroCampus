import { useState, useEffect, useRef } from "react";

const AuthPage = () => {
  // ─── State Management ───
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // ─── Refs ───
  const formRef = useRef(null);

  // ─── Toggle Auth Mode ───
  const toggleAuthMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLoginMode((prev) => !prev);
      setErrors({ name: "", email: "", password: "" });
      setIsAnimating(false);
    }, 200);
  };

  // ─── Handle Input Change ───
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error on type
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  // ─── Validation ───
  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!isLoginMode && !formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ─── Handle Submit ───
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = isLoginMode
        ? { email: formData.email, password: formData.password, rememberMe }
        : { ...formData };
      console.log("Form submitted:", payload);
      // Add your API call here
    }
  };

  // ─── Dynamic Content Based on Mode ───
  const headerContent = isLoginMode
    ? { title: "Welcome back", subtitle: "Please enter your details to sign in." }
    : { title: "Create an account", subtitle: "Start your journey with Nexro Campus." };

  const toggleContent = isLoginMode
    ? { text: "Don't have an account?", btn: "Sign up" }
    : { text: "Already have an account?", btn: "Log in" };

  const submitLabel = isLoginMode ? "Sign in" : "Create account";

  return (
    <main className="flex min-h-screen w-full bg-background overflow-hidden">
      {/* ═══════════════════════════════════════════════════ */}
      {/* Left Side: Brand & Value Prop (Desktop Only)         */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between p-margin-desktop relative bg-surface-container-low border-r border-outline-variant">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        {/* Logo */}
        <div className="z-10">
          <div className="flex items-center gap-3">
            <img
              alt="Nexro Campus Logo"
              className="w-10 h-10 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH819scqMmZuYyGMKHudKnuyDrrjM5dtSmlbK985atkyQ1KBTg09IQtQYFYVCFWY6ANeuNpQ-Hj1LidYHXGWdlfDIzJI9DKrBH4KvfXfp7QbFhzgSSLoubufVkUThKB05MUpSHYydPGRUghWiCDg8YGCPxn3pYgqSYBtzxAK5bryk199e-NjIdN2utLixotca6b819mXyi1a961_IZwpZqW-axd6c83t29DeW03B0iFGMcHFYhSgf6"
            />
            <span className="font-headline-md text-headline-md font-extrabold text-primary">
              Nexro Campus
            </span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="z-10 space-y-stack-md max-w-lg">
          <h1 className="font-display-lg text-display-lg text-on-surface">
            Accelerate your <span className="text-primary">academic mastery</span> with AI.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Personalized study plans, smart flashcards, and a dedicated AI tutor—all in one place to
            help you excel in your university journey.
          </p>
        </div>

        {/* Illustration Card */}
        <div className="z-10">
          <div className="bg-white p-stack-lg rounded-xl auth-card-shadow border border-outline-variant/30 flex flex-col gap-stack-md">
            <div className="flex items-center gap-stack-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
                AI Processing Lesson...
              </span>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-3/4 bg-surface-container-high rounded-full" />
              <div className="h-2 w-1/2 bg-surface-container-high rounded-full opacity-60" />
              <div className="h-2 w-full bg-surface-container-high rounded-full opacity-40" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-secondary">
                Join 5,000+ Students
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 pt-stack-lg border-t border-outline-variant">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 Nexro Campus AI. All rights reserved.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Right Side: Auth Form                               */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-margin-mobile md:p-margin-desktop bg-surface relative">
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-stack-md left-stack-md flex items-center gap-2">
          <img
            alt="Nexro Campus Logo"
            className="w-8 h-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH819scqMmZuYyGMKHudKnuyDrrjM5dtSmlbK985atkyQ1KBTg09IQtQYFYVCFWY6ANeuNpQ-Hj1LidYHXGWdlfDIzJI9DKrBH4KvfXfp7QbFhzgSSLoubufVkUThKB05MUpSHYydPGRUghWiCDg8YGCPxn3pYgqSYBtzxAK5bryk199e-NjIdN2utLixotca6b819mXyi1a961_IZwpZqW-axd6c83t29DeW03B0iFGMcHFYhSgf6"
          />
          <span className="font-headline-md text-headline-md font-bold text-primary">
            Nexro Campus
          </span>
        </div>

        <div className="w-full max-w-[440px] space-y-stack-lg">
          {/* Header */}
          <div
            className={`text-center lg:text-left transition-all duration-300 ${
              isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <h2 className="font-headline-lg text-headline-lg lg:text-headline-lg text-on-surface mb-2">
              {headerContent.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {headerContent.subtitle}
            </p>
          </div>

          <div className="space-y-stack-md">
            {/* Social Login */}
            <button
              type="button"
              className="w-full h-11 flex items-center justify-center gap-3 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-stack-sm">
              <div className="flex-grow border-t border-outline-variant" />
              <span className="flex-shrink mx-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                or email
              </span>
              <div className="flex-grow border-t border-outline-variant" />
            </div>

            {/* Auth Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`space-y-stack-md transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {/* Name Field (Sign Up Only) */}
              {!isLoginMode && (
                <div>
                  <label
                    className="block font-label-md text-label-md text-on-surface mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className={`w-full h-11 px-4 rounded-lg border outline-none transition-all form-input-focus font-body-md text-body-md ${
                      errors.name
                        ? "border-error"
                        : "border-outline-variant focus:border-primary"
                    }`}
                    id="name"
                    placeholder="Enter your full name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <p className="mt-1 font-body-sm text-body-sm text-error">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`w-full h-11 px-4 rounded-lg border outline-none transition-all form-input-focus font-body-md text-body-md ${
                    errors.email
                      ? "border-error"
                      : "border-outline-variant focus:border-primary"
                  }`}
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="mt-1 font-body-sm text-body-sm text-error">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="block font-label-md text-label-md text-on-surface mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className={`w-full h-11 px-4 pr-12 rounded-lg border outline-none transition-all form-input-focus font-body-md text-body-md ${
                      errors.password
                        ? "border-error"
                        : "border-outline-variant focus:border-primary"
                    }`}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 font-body-sm text-body-sm text-error">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password (Login Only) */}
              {isLoginMode && (
                <div className="flex items-center justify-between py-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative w-4 h-4">
                      <input
                        className="peer absolute opacity-0 cursor-pointer w-4 h-4 z-10"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <div className="w-4 h-4 bg-white border border-outline-variant rounded peer-checked:bg-primary peer-checked:border-primary transition-all" />
                      <span className="material-symbols-outlined text-white text-[14px] absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                        check
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      Remember me
                    </span>
                  </label>
                  <a
                    className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                <span>{submitLabel}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          </div>

          {/* Toggle Auth Mode */}
          <div className="pt-stack-md text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              <span>{toggleContent.text}</span>
              <button
                className="font-label-md text-label-md text-primary hover:underline ml-1"
                onClick={toggleAuthMode}
              >
                {toggleContent.btn}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthPage;