import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * KONFIGURACJA FORMSPREE
 * 1. Zaloguj się na formspree.io
 * 2. Utwórz nowy formularz
 * 3. Wklej poniżej swój ID (znajdziesz go w zakładce "Settings" na Formspree)
 */
const FORMSPREE_ID = 'mpqynnjo'; // Zmień to na swój ID z Formspree
const CV_URL = '/docs/CV_Sebastian_Kaleta.pdf'; 

// Ikony SVG
const IconPalette = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.88 0 3.05-1.4 3.05-3.11 0-.84-.35-1.45-.8-1.97-.3-.33-.35-.42-.35-.87 0-1.1 1-1.94 2.05-1.94 2.1 0 3.05 1.5 3.05 3.11 0 4.66-3.14 7.78-7 7.78s-7-3.12-7-7.78c0-3.17 1.95-8.11 8-11.11 4.03-2 6.96 0 6.96 3 0 1.5-1.5 3-3 3s-3-1.5-3-3V2" /></svg>;
const IconX = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const IconFile = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12 a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconArrowRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const IconChevronLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconCheck = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconInstagram = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconLinkedin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const IconBehance = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12c2.1 0 3-1 3-2.5S11.1 7 9 7H5v5h4zM9 18c2.4 0 3.5-1.2 3.5-3s-1.1-3-3.5-3H5v6h4zM15 10h5v1h-5zM15 12c0 2.5 5 2.5 5 0"></path></svg>;
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;


