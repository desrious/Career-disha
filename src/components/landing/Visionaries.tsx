/** Visionaries — Founder profiles section using ProfileCard. */
import ProfileCard from '../ProfileCard';

export default function Visionaries() {
  const founders = [
    {
      name: "Mr. Gunjan Tewari",
      title: "Founder & Director",
      subtitle: "Chief Career Strategist & Mentor",
      image: "/GunjanSir.jpeg",
      color: "primary" as const,
      description: "With over two decades of extensive experience in the IT sector, he has dedicated the last 8 years to comprehensive IT and career counselling. He brings a strategic vision to the platform, mentoring students and professionals to navigate their career paths efficiently.",
      bullets: ["Founder & Director", "Certified AI Generalist", "IT Career Strategist & Mentor"],
      linkedinUrl: "https://in.linkedin.com/in/gunjantewari",
      email: "gunjan.t@zeopto.com" 
    },
    {
      name: "Mr. Abhijit Vyas",
      title: "Co-founder & Director",
      subtitle: "Senior Career Strategist & Technical Mentor",
      image: "/AbhijeetSir.jpeg",
      color: "secondary" as const,
      description: "With 18+ years of dedicated expertise in the IT sector and training, he has spent the last 8 years actively mentoring and counselling individuals. He ensures Careerदिशा's guidance remains firmly aligned with the dynamic, real-world needs of the industry.",
      bullets: ["Co-founder & Director", "Certified AI Generalist", "Technical Advisor & Mentor", "IT Project Manager"],
      linkedinUrl: "https://www.linkedin.com/in/abhijit-v-696640216?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "abhijit.v@zeopto.com"
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-surface overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/MeetTheVisionaries.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.8, maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)" }}></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Meet the Visionaries Behind the Platform</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">The experts ensuring you receive unmatched value and professional career guidance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder, idx) => (
             <ProfileCard 
               key={idx}
               name={founder.name} 
               title={founder.title} 
               subtitle={founder.subtitle}
               image={founder.image} 
               color={founder.color} 
               description={founder.description} 
               bullets={founder.bullets} 
               linkedinUrl={founder.linkedinUrl} 
               emailAddress={founder.email}
             />
          ))}
        </div>
      </div>

    </section>
  );
}
