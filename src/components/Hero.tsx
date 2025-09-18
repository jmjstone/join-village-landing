import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="pt-1 sm:pt-5 md:pt-5 lg:pt-5 xl:pt-5 flex flex-col justify-items-center justify-around m-auto">
      <Image
        className="flex w-60 sm:w-auto md:w-auto lg:w-auto xl:w-auto flex-1 hover:scale-102 transition duration-400 m-auto animate-fade-in-up animation-delay-200"
        src="/VillageMockupHomeCropped.png"
        alt="Village Main Page"
        height={1000}
        width={300}
      />
      <div className="flex flex-1 m-auto text-center flex-col animate-fade-in-up animation-delay-400">
        <div className="flex flex-col gap-10">
          <div className="pt-3 sm:pt-7 md:pt-7 lg:pt-7 xl:pt-7 text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl text-black max-w-300 font-bold animate-fade-in-up animation-delay-600">
            Find community. Build your brand. Get paid.
          </div>
        </div>
        <Button
          className="mt-5 sm:mt-13 md:mt-13 lg:mt-13 xl:mt-13 animate-fade-in-up animation-delay-1000"
          href="https://tally.so/r/w22QYp"
        >
          Join the Mission
        </Button>
      </div>
    </div>
  );
};

export default Hero;