const ProjectCard = ({ project, onClick }) => (
  <div className="group cursor-pointer" onClick={onClick}>
    <div className="aspect-[3/4] overflow-hidden rounded-[24px] md:rounded-[40px] border border-white/5 bg-[#141414] relative shadow-xl transition-all duration-700">
      <img 
        src={project.images[0]} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale opacity-40 md:opacity-30 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm hidden md:flex">
         <span className="px-8 py-3 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black">Szczegóły projektu</span>
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
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    portfolio: useRef(null),
    experience: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/svg+xml';
    favicon.rel = 'shortcut icon';
    // Ustawienie stylowej litery "S" jako ikony
    favicon.href = `data:image/svg+xml,
      <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
        <rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%230D0D0D%22/>
        <text y=%22.9em%22 font-size=%2280%22 font-family=%22serif%22 fill=%22%23B5A995%22 font-style=%22italic%22 x=%2250%%22 text-anchor=%22middle%22>S</text>
      </svg>`.replace(/\s+/g, ' ');
    document.getElementsByTagName('head')[0].appendChild(favicon);
  }, []);

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

  const PrivacyContent = () => (
    <div className="space-y-6 text-gray-300 font-light text-sm md:text-base leading-relaxed">
      <h4 className="text-[#B5A995] font-black uppercase tracking-widest text-xs">1. Administrator Danych</h4>
      <p>Administratorem danych osobowych jest Sebastian Kaleta. Kontakt: sebastian.m.kaleta@gmail.com</p>
      
      <h4 className="text-[#B5A995] font-black uppercase tracking-widest text-xs">2. Cel Przetwarzania</h4>
      <p>Dane wpisane w formularzu kontaktowym (imię, adres e-mail) przetwarzane są wyłącznie w celu udzielenia odpowiedzi na przesłaną wiadomość i nawiązania kontaktu biznesowego.</p>
      
      <h4 className="text-[#B5A995] font-black uppercase tracking-widest text-xs">3. Bezpieczeństwo</h4>
      <p>Dane są przesyłane bezpiecznym połączeniem i nie są udostępniane podmiotom trzecim w celach marketingowych. Masz prawo do wglądu w swoje dane oraz żądania ich usunięcia w dowolnym momencie.</p>
    </div>
  );

 // DANE PROJEKTÓW Z TABLICĄ ZDJĘĆ
 const allProjects = [
  { 
    id: 1, 
    title: "Komercyjna Produkcja AI", 
    category: "AI Art", 
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200"
    ], 
    fullDesc: "Zastosowanie zaawansowanych modeli generatywnych w kampaniach produktowych. Projekt obejmował stworzenie serii fotorealistycznych obrazów produktów w abstrakcyjnych środowiskach.", 
    tools: ["Flux.1 Pro", "Photoshop", "Magnific AI"], 
    featured: true 
  },
  { 
    id: 2, 
    title: "System Identyfikacji Wizualnej", 
    category: "Design", 
    images: [
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200"
    ], 
    fullDesc: "Kreowanie spójnego języka wizualnego z wykorzystaniem AI dla nowoczesnego startupu technologicznego.", 
    tools: ["ComfyUI", "Adobe Illustrator"], 
    featured: true 
  },
  { 
    id: 3, 
    title: "Technologia Kreatywna", 
    category: "AI Art", 
    images: [
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200"
    ], 
    fullDesc: "Eksperymentalne podejście do tworzenia contentu, łączące generowanie proceduralne z modelami dyfuzyjnymi.", 
    tools: ["Leonardo.ai", "Firefly"], 
    featured: true 
  },
  { 
      id: 4, 
      title: "Meta Ads Campaign", 
      category: "Social Media", 
      images: ["https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200"], 
      fullDesc: "Optymalizacja kreacji reklamowych dla sektora e-commerce.", 
      tools: ["Photoshop", "Meta Ads"], 
      featured: false 
  },
  { 
      id: 5, 
      title: "AI Product Video", 
      category: "Video", 
      images: ["https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200"], 
      fullDesc: "Generowanie wideo produktowego za pomocą Kling 2.5 i Runway Gen-3.", 
      tools: ["Kling 2.5", "Premiere Pro"], 
      featured: false 
  },
  { 
      id: 6, 
      title: "3D Furniture Rendering", 
      category: "Visualizations", 
      images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200"], 
      fullDesc: "Fotorealistyczne wizualizacje 3D produktów meblowych.", 
      tools: ["Blender", "V-Ray"], 
      featured: false 
  },
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
      desc: "Rozwijając się jako wizualizator, wprowadziłem wewnętrzne wizualizacje 3D, co przyniosło 20% oszczędności i zwiększyło ilość pozyskiwania nowych materiałów, jednocześnie skracając czas realizacji. Wizualizacje nie były już zlecane na zewnątrz. Kolejne lata pozwoliły na usprawnienie procesu wizualizowania. Wprowadzenie technologi AI przyczyniło się do ogromnego skoku jakości, oraz skruceniu czasu pozyskiwania nowych materiałów. Optymalizacja pozwoliła na przyspieszenie  o 150% i obniżenie kosztów o 70% przy zwiększonej jakości materiałów. Opracowanie nowych wizualizacji kolekcji meblowych znacząco wpłyneło na sprzedaż, szzególnie mniej popularnych produktów aż o 50%." 
    },
    { 
      year: "09.2023 - 10.2024", 
      role: "Młodszy specjalista ds. e-commerce", 
      place: "Seart Group Sp. z o.o.", 
      desc: "Prowadzenie i optymalizacja kampanii Meta Ads. Projektowanie grafik na strony WWW. Wprowadzenie modelowania 3D pozwoliło na wyjście z ofertą dla współpracy z Architektami i Projektantami wnętrz" 
    },
    { 
      year: "10.2019 - obecnie", 
      role: "Graphic Designer", 
      place: "Freelance", 
      desc: "Współpraca z lokalnymi firmami w zakresie przygotowania grafik na Social Media, strony internetowe oraz projektów do druku - plakaty, etykiety" 
    },
    { 
      year: "03.2016 - 08.2023", 
      role: "Projektant CAD & Operator plazmy ", 
      place: "P.H.U.P. Dziekan", 
      desc: "Projektowanie maszyn rolniczych i dokumentacji technicznej. Obróbka zdjęć. Obsługa wykrawarki plazmowej oraz kierowanie zespołem na dziale projektowania i wykrawania plazmowego. Na wczesnym etapie wykrywałem błędy projektowe, dzięki czemu koszta produkcji prototypów zmniejszyły się o 30%. Usprawnienia wprowadzone na dziale oraz wczesne wykrywanie problemów działania maszyn, obniżyły zużycie części wymiennych wykrawarek o 35% co przełożyło się na oszczędności 10% podczas zakupu części wymiennych. " 
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreed) return;
    setIsSubmitting(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        setIsAgreed(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

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
            <span className="text-[10px] uppercase tracking-[0.6em] font-black">Działam kreatywnie z AI</span>
          </div>
          <h1 className="text-[12vw] md:text-[5.5vw] leading-[0.95] font-black tracking-tighter uppercase mb-16 mix-blend-lighten">
            Kreacje AI <br/> <span className="hover:text-[#B5A995] transition-colors duration-500">& wizualizacje.</span> <br/>
            <span className="font-semibold opacity-90">ESTETYKA NAPĘDZANA</span><br/>
            <span className="text-[#B5A995] font-serif italic normal-case font-light lowercase text-[10vw] md:text-[5vw]">technologią.</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6">
            <button onClick={() => sectionRefs.portfolio.current.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-[#B5A995] text-black rounded-full flex items-center justify-center gap-4 hover:bg-white transition-all">
              <span className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.2em]">Kariera / CV</span>
              <IconFile />
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
                      Jako <strong>AI Creator</strong>, specjalizuję się w fotorealistycznej produkcji wizualnej. Tworzę materiały, które pozwalają markom skalować ich obecność online. Potrzebujesz materiałów promocyjnych wysokiej jakości w ekspresowym tmepie? Świetnie trafiłeś!
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
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-[0.5em] font-black text-[#B5A995] mb-2 opacity-60 italic">Lokalizacja</span>
                      <span className="text-sm md:text-lg uppercase font-light tracking-widest">Kielce / Kraków / Remote</span>
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
        <div className="mt-24 flex justify-center">
          <button onClick={() => setView('portfolio')} className="group flex items-center gap-4 transition-all duration-300">
            <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 group-hover:text-[#B5A995] transition-colors">Zobacz pełne portfolio</span>
            <span className="text-white/40 group-hover:text-[#B5A995] group-hover:translate-x-2 transition-all duration-300"><IconArrowRight /></span>
          </button>
        </div>
      </section>

      {/* DOŚWIADCZENIE */}
      <section ref={sectionRefs.experience} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Doświadczenie <br /> <span className="text-[#B5A995] font-serif italic lowercase">rynkowe.</span></h2>
              <a href={CV_URL} download className="px-8 py-4 bg-white text-black rounded-full text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-3 hover:bg-[#B5A995] transition-all">
                Pobierz CV <IconFile />
              </a>
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
        <div className="flex flex-col group cursor-pointer" onClick={() => {setView('home'); window.scrollTo(0,0); setMenuOpen(false);}}>
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none group-hover:text-[#B5A995] transition-colors">Sebastian</span>
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase opacity-60 font-bold">AI Creator</span>
        </div>
        
        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-white">
          {menuOpen ? <IconX /> : <IconMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 lg:gap-16 items-center text-[11px] tracking-[0.25em] uppercase font-black">
          <button onClick={() => scrollTo('about')} className="hover:text-[#B5A995] transition-all">O mnie</button>
          <button onClick={() => setView('portfolio')} className="hover:text-[#B5A995] transition-all">Portfolio</button>
          <button onClick={() => scrollTo('experience')} className="hover:text-[#B5A995] transition-all">Kariera</button>
          <button onClick={() => scrollTo('contact')} className="bg-white text-black px-8 py-3.5 rounded-full hover:bg-[#B5A995] transition-all">Kontakt</button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
           <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8"><IconX /></button>
           <button onClick={() => scrollTo('about')} className="text-3xl font-black uppercase tracking-tighter">O mnie</button>
           <button onClick={() => {setView('portfolio'); setMenuOpen(false);}} className="text-3xl font-black uppercase tracking-tighter">Portfolio</button>
           <button onClick={() => scrollTo('experience')} className="text-3xl font-black uppercase tracking-tighter">Kariera</button>
           <button onClick={() => scrollTo('contact')} className="text-3xl font-black uppercase tracking-tighter text-[#B5A995]">Kontakt</button>
        </div>
      </nav>
      {/* --------------koniec zmian------------- */}

      <main className="relative z-10">
        {view === 'home' ? <HomeView /> : <PortfolioView />}
        
        {/* SEKCJA KONTAKT */}
        <section ref={sectionRefs.contact} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-5xl md:text-[7vw] font-black uppercase tracking-tighter leading-none mb-10">
                  Zróbmy coś <br /> <span className="text-[#B5A995] font-serif italic lowercase font-normal">razem.</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-light mb-12 max-w-sm">Chcesz omówić ofertę B2B lub stałą współpracę? Napisz bezpośrednio.</p>
              </div>
              <div className="space-y-6">
                <a href="mailto:sebastian.m.kaleta@gmail.com" className="text-xl md:text-2xl font-light hover:text-[#B5A995] transition-colors border-b border-white/10 pb-2 inline-block mb-8">
                  sebastian.m.kaleta@gmail.com
                </a>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/sebastian.aicreator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full hover:bg-[#B5A995] hover:text-black transition-all group">
                    <IconInstagram />
                    <span className="text-[10px] uppercase font-black tracking-widest">Instagram</span>
                  </a>
                  <a href="https://linkedin.com/in/sebastiankaleta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full hover:bg-[#B5A995] hover:text-black transition-all group">
                    <IconLinkedin />
                    <span className="text-[10px] uppercase font-black tracking-widest">LinkedIn</span>
                  </a>
                  <a href="https://behance.net/sebastiankaleta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full hover:bg-[#B5A995] hover:text-black transition-all group">
                    <IconBehance />
                    <span className="text-[10px] uppercase font-black tracking-widest">Behance</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-8 md:p-12 rounded-[40px] border border-white/5 backdrop-blur-xl relative overflow-hidden">
              {submitStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-[#B5A995] rounded-full flex items-center justify-center mb-6 text-black"><IconCheck /></div>
                  <h3 className="text-2xl font-black uppercase mb-2">Wysłano!</h3>
                  <p className="text-gray-400">Odezwę się w ciągu 24 godzin na Twojego maila.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 contact-form">
                  <div className="space-y-2 group">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#B5A995] transition-all">Imię / Firma</label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Podaj swoje dane..."
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#B5A995] transition-colors text-lg font-light custom-input"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#B5A995] transition-all">E-mail</label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="Twoja poczta..."
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#B5A995] transition-colors text-lg font-light custom-input"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#B5A995] transition-all">Wiadomość</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      placeholder="W czym mogę pomóc?"
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#B5A995] transition-colors text-lg font-light resize-none custom-input"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center cursor-pointer transition-all ${isAgreed ? 'bg-[#B5A995] border-[#B5A995]' : 'border-white/20'}`}
                      onClick={() => setIsAgreed(!isAgreed)}
                    >
                      {isAgreed && <IconCheck />}
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest font-bold select-none">
                      Akceptuję <button type="button" onClick={() => setShowPrivacy(true)} className="text-[#B5A995] hover:underline underline-offset-4">politykę prywatności</button>
                    </p>
                  </div>

                  <button
                    disabled={!isAgreed || isSubmitting}
                    type="submit"
                    className={`w-full py-6 rounded-full text-[11px] uppercase tracking-[0.3em] font-black transition-all flex items-center justify-center gap-4 ${isAgreed && !isSubmitting ? 'bg-white text-black hover:bg-[#B5A995]' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}
                  >
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                  </button>
                  {submitStatus === 'error' && <p className="text-red-400 text-[10px] text-center uppercase tracking-widest">Błąd wysyłki. Spróbuj ponownie.</p>}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* MODAL POLITYKI PRYWATNOŚCI */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8" onClick={() => setShowPrivacy(false)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
          <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-[30px] p-8 md:p-12 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-6 right-6 p-2 hover:text-[#B5A995] transition-colors" onClick={() => setShowPrivacy(false)}>
              <IconX />
            </button>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8">Polityka <span className="text-[#B5A995] font-serif italic lowercase">prywatności</span></h3>
            <PrivacyContent />
            <button 
              onClick={() => setShowPrivacy(false)}
              className="mt-10 w-full py-4 border border-[#B5A995] text-[#B5A995] rounded-full text-[10px] font-black tracking-widest hover:bg-[#B5A995] hover:text-black transition-all"
            >
              ROZUMIEM
            </button>
          </div>
        </div>
      )}

      {/* MODAL ZE SZCZEGÓŁAMI PROJEKTU I GALERIĄ ZDJĘĆ */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedProject(null)}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl"></div>
          {/* --------------początek zmian---------- */}
          <div className="relative w-full max-w-7xl h-[90vh] bg-[#111] border border-white/10 rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col lg:flex-row shadow-3xl animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-6 right-6 z-[210] p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-[#B5A995] hover:text-black transition-all" onClick={() => setSelectedProject(null)}><IconX /></button>
            
            {/* Lewa strona: Galeria zdjęć (właściwe przewijanie) */}
            <div className="lg:w-3/5 h-1/2 lg:h-full overflow-y-auto bg-black scrollbar-hide flex flex-col">
              <div className="flex flex-col">
                {selectedProject.images.map((imgUrl, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <img 
                      src={imgUrl} 
                      alt={`${selectedProject.title} view ${index + 1}`} 
                      className="w-full h-auto object-cover block"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Prawa strona: Informacje */}
            <div className="lg:w-2/5 h-1/2 lg:h-full p-8 md:p-14 overflow-y-auto bg-[#111] text-left">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-[#B5A995]"></span>
                <span className="text-[10px] text-[#B5A995] uppercase tracking-[0.4em] font-black">{selectedProject.category}</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight text-left">{selectedProject.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light mb-10 text-sm md:text-base border-l-2 border-white/5 pl-6 text-left">{selectedProject.fullDesc}</p>
              
              <div className="mb-12">
                <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 mb-4">Narzędzia i Stack</h4>
                <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool, t) => (
                    <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest font-bold">{tool}</span>
                    ))}
                </div>
              </div>

              {/* Naprawiony przycisk powrotu */}
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(null);
                }} 
                className="w-full py-5 border border-white/10 hover:border-[#B5A995] hover:text-[#B5A995] rounded-full text-[10px] font-black tracking-widest transition-all"
              >
                Wróć do przeglądania
              </button>
            </div>
          </div>
          {/* --------------koniec zmian------------- */}
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

        .custom-input:-webkit-autofill,
        .custom-input:-webkit-autofill:hover, 
        .custom-input:-webkit-autofill:focus, 
        .custom-input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #141414 inset !important;
          -webkit-text-fill-color: #E5E1D8 !important;
          transition: background-color 5000s ease-in-out 0s;
          background-color: transparent !important;
        }
        .custom-input { background-color: transparent !important; color: #E5E1D8 !important; }
        .custom-input:autofill { background-color: #141414 !important; color: #E5E1D8 !important; }
      `}} />
    </div>
  );
};

export default App;
