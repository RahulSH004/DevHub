"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is DevHub free to use?",
    answer:
      "Yes, our core directory and basic features will always be free for developers. We plan to introduce premium team features in the future.",
  },
  {
    question: "How do you vet the tools submitted?",
    answer:
      "Every submission goes through a manual review process by our team of experienced developers. We check for code quality, documentation, active maintenance, and genuine utility.",
  },
  {
    question: "Can I suggest a new category?",
    answer:
      "Absolutely! We're constantly expanding our directory. You can submit category requests through our feedback form or GitHub repository.",
  },
  {
    question: "Do you offer an API?",
    answer:
      "Our public API is currently in beta. You can join the waitlist in your account settings to get early access once it's available.",
  },
];

export default function FAQ() {
  return (
    <section className="py-28 px-6 relative overflow-hidden bg-white dark:bg-background">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Two-column header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none w-fit">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Questions?{" "}
              <br className="hidden md:block" />
              <span className="text-amber-500">Answered.</span>
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-sm md:text-base leading-relaxed md:text-right">
            Everything you need to know about DevHub. Can&apos;t find the answer
            you&apos;re looking for? Reach out to our team.
          </p>
        </div>

        {/* Accordion – each item is its own visual row */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="group/faq border-0 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:shadow-md dark:hover:shadow-none data-[state=open]:bg-white dark:data-[state=open]:bg-zinc-900/70 data-[state=open]:shadow-lg data-[state=open]:shadow-amber-500/5 dark:data-[state=open]:shadow-amber-500/5 data-[state=open]:ring-1 data-[state=open]:ring-amber-500/20 dark:data-[state=open]:ring-amber-500/10"
            >
              <AccordionTrigger className="text-left hover:no-underline px-6 py-5 gap-4">
                <div className="flex items-center gap-5 flex-1">
                  {/* Numbered index */}
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-zinc-200/70 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 text-xs font-bold flex items-center justify-center transition-all duration-300 group-data-[state=open]/faq:bg-amber-500 group-data-[state=open]/faq:text-white group-data-[state=open]/faq:shadow-lg group-data-[state=open]/faq:shadow-amber-500/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-zinc-800 dark:text-zinc-200 transition-colors duration-300 group-data-[state=open]/faq:text-zinc-900 dark:group-data-[state=open]/faq:text-white">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-14 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm sm:text-[15px] border-l-2 border-amber-500/30 dark:border-amber-500/20 ml-[2px]">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

