import React from "react";
import { FaArrowRight, FaPlay, FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-base-100">

      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />

      <div className="pointer-events-none absolute top-40 -right-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-pulse-slow animation-delay-1000" />

      {/* ================= HERO ================= */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-6 lg:py-20">

          {/* ================= LEFT CONTENT ================= */}

          <div className="max-w-2xl">

            {/* Badge */}
            <div className="hero-reveal animation-delay-100 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
              <span className="animate-book-bounce">📖</span>
              Read Anytime, Anywhere
            </div>

            {/* Heading */}
            <h1 className="hero-reveal animation-delay-200 mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-base-content sm:text-5xl lg:text-6xl xl:text-7xl">

              Discover Your Next{" "}

              <span className="relative inline-block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">

                Great Book

                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 h-1 w-full origin-left scale-x-0 rounded-full bg-linear-to-r from-primary to-secondary animate-underline" />

              </span>
            </h1>

            {/* Description */}
            <p className="hero-reveal animation-delay-300 mt-6 max-w-xl text-base leading-8 text-base-content/65 sm:text-lg">
              Explore a world of knowledge, imagination and endless
              possibilities. From bestsellers to hidden gems, find the
              perfect book for your journey.
            </p>

            {/* Buttons */}
            <div className="hero-reveal animation-delay-400 mt-8 flex flex-col gap-3 sm:flex-row">

              <button className="group btn btn-primary btn-lg rounded-xl px-7 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">

                Explore Books

                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

              </button>

              <button className="group btn btn-outline btn-lg rounded-xl border-primary/20 px-7 text-primary transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white">

                <FaPlay className="text-sm transition-transform duration-300 group-hover:scale-110" />

                Watch Intro

              </button>

            </div>

            {/* Trust */}
            <div className="hero-reveal animation-delay-500 mt-9 flex flex-wrap items-center gap-5">

              {/* Avatars */}
              <div className="flex -space-x-3">

                {[12, 32, 47, 49].map((img, index) => (
                  <div
                    key={img}
                    className="avatar hero-avatar"
                    style={{
                      animationDelay: `${600 + index * 100}ms`,
                    }}
                  >
                    <div className="w-11 rounded-full ring-2 ring-base-100 transition-transform duration-300 hover:z-10 hover:-translate-y-1 hover:scale-110">
                      <img
                        src={`https://i.pravatar.cc/100?img=${img}`}
                        alt="Reader"
                      />
                    </div>
                  </div>
                ))}

              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center gap-1 text-warning">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="animate-star-pop"
                      style={{
                        animationDelay: `${700 + star * 80}ms`,
                      }}
                    />
                  ))}

                  <span className="ml-1 text-sm font-semibold text-base-content">
                    4.8/5
                  </span>

                </div>

                <p className="mt-1 text-sm text-base-content/60">
                  Trusted by 10,000+ readers
                </p>
              </div>

            </div>
          </div>

          {/* ================= RIGHT VISUAL ================= */}

          <div className="relative flex justify-center lg:justify-end">

            {/* Main glow */}
            <div className="absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96 animate-glow" />

            <div className="relative w-full max-w-xl">

              {/* Floating top card */}
              <div className="floating-card absolute -right-1 top-0 z-20 rounded-2xl border border-base-300 bg-base-100 px-4 py-3 shadow-xl sm:right-8">

                <p className="text-xs text-base-content/50">
                  Start your journey
                </p>

                <p className="font-bold text-primary">
                  Read • Learn • Grow
                </p>

              </div>

              {/* Main illustration */}
              <div className="hero-visual relative rounded-[3rem] bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 p-8 sm:p-12">

                {/* Floating book */}
                <div className="floating-book absolute left-3 top-16 z-20 h-20 w-16 rotate-[-18deg] rounded-lg bg-primary shadow-xl sm:left-8">

                  <div className="absolute inset-y-2 left-2 w-1 rounded-full bg-white/30" />

                  <div className="absolute inset-y-2 right-2 w-[2px] rounded-full bg-white/10" />

                </div>

                {/* Decorative circles */}
                <div className="absolute right-10 top-20 h-4 w-4 rounded-full bg-secondary/40 animate-float-small" />

                <div className="absolute left-16 bottom-28 h-3 w-3 rounded-full bg-primary/40 animate-float-small animation-delay-700" />

                {/* Books */}
                <div className="relative flex flex-col items-center">

                  <div className="mt-12 space-y-1.5 sm:mt-8">

                    <Book
                      width="w-56 sm:w-72"
                      color="bg-secondary"
                      rotate="-rotate-2"
                      text="Fiction"
                    />

                    <Book
                      width="w-60 sm:w-76"
                      color="bg-primary"
                      rotate=""
                      text="Technology"
                    />

                    <Book
                      width="w-56 sm:w-72"
                      color="bg-info"
                      rotate="rotate-1"
                      text="Science"
                    />

                    <Book
                      width="w-60 sm:w-76"
                      color="bg-warning"
                      rotate="-rotate-1"
                      text="Business"
                    />

                    <Book
                      width="w-56 sm:w-72"
                      color="bg-primary/80"
                      rotate=""
                      text="Self Development"
                    />

                  </div>

                  {/* Reader */}
                  <div className="relative z-10 -mt-6 animate-reader-float">

                    <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary/15 sm:h-60 sm:w-60">

                      <div className="reader-icon text-[100px] sm:text-[140px]">
                        👩‍💻
                      </div>

                    </div>

                    {/* Book */}
                    <div className="absolute bottom-9 left-1/2 h-10 w-28 -translate-x-1/2 rotate-[-8deg] rounded-md bg-primary shadow-xl sm:w-36" />

                  </div>

                </div>

                {/* Ebook card */}
                <div className="floating-card absolute bottom-5 right-1 z-20 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl sm:right-0 sm:p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl">
                      📚
                    </div>

                    <div>

                      <p className="font-bold text-base-content">
                        Thousands of E-books
                      </p>

                      <p className="text-xs text-base-content/50">
                        At your fingertips
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BENEFITS ================= */}

      <div className="border-t border-base-300 bg-base-200">

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              icon="⚡"
              title="Instant Access"
              description="Get your favorite books in seconds."
            />

            <Feature
              icon="🛡️"
              title="Secure & Safe"
              description="Your data and privacy are always protected."
            />

            <Feature
              icon="💻"
              title="Read Everywhere"
              description="Enjoy books on any device, anytime."
            />

            <Feature
              icon="♥"
              title="Affordable Prices"
              description="Get more value with flexible plans."
            />

          </div>

        </div>

      </div>

    </section>
  );
};


/* ================= BOOK COMPONENT ================= */

const Book = ({ width, color, rotate, text }) => {
  return (
    <div
      className={`${width} ${color} ${rotate} book-item flex h-12 items-center rounded-lg px-5 font-semibold text-white shadow-lg`}
    >
      {text}
    </div>
  );
};


/* ================= FEATURE COMPONENT ================= */

const Feature = ({ icon, title, description }) => {
  return (
    <div className="group flex items-start gap-4">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-xl shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-base-content">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-base-content/60">
          {description}
        </p>
      </div>

    </div>
  );
};

export default Hero;