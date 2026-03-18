import React, { useState, useEffect, useRef, useMemo } from 'react';

// Ikony SVG
const IconPalette = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.88 0 3.05-1.4 3.05-3.11 0-.84-.35-1.45-.8-1.97-.3-.33-.35-.42-.35-.87 0-1.1 1-1.94 2.05-1.94 2.1 0 3.05 1.5 3.05 3.11 0 4.66-3.14 7.78-7 7.78s-7-3.12-7-7.78c0-3.17 1.95-8.11 8-11.11 4.03-2 6.96 0 6.96 3 0 1.5-1.5 3-3 3s-3-1.5-3-3V2" /></svg>;
const IconX = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const IconFile = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12 a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconArrowRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const IconChevronLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;

// Komponent Karty Projektu
const ProjectCard = ({ project, onClick }) => (
  <div className="group cursor-pointer" onClick={onClick}>
    <div className="aspect-[3/4] overflow-hidden rounded-[24px] md:rounded-[40px] border border-white/5 bg-[#141414] relative shadow-xl transition-all duration-700">
      <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale opacity-40 md:opacity-30 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm hidden md:flex">
         <span className="px-8 py-3 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black">Szczegóły</span>
      </div>
    </div>
    <div className="mt-6 md:mt-8 group-hover:translate-x-3 transition-transform duration-500">
      <div className="flex items-center gap-3 mb-2 md:mb-3">
        <span className="w-4 md:w-5 h-[1px] bg-[#B5A995]"></span>
        <span className="text-[8px] md:text-[9px] text-[#B5A995] uppercase tracking-[0.4em] font-black">{project.category}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-serif italic opacity-80 group-hover:opacity-100 transition-opacity">{project.title}</h3>
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('home'); 
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    portfolio: useRef(null),
    experience: useRef(null),
    contact: useRef(null)
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth > 768) {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    }
  };

  useEffect(() => {
    document.body.style.overflow = (selectedProject || isMobileMenuOpen) ? 'hidden' : 'auto';
    if (view !== 'home') window.scrollTo(0, 0);
  }, [selectedProject, isMobileMenuOpen, view]);

  const allProjects = [
    { id: 1, title: "Komercyjna Produkcja AI", category: "AI Art", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200", fullDesc: "Zastosowanie zaawansowanych modeli generatywnych w kampaniach produktowych.", tools: ["Flux.1 Pro", "Photoshop"], featured: true },
    { id: 2, title: "System Identyfikacji Wizualnej", category: "Design", img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200", fullDesc: "Kreowanie spójnego języka wizualnego z wykorzystaniem AI.", tools: ["ComfyUI", "Magnific AI"], featured: true },
    { id: 3, title: "Technologia Kreatywna", category: "AI Art", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200", fullDesc: "Eksperymentalne podejście do tworzenia contentu.", tools: ["Leonardo.ai", "Firefly"], featured: true },
    { id: 4, title: "Meta Ads Campaign", category: "Social Media", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200", fullDesc: "Optymalizacja kreacji reklamowych dla sektora e-commerce.", tools: ["Photoshop", "Meta Ads"], featured: false },
    { id: 5, title: "AI Product Video", category: "Video", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200", fullDesc: "Generowanie wideo produktowego za pomocą Kling 2.5 i Runway Gen-3.", tools: ["Kling 2.5", "Premiere Pro"], featured: false },
    { id: 6, title: "3D Furniture Rendering", category: "Visualizations", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200", fullDesc: "Fotorealistyczne wizualizacje 3D produktów meblowych.", tools: ["Blender", "V-Ray"], featured: false },
    { id: 7, title: "Instagram Brand Grid", category: "Social Media", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1200", fullDesc: "Spójny layout na social media oparty o wygenerowane assety AI.", tools: ["Midjourney", "Figma"], featured: false },
  ];

  const featuredProjects = allProjects.filter(p => p.featured);
  
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return allProjects;
    return allProjects.filter(p => p.category === activeFilter);
  }, [activeFilter, allProjects]);

  const scrollTo = (sectionKey) => {
    setIsMobileMenuOpen(false);
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        sectionRefs[sectionKey]?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      sectionRefs[sectionKey]?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cvData = [
    { 
      year: "11.2024 - Obecnie", 
      role: "Grafik & AI Creator", 
      place: "Seart Group Sp. z o.o.", 
      desc: "Optymalizacja kosztów sesji zdjęciowych poprzez wizualizacje 3D, następnie wdrożenie GenAI i zbudowanie procesów dla fotorealistycznch wizualizacji AI. Skrócenie czasu sesji zdjęciowych i postprodukcji o 70% oraz wygenerowanie oszczędności produkcji materiałów na poziomie 120%.Wizualizowanie mebli drewnianych oraz akcesoriów do domu z drewna i stali" 
    },
    { 
      year: "09.2023 - 10.2024", 
      role: "Młodszy specjalista ds. e-commerce", 
      place: "Seart Group Sp. z o.o.", 
      desc: "Prowadzenie i optymalizacja kampanii Meta Ads. Projektowanie grafik WWW oraz modelowanie 3D produktów na potrzeby sprzedaży online." 
    },
    { 
      year: "10.2019 - obecnie", 
      role: "Graphic Designer", 
      place: "Freelance", 
      desc: "Dostarczanie kompleksowych rozwiązań graficznych pozwalających firmom skutecznie działać na rynku." 
    }
  ];

  const skills = [
    { cat: "Narzędzia AI", items: "Midjourney, Kling 2.5, Flux.1, ComfyUI" },
    { cat: "3D & Design", items: "Photoshop, SketchUp, V-Ray, Blender, Figma" },
    { cat: "E-commerce", items: "Meta Ads, Magento, Optymalizacja sprzedaży" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAgreed) return;
    console.log("Formularz wysłany");
  };

  // Sub-komponenty widoków
  const HomeView = () => (
    <>
      {/* HERO */}
      <section ref={sectionRefs.hero} className="relative min-h-[90vh] md:min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent z-10"></div>
          <div className="relative h-full w-full md:w-[70%] lg:w-[60%] flex justify-end">
            <img src="https://lh3.googleusercontent.com/d/19hGi-UcfMfZpYvEvhyCsPwwSbBbb15gq" alt="Hero" className="h-full w-[150%] md:w-[130%] max-w-none object-cover grayscale-[40%] opacity-60 md:opacity-90" style={{ objectPosition: 'center 20%' }} />
          </div>
        </div>
        <div className="relative z-20 max-w-7xl w-full pt-32 md:pt-20">
          <div className="flex items-center gap-6 mb-8 opacity-70">
            <span className="w-12 h-[1px] bg-[#B5A995]"></span>
            <span className="text-[10px] uppercase tracking-[0.6em] font-black">Visual Intelligence</span>
          </div>
          <h1 className="text-[12vw] md:text-[5.5vw] leading-[0.95] font-black tracking-tighter uppercase mb-16 mix-blend-lighten">
            AI DESIGN <br/> <span className="hover:text-[#B5A995] transition-colors duration-500">& wizualizacje.</span> <br/>
            <span className="font-semibold opacity-90">ESTETYKA NAPĘDZANA</span><br/>
            <span className="text-[#B5A995] font-serif italic normal-case font-light lowercase text-[10vw] md:text-[5vw]">technologią.</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6">
            <button onClick={() => sectionRefs.portfolio.current.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-[#B5A995] text-black rounded-full flex items-center justify-center gap-4 hover:bg-white transition-all">
              <span className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.2em]">Kariera / CV</span>
              <IconPalette />
            </button>
          </div>
        </div>
      </section>

      {/* O MNIE */}
      <section ref={sectionRefs.about} className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
              <h2 className="text-4xl md:text-[5vw] font-black tracking-tighter uppercase leading-[1.1]">
                O MNIE <br /> <span className="text-[#B5A995] font-serif italic normal-case font-light">Wizja.</span>
              </h2>
              <div className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] opacity-30 font-black border-l border-white/20 pl-4 md:pl-6">Profil Zawodowy</div>
            </div>
           <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              <div className="lg:col-span-7">
                <p className="text-2xl md:text-[3.2vw] font-light leading-[1.2] tracking-tighter mb-12 md:mb-16 uppercase text-[#E5E1D8]/90 font-sans">
                  Łączę artystyczną wizję <span className="text-[#B5A995] font-serif italic normal-case tracking-normal">z technologią AI</span>, by tworzyć content, który buduje realną wartość marki.
                </p>
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-[#B5A995]"></span>
                      <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-[#B5A995]">Podejście</h4>
                    </div>
                    <p className="text-gray-400 text-xs md:text-base font-light leading-relaxed">
                      Jako <strong>AI Designer</strong>, specjalizuję się w fotorealistycznej produkcji wizualnej. Tworzę materiały, które pozwalają markom skalować ich obecność online bez kompromisów w jakości.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-[#B5A995]"></span>
                      <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-[#B5A995]">Technologia</h4>
                    </div>
                    <p className="text-gray-400 text-xs md:text-base font-light leading-relaxed">
                      Moje podejście to połączenie narzędzi AI z klasycznym warsztatem graficznym oraz komercyjnym zrozumieniem celów marek.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-10 md:pt-4">
                <div className="p-8 md:p-12 bg-white/5 rounded-[30px] border border-white/5 backdrop-blur-sm">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-[0.5em] font-black text-[#B5A995] mb-2 opacity-60 italic">Praca</span>
                      <span className="text-sm md:text-lg uppercase font-light tracking-widest">Hybrydowo / Zdalnie</span>
                    </div><div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-[0.5em] font-black text-[#B5A995] mb-2 opacity-60 italic">Gdzie szukam?</span>
                      <span className="text-sm md:text-lg uppercase font-light tracking-widest">Kielce / Kraków / Cała Polska</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-[0.5em] font-black text-[#B5A995] mb-2 opacity-60 italic">Doświadczenie</span>
                      <span className="text-sm md:text-lg uppercase font-light tracking-widest">6+ Lat Design</span>
                    </div>
                     <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-[0.5em] font-black text-[#B5A995] mb-2 opacity-60 italic">Języki</span>
                      <span className="text-sm md:text-lg uppercase font-light tracking-widest">PL / EN (B2)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section ref={sectionRefs.portfolio} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#0D0D0D] border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <h2 className="text-4xl md:text-[5vw] font-black tracking-tighter uppercase">WYBRANE <br /> <span className="text-[#B5A995] font-serif italic normal-case font-light">Projekty</span></h2>
          <div className="text-[10px] uppercase tracking-[0.5em] opacity-30 font-black border-l border-white/20 pl-6">Curated Archive</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
        
        {/* Przycisk Przekierowujący - poprawione ułożenie strzałki */}
        <div className="mt-24 flex justify-center">
          <button 
            onClick={() => setView('portfolio')} 
            className="group flex items-center gap-4 transition-all duration-300"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 group-hover:text-[#B5A995] transition-colors">
              Zobacz pełne portfolio
            </span>
            <span className="text-white/40 group-hover:text-[#B5A995] group-hover:translate-x-2 transition-all duration-300">
              <IconArrowRight />
            </span>
          </button>
        </div>
      </section>

      {/* DOŚWIADCZENIE */}
      <section ref={sectionRefs.experience} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
              <div>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Doświadczenie <br /> <span className="text-[#B5A995] font-serif italic lowercase">rynkowe.</span></h2>
              </div>
              <button className="px-8 py-4 bg-white text-black rounded-full text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-3">Pobierz CV <IconFile /></button>
            </div>
            <div className="space-y-4 md:space-y-2 mb-20">
              {cvData.map((item, i) => (
                <div key={i} className="group flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 p-6 md:p-10 rounded-[24px] hover:bg-white/5 transition-all border border-transparent">
                  <span className="text-[9px] text-[#B5A995] uppercase tracking-widest font-black opacity-60 min-w-[150px]">{item.year}</span>
                  <div className="flex flex-col flex-1">
                    <span className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-1 leading-tight">{item.role}</span>
                    <span className="text-[8px] uppercase opacity-40 tracking-widest font-bold mb-4">{item.place}</span>
                    <p className="text-gray-400 font-light leading-relaxed max-w-2xl text-xs md:text-base italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>
    </>
  );

  const PortfolioView = () => (
    <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => setView('home')} className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 transition-opacity mb-12">
          <IconChevronLeft /> Powrót
        </button>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-20">Pełne <span className="text-[#B5A995] font-serif italic lowercase">Portfolio.</span></h2>
        
        <div className="flex flex-wrap gap-4 mb-16">
          {['All', 'AI Art', 'Design', 'Social Media', 'Video', 'Visualizations'].map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-6 py-2 rounded-full text-[9px] uppercase tracking-widest font-black transition-all ${activeFilter === filter ? 'bg-[#B5A995] text-black' : 'border border-white/10 hover:border-white/40'}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#0D0D0D] text-[#E5E1D8] font-sans font-light overflow-x-hidden antialiased selection:bg-[#B5A995] selection:text-black"
    >
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#B5A995] opacity-[0.05] blur-[100px] rounded-full transition-transform duration-500 ease-out" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
      </div>

      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 md:py-10 flex justify-between items-center z-[100] mix-blend-difference">
        <div className="flex flex-col group cursor-pointer" onClick={() => scrollTo('hero')}>
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none group-hover:text-[#B5A995] transition-colors">Sebastian</span>
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase opacity-60 font-bold">AI Creator</span>
        </div>
        <div className="hidden md:flex gap-10 lg:gap-16 items-center text-[12px] tracking-[0.25em] uppercase font-black">
          <button onClick={() => scrollTo('about')} className="hover:text-[#B5A995] transition-all">O mnie</button>
          <button onClick={() => setView('portfolio')} className="hover:text-[#B5A995] transition-all">Portfolio</button>
          <button onClick={() => scrollTo('experience')} className="hover:text-[#B5A995] transition-all">Kariera</button>
          <button onClick={() => scrollTo('contact')} className="bg-white text-black px-8 py-3.5 rounded-full hover:bg-[#B5A995] transition-all">Kontakt</button>
        </div>
        <button className="md:hidden flex flex-col gap-2 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className={`w-7 h-[1.5px] bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-7 h-[1.5px] bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-7 h-[1.5px] bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Menu Mobilne */}
      <div className={`fixed inset-0 z-[90] bg-black transition-transform duration-500 flex flex-col justify-center items-center gap-10 text-center px-6 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => scrollTo('about')} className="text-3xl font-black tracking-tighter uppercase">O mnie</button>
          <button onClick={() => { setView('portfolio'); setIsMobileMenuOpen(false); }} className="text-3xl font-black tracking-tighter uppercase">Portfolio</button>
          <button onClick={() => scrollTo('experience')} className="text-3xl font-black tracking-tighter uppercase">Doświadczenie</button>
          <button onClick={() => scrollTo('contact')} className="px-12 py-5 bg-white text-black rounded-full font-black tracking-widest text-sm uppercase">Kontakt</button>
      </div>

      <main className="relative z-10">
        {view === 'home' ? <HomeView /> : <PortfolioView />}
        
        {/* SEKCOJA KONTAKT (Wspólna) */}
        <section ref={sectionRefs.contact} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl md:text-[7vw] font-black uppercase tracking-tighter leading-none mb-10">Zróbmy coś <br /> <span className="text-[#B5A995] font-serif italic lowercase font-normal">razem.</span></h2>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-12 max-w-sm">Chcesz omówić ofertę B2B lub stałą współpracę? Napisz bezpośrednio.</p>
                </div>
                <div className="space-y-6">
                  <a href="mailto:sebastian.m.kaleta@gmail.com" className="text-xl md:text-2xl font-light hover:text-[#B5A995] transition-colors border-b border-white/10 pb-2 inline-block">sebastian.m.kaleta@gmail.com</a>
                </div>
              </div>
              <div className="bg-white/5 p-8 md:p-14 rounded-[30px] border border-white/5 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <input required type="text" placeholder="IMIĘ / FIRMA" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#B5A995] transition-colors uppercase text-[9px] tracking-widest" />
                  <input required type="email" placeholder="E-MAIL" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#B5A995] transition-colors uppercase text-[9px] tracking-widest" />
                  <textarea required placeholder="PROJEKT / BRIEF" rows="3" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#B5A995] transition-colors uppercase text-[9px] tracking-widest resize-none"></textarea>
                  <div className="flex items-start gap-4 cursor-pointer" onClick={() => setIsAgreed(!isAgreed)}>
                    <div className={`mt-1 min-w-[18px] h-[18px] border rounded flex items-center justify-center ${isAgreed ? 'bg-[#B5A995] border-[#B5A995]' : 'border-white/20'}`}>
                      {isAgreed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>}
                    </div>
                      <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-light select-none">
                      Wyrażam zgodę na przetwarzanie danych osobowych w celu kontaktu i obsługi zapytania. <span className="text-[#B5A995] italic">Wymagane</span>
                    </p>                  </div>
                  <button disabled={!isAgreed} type="submit" className={`w-full py-5 rounded-full uppercase font-black tracking-widest text-[10px] transition-all ${isAgreed ? 'bg-white text-black hover:bg-[#B5A995]' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}>Wyślij wiadomość</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL PROJEKTU */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl"></div>
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#111] border border-white/10 rounded-[30px] overflow-hidden flex flex-col lg:flex-row shadow-3xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-6 right-6 z-[210] p-3 bg-white/10 rounded-full text-white" onClick={() => setSelectedProject(null)}><IconX /></button>
            <div className="lg:w-3/5 h-[40vh] lg:h-auto overflow-hidden">
              <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-2/5 p-8 md:p-12 overflow-y-auto">
              <span className="text-[10px] text-[#B5A995] uppercase tracking-[0.4em] font-black mb-4 block">{selectedProject.category}</span>
              <h3 className="text-3xl md:text-5xl font-serif italic mb-6 leading-tight">{selectedProject.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light mb-8">{selectedProject.fullDesc}</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {selectedProject.tools.map((tool, t) => (
                  <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest font-bold">{tool}</span>
                ))}
              </div>
              <button onClick={() => setSelectedProject(null)} className="w-full py-5 bg-[#B5A995] text-black rounded-full text-[10px] font-black tracking-widest">Zamknij</button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-24 px-6 bg-black border-t border-white/5 text-center">
        <p className="text-[10px] text-[#B5A995] uppercase tracking-[0.8em] font-black italic">© 2026 Sebastian Kaleta</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,300;1,400&family=Inter:wght@300;400;700;900&display=swap');
        html { scroll-behavior: smooth; }
        body { background-color: #0D0D0D; color: #E5E1D8; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #B5A995; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default App;