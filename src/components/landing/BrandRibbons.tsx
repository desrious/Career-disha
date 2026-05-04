/** BrandRibbons — Criss-cross marquee ribbon section with Careerदिशा branding. */
export default function BrandRibbons() {
  return (
    <section className="relative h-[200px] md:h-[250px] bg-transparent overflow-hidden flex flex-col justify-center my-4 z-20">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute w-[150vw] left-[-25vw] bg-white h-[4.5rem] md:h-[5.5rem] flex items-center border-y-[3px] border-black rotate-[6deg] z-10 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <div className="flex whitespace-nowrap animate-marquee items-center h-full">
            {[...Array(12)].map((_, i) => (
              <div className="flex items-center space-x-3 mx-4 shrink-0 h-full" key={i}>
                <img src="/CareerDishaLogo.png" alt="Logo" className="h-7 md:h-9 w-auto object-contain" />
                <span className="text-2xl md:text-[2rem] font-bold text-black tracking-tight font-sans mt-1">Careerदिशा</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute w-[150vw] left-[-25vw] bg-white h-[4.5rem] md:h-[5.5rem] flex items-center border-y-[3px] border-black rotate-[-6deg] z-20 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
          <div className="flex whitespace-nowrap animate-marquee-reverse items-center h-full">
            {[...Array(12)].map((_, i) => (
              <div className="flex items-center space-x-3 mx-4 shrink-0 h-full" key={i}>
                <img src="/CareerDishaLogo.png" alt="Logo" className="h-7 md:h-9 w-auto object-contain" />
                <span className="text-2xl md:text-[2rem] font-bold text-black tracking-tight font-sans mt-1">Careerदिशा</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
