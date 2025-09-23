"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWaitlistClick = () => {
    setShowWaitlistForm(!showWaitlistForm);
    // Reset form state when toggling
    if (!showWaitlistForm) {
      setEmail("");
      setSubmitStatus(null);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, error } = await supabase.from("waitlist").insert([
        {
          email: email,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error inserting email:", error);
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 transition-colors duration-200 ${
        scrolled ? "border-b border-gray-100" : "border-b-0 border-gray-100"
      }`}
    >
      <nav className="max-w-8xl mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/VillageFullLogoRasterGreen.png"
              alt="Village Logo"
              width={100}
              height={40}
            />
          </Link>
          <div className="flex items-center">
            <button
              onClick={handleWaitlistClick}
              className="text-black text-lg font-light hover:scale-105 hover:text-[#6EA215] transition duration-300"
            >
              Join the Waitlist
            </button>
          </div>
        </div>

        {/* Expandable Waitlist Form - Hero Style */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showWaitlistForm
              ? "opacity-100 max-h-96 pb-6"
              : "opacity-0 max-h-0 pb-0 pointer-events-none"
          }`}
        >
          <div className="max-w-sm mx-auto space-y-4 pt-2">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your student email"
                  className="w-full px-6 py-3 border-1 text-neutral-600 border-black rounded-full text-center focus:outline-none focus:border-[#6EA215] transition duration-300 text-base"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="inline-block m-auto px-8 py-2.5 text-base font-medium text-white bg-black rounded-full shadow-sm transform transition duration-300 hover:bg-[#6ea215] hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EA215] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black"
              >
                {isSubmitting ? "Joining..." : "Join"}
              </button>
            </form>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="text-center text-[#6EA215] font-semibold">
                Welcome to the Village — stay tuned!
              </p>
            )}

            {submitStatus === "error" && (
              <p className="text-center text-red-600">
                Something went wrong. Please try again.
              </p>
            )}

            {/* Survey Button */}
            <div className="pt-2">
              <p className="text-center text-gray-600 mb-3 text-sm">
                Help shape the future:
              </p>
              <a
                href="https://tally.so/r/w22QYp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block m-auto px-6 py-2.5 text-base font-medium text-black bg-white border-1 border-black rounded-full shadow-sm transform transition duration-300 hover:bg-black hover:text-white hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EA215]"
              >
                Take Survey
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
