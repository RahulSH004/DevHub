import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is DevHub free to use?",
    answer: "Yes, our core directory and basic features will always be free for developers. We plan to introduce premium team features in the future.",
  },
  {
    question: "How do you vet the tools submitted?",
    answer: "Every submission goes through a manual review process by our team of experienced developers. We check for code quality, documentation, active maintenance, and genuine utility.",
  },
  {
    question: "Can I suggest a new category?",
    answer: "Absolutely! We're constantly expanding our directory. You can submit category requests through our feedback form or GitHub repository.",
  },
  {
    question: "Do you offer an API?",
    answer: "Our public API is currently in beta. You can join the waitlist in your account settings to get early access once it's available.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            Frequently Asked <span className="text-amber-500 drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">Questions</span>
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-2 sm:p-4 shadow-md dark:shadow-none backdrop-blur-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 px-2 sm:px-4">
                <AccordionTrigger className="text-left text-zinc-800 dark:text-zinc-300 hover:text-amber-500 hover:no-underline py-5 text-base font-medium transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm sm:text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
