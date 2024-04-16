"use client";
import { TypewriterEffectSmooth } from "@/components/animations/typewriter-effect";
export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Encuentra",
    },
    {
      text: "todos",
    },
    {
      text: "tus",
    },
    {
      text: "accesorios en",
    },
    {
      text: "un solo lugar.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Tu mejor opcion en tecnología
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Nuestra Tienda
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Newsletter
        </button>
      </div>
    </div>
  );
}
