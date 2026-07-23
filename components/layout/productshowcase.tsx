import Image from "next/image";
import productLight from "@/public/product1.png";
import productDark from "@/public/product-dark.png";

export default function ProductShowcase() {
  return (
    <section className="relative -mt-24 z-20 px-6">
      <div className="mx-auto max-w-7xl">

        {/* Browser Frame */}
        <div className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

          {/* Browser Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-100 bg-white/80 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900">

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="rounded-full bg-zinc-100 px-6 py-1 text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 font-medium">
              devhub.dev
            </div>

            <div className="w-12" />
          </div>

          <div className="relative">
            <Image
              src={productLight}
              alt="DevHub Dashboard Light"
              width={1600}
              height={900}
              className="h-auto w-full object-cover dark:hidden"
            />
            <Image
              src={productDark}
              alt="DevHub Dashboard Dark"
              width={1600}
              height={900}
              className="h-auto w-full object-cover hidden dark:block"
            />
          </div>
        </div>

      </div>
    </section>
  );
}