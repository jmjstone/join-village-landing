"use client";
import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const Hero = () => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

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
    <div className="pt-1 sm:pt-5 md:pt-5 lg:pt-5 xl:pt-5 flex flex-col justify-items-center justify-around m-auto">
      <Image
        className="flex w-50 pb-3 sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[300px] flex-1 hover:scale-102 transition duration-400 m-auto animate-fade-in-up animation-delay-200"
        src="/FeedMockup-2.png"
        alt="Village Main Page"
        height={1000}
        width={300}
      />
      <div className="flex flex-1 m-auto text-center flex-col animate-fade-in-up animation-delay-400">
        <div className="flex flex-col gap-10">
          <div className="pt-0 sm:pt-6 md:pt-6 lg:pt-6 xl:pt-6 text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl text-black max-w-300 font-bold animate-fade-in-up animation-delay-600">
            Find community. Build your brand. Get paid.
          </div>
        </div>

        {/* Modified Button - now triggers form expansion */}
        <button
          onClick={handleWaitlistClick}
          className="mt-5 sm:mt-5 md:mt-5 lg:mt-13 xl:mt-13 animate-fade-in-up animation-delay-1000 inline-block m-auto px-16 sm:px-16 md:px-16 lg:px-16 xl:px-16 py-4 sm:py-6.5 md:py-6.5 lg:py-6.5 xl:py-6.5 text-lg sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-medium text-white bg-black rounded-full shadow-sm transform transition duration-300 hover:bg-[#6ea215] hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EA215]"
        >
          Join the Waitlist
        </button>

        {/* Expandable Waitlist Form */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showWaitlistForm
              ? "opacity-100 mt-2 sm:mt-6 md:mt-6 lg:mt-6 xl:mt-6"
              : "opacity-0 mt-0 h-0 pointer-events-none"
          }`}
        >
          <div className="max-w-sm mx-auto space-y-4">
            <form
              onSubmit={handleEmailSubmit}
              className="space-y-2 sm:space-y-4 md:space-y-4 lg:space-y-4 xl:space-y-4 "
            >
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your student email"
                  className="px-5 sm:px-6 md:px-6 lg:px-6 xl:px-6 py-3 sm:py-4 md:py-4 lg:py-4 xl:py-4 border-1 border-black rounded-full text-center font-normal text-neutral-600 focus:outline-none focus:border-[#6EA215] transition duration-300 text-lg"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="inline-block m-auto px-8 sm:px-12 md:px-12 lg:px-12 xl:px-12 py-2 sm:py-2 md:py-2 lg:py-2 xl:py-2 text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg font-medium text-white bg-[#6ea215] rounded-full shadow-sm transform transition duration-300 hover:bg-[#6ea215] hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EA215] disabled:bg-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="text-center text-[#6EA215] font-semibold">
                Welcome to the Village. Stay tuned.
              </p>
            )}

            {submitStatus === "error" && (
              <p className="text-center text-red-600">
                Something went wrong. Please try again.
              </p>
            )}

            {/* Survey Button */}
            <div className="pt-2">
              <p className="text-center text-neutral-600 mb-3 text-sm">
                Help shape the future:
              </p>
              <a
                href="https://tally.so/r/w22QYp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block m-auto px-6 sm:px-10 md:px-10 lg:px-10 xl:px-10 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg font-medium text-black bg-white border-1 border-black rounded-full shadow-sm transform transition duration-300 hover:bg-black hover:text-white hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EA215]"
              >
                Take Our Survey
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
