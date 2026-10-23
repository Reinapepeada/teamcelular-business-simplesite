import { BsPlus } from "react-icons/bs";

export default function RepairFaqList({ items }: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-[#333336] border-y border-[#333336]">
      {items.map(({ question, answer }) => (
        <details key={question} className="group py-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 rounded-lg text-[17px] font-semibold leading-snug text-[#f5f5f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6aa6ff] sm:text-[19px] [&::-webkit-details-marker]:hidden">
            {question}
            <BsPlus aria-hidden className="h-6 w-6 shrink-0 text-[#a1a1a6] transition-transform group-open:rotate-45 motion-reduce:transition-none" />
          </summary>
          <p className="mt-3 max-w-[65ch] text-[16px] leading-relaxed text-[#a1a1a6]">{answer}</p>
        </details>
      ))}
    </div>
  );
}
