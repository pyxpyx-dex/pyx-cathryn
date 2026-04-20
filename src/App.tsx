/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, MapPin, BookOpen, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from './lib/utils';

interface Product {
  id: string;
  name: { cn: string; en: string };
  description: { cn: string; en: string };
  notes: { cn: string; en: string };
  price: string;
  enName: string;
  image: string;
  fallback: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'oud',
    name: { cn: '乌木沉烟', en: 'Sacred Oud' },
    enName: 'SACRED OUD & SMOKE',
    description: {
      cn: '深邃乌木与焚香凝成的暗夜残影，\n在寂静中，听见时光流过的回响。',
      en: 'Deep oud and incense form dark shadows of the night,\nhearing the echoes of time in silence.'
    },
    notes: { cn: '沉香 / 焚香 / 广藿香', en: 'Oud / Incense / Patchouli' },
    price: '¥1,580',
    image: 'https://res.cloudinary.com/dv3erhizb/image/upload/q_auto,f_auto,c_limit,w_1000/v1776577141/3ff3a7e1be1b5a86d28be62d7b1e6582_sxiczc.jpg',
    fallback: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'rose',
    name: { cn: '玫瑰炽焰', en: 'Velvet Rose' },
    enName: 'VELVET ROSE BLAZE',
    description: { 
      cn: '午夜玫瑰在烈焰中浴火重塑，\n热烈如火，却又如丝绒般冷冽。',
      en: 'Midnight rose reshaped in flames,\npassionate as fire, yet cold as velvet.'
    },
    notes: { cn: '大马士革玫瑰 / 粉红胡椒 / 琥珀', en: 'Damask Rose / Pink Pepper / Amber' },
    price: '¥1,420',
    image: 'https://res.cloudinary.com/dv3erhizb/image/upload/q_auto,f_auto,c_limit,w_1000/v1776577104/b753082e02938723b2949ad628acd132_mnkp1f.jpg',
    fallback: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'lime',
    name: { cn: '海风青柠', en: 'Cypriot Lime' },
    enName: 'CYPRIOT SEA & LIME',
    description: {
      cn: '地中海的浪潮轻叩青柠庄园，\n自由的灵魂，在咸涩海风中苏醒。',
      en: 'Mediterranean waves knock on the lime estate,\nfree souls awaken in the salty sea breeze.'
    },
    notes: { cn: '青柠 / 迷迭香 / 海盐', en: 'Lime / Rosemary / Sea Salt' },
    price: '¥1,180',
    image: 'https://res.cloudinary.com/dv3erhizb/image/upload/q_auto,f_auto,c_limit,w_1000/v1776576941/a2b6b1030e0ed2b65ced5f5ec067abdc_pi4qzz.jpg',
    fallback: 'https://images.unsplash.com/photo-1615485240384-5544469796e6?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'paper',
    name: { cn: '纸间序章', en: 'Paper Epilogue' },
    enName: 'EPILOGUE OF PAPER',
    description: {
      cn: '陈墨、雪松与旧书卷的余温，\n温柔雅致，记录每一段绵延的念想。',
      en: 'Warmth of ink, cedar and old book scrolls,\ngentle and elegant, recording every lingering thought.'
    },
    notes: { cn: '雪松 / 龙涎香 / 香根草', en: 'Cedar / Ambergris / Vetiver' },
    price: '¥1,250',
    image: 'https://res.cloudinary.com/dv3erhizb/image/upload/q_auto,f_auto,c_limit,w_1000/v1776577131/d6cc01042be805208ae94e92a31ecaf5_jq22u2.jpg',
    fallback: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200'
  }
];

type Language = 'cn' | 'en';

export default function App() {
  const [activeId, setActiveId] = useState<string>('rose');
  const [lang, setLang] = useState<Language>('cn');
  const [heroIndex, setHeroIndex] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const heroImages = [
    "https://res.cloudinary.com/dv3erhizb/image/upload/v1776581313/image_4693ebd_exj9uh.png",
    "https://res.cloudinary.com/dv3erhizb/image/upload/v1776613827/30cb54cd782d361f9f5141933caa4b38_ldhe7a.jpg"
  ];

  // Auto-switch for Hero Section
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const t = {
    collections: { cn: '香氛系列', en: 'Collections' },
    gifts: { cn: '礼品定制', en: 'Gifting' },
    stories: { cn: '品牌故事', en: 'Our Story' },
    boutiques: { cn: '专柜查询', en: 'Boutiques' },
    book: { cn: '立即预约闻香', en: 'Book a Scenting' },
    curated: { cn: '精品追求', en: 'CURATED EXCELLENCE' },
    ourStoryBegins: { cn: '我们的故事从这里开始', en: 'Our story begins here' },
    explore: { cn: '探索系列', en: 'Explore Collections' },
    brandPhilosophy: { cn: '品牌理念', en: 'PHILOSOPHY' },
    comingSoon: { cn: '敬请期待', en: 'COMING SOON' },
    comingSoonDesc: { cn: '由于品牌升级中，此功能暂未开放。', en: 'This feature is currently unavailable due to brand upgrading.' },
    close: { cn: '关闭', en: 'CLOSE' },
    storyTitle: { cn: '用气味续写记忆的篇章', en: 'Writing Chapters of Memory with Scent' },
    storyText: {
      cn: '“序章”不仅仅是一个品牌，它是一种对时间的致敬。我们深入全球最隐秘的角落，寻觅那些被时光遗忘的稀有天然香材。从乌木的幽暗到玫瑰的炽烈，每一滴香精都承载着一段不曾言说的心事。',
      en: '"Prologue" is more than a brand; it is a tribute to time. We venture into the most secluded corners of the world to find rare natural ingredients forgotten by time. From the darkness of Oud to the blaze of Rose, every drop of essence carries an unspoken story.'
    },
    epilogue: { cn: '未完的序章', en: 'UNFINISHED CHAPTER' },
    epilogueText: {
      cn: '这只是记忆的开端，每一场感官的邂逅，都是独一无二的私人叙事。',
      en: 'This is just the beginning of memory; every sensory encounter is a unique personal narrative.'
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-brand-light font-sans selection:bg-brand-crimson marble-bg">
      {/* Geometric Header */}
      <header className="h-[120px] px-8 md:px-16 flex justify-between items-center border-b geometric-grid-line bg-brand-black/90 backdrop-blur-md z-50">
        <nav className="hidden lg:block">
          <ul className="flex gap-12 text-[11px] uppercase tracking-[3px] font-medium">
            <li><button onClick={() => setShowComingSoon(true)} className="luxury-underline-crimson transition-colors hover:text-brand-crimson">{t.collections[lang]}</button></li>
            <li><button onClick={() => setShowComingSoon(true)} className="luxury-underline-crimson transition-colors hover:text-brand-crimson">{t.gifts[lang]}</button></li>
          </ul>
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none lg:pointer-events-auto">
          <h1 className="font-serif text-3xl md:text-4xl tracking-[15px] text-white font-light ml-[15px]">序章</h1>
          <span className="text-[9px] tracking-[6px] uppercase text-brand-mid font-medium mt-1 block">PROLOGUE</span>
        </div>

        <nav className="flex items-center gap-12">
          <ul className="hidden lg:flex gap-12 text-[11px] uppercase tracking-[3px] font-medium">
            <li><button onClick={() => setShowComingSoon(true)} className="luxury-underline-crimson transition-colors hover:text-brand-crimson flex items-center gap-2"><BookOpen className="w-3 h-3"/> {t.stories[lang]}</button></li>
            <li><button onClick={() => setShowComingSoon(true)} className="luxury-underline-crimson transition-colors hover:text-brand-crimson flex items-center gap-2"><MapPin className="w-3 h-3"/> {t.boutiques[lang]}</button></li>
          </ul>
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
              className="px-3 py-1 border border-brand-mid text-[10px] tracking-widest hover:border-brand-crimson hover:text-brand-crimson transition-all font-mono"
            >
              {lang === 'cn' ? 'EN' : '中'}
            </button>
            <button onClick={() => setShowComingSoon(true)} className="p-2 hover:text-brand-crimson transition-colors"><Search className="w-5 h-5"/></button>
            <button onClick={() => setShowComingSoon(true)} className="p-2 hover:text-brand-crimson transition-colors"><ShoppingBag className="w-5 h-5"/></button>
          </div>
        </nav>
      </header>

      {/* Hero Section: Panoramic Carousel */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center bg-[#0d1117] group/hero">
        <AnimatePresence>
          <motion.div 
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) {
                setHeroIndex((prev) => (prev + 1) % heroImages.length);
              } else if (info.offset.x > 100) {
                setHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <img 
              src={heroImages[heroIndex]} 
              alt={`PROLOGUE | Brand Visual ${heroIndex + 1}`} 
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Layered gradients for depth and text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-brand-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls (Dots) - Higher Z-Index */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-6">
          {heroImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setHeroIndex(idx);
              }}
              className={cn(
                "w-12 h-[2px] transition-all duration-700",
                heroIndex === idx ? "bg-brand-crimson w-20" : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        {/* Left/Right Manual Navigation - Higher Z-Index */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
          }}
          className="absolute left-0 inset-y-0 w-24 z-50 cursor-pointer group/nav"
        >
          <div className="h-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-opacity">
            <div className="w-10 h-[1px] bg-white/40 -translate-x-4 group-hover/nav:translate-x-0 transition-transform" />
          </div>
        </div>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
          }}
          className="absolute right-0 inset-y-0 w-24 z-50 cursor-pointer group/nav"
        >
          <div className="h-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-opacity">
            <div className="w-10 h-[1px] bg-white/40 translate-x-4 group-hover/nav:translate-x-0 transition-transform" />
          </div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl pointer-events-none">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-brand-mid font-mono text-[9px] tracking-[10px] uppercase mb-12 opacity-60"
          >
            {t.curated[lang]}
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="mb-12"
          >
            <h3 className="text-white/90 font-serif text-2xl md:text-3xl tracking-[20px] md:tracking-[25px] font-light mb-2 ml-[20px] md:ml-[25px]">
              序章
            </h3>
            <span className="text-brand-mid font-mono text-[9px] tracking-[12px] uppercase block ml-[12px] opacity-40">
              PROLOGUE
            </span>
          </motion.div>

          <motion.h2 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-white font-serif text-4xl md:text-6xl lg:text-7xl tracking-[10px] md:tracking-[18px] font-extralight mb-20 leading-[1.3] text-balance"
          >
            {t.ourStoryBegins[lang]}
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            onClick={() => {
              const mainElement = document.querySelector('main');
              mainElement?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-14 py-6 border border-white/20 hover:border-brand-crimson hover:bg-brand-crimson text-white text-[10px] tracking-[8px] uppercase transition-all duration-700 backdrop-blur-sm pointer-events-auto"
          >
            {t.explore[lang]}
          </motion.button>
        </div>
      </section>

      {/* Main Grid Viewport */}
      <main className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden min-h-[calc(100vh-220px)] bg-transparent">
        {PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            layout
            onMouseEnter={() => setActiveId(product.id)}
            onClick={() => setActiveId(product.id)}
            onViewportEnter={() => {
              if (window.innerWidth < 1024) setActiveId(product.id);
            }}
            viewport={{ amount: 0.5 }}
            className={cn(
              "relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r geometric-grid-line overflow-hidden cursor-pointer p-6 lg:p-12 transition-all duration-500",
              activeId === product.id ? "lg:flex-[1.4] bg-brand-dark/40" : "lg:flex-1 bg-transparent",
              product.id === 'paper' && "lg:border-r-0"
            )}
          >
            {/* Scent Title (Top Layout) */}
            <div className="z-20">
              <div className="flex justify-between items-start mb-4">
                <motion.div layout>
                  <h2 className={cn(
                    "font-serif text-2xl md:text-3xl lg:text-4xl tracking-[4px] leading-tight transition-all duration-700",
                      activeId === product.id 
                        ? (['lime', 'paper'].includes(product.id) ? "text-brand-azure" : "text-brand-crimson") 
                        : "text-white/40"
                  )}>
                    {product.name[lang]}
                  </h2>
                </motion.div>
                <div className={cn(
                  "text-right transition-all duration-700",
                  activeId === product.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                )}>
                   <p className="font-mono text-[9px] tracking-[4px] text-brand-mid uppercase whitespace-nowrap">{product.enName}</p>
                   <p className={cn(
                     "font-mono text-xs mt-2 font-light tracking-widest",
                     ['lime', 'paper'].includes(product.id) ? "text-brand-azure" : "text-brand-crimson"
                   )}>{product.price}</p>
                </div>
              </div>
            </div>

            {/* Framed Product Image (Central) */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <motion.div 
                layout
                className={cn(
                  "relative transition-all duration-500 transform",
                  activeId === product.id ? "scale-95" : "scale-85 opacity-40 grayscale"
                )}
              >
                {/* Visual Accent Box */}
                <div className={cn(
                  "absolute -inset-6 border transition-colors duration-700",
                  activeId === product.id 
                    ? (['lime', 'paper'].includes(product.id) ? "border-brand-azure/30" : "border-brand-crimson/30") 
                    : "border-brand-mid/10"
                )} />
                
                <div className={cn(
                  "relative overflow-hidden bg-white/5 backdrop-blur-sm shadow-[0_45px_100px_-20px_rgba(0,0,0,0.7)] transition-all duration-500 p-2 md:p-3 ring-1 ring-white/10",
                  activeId === product.id 
                    ? "w-[65vw] md:w-[32vw] min-w-[260px] md:min-w-[340px] max-w-[520px] aspect-[4/5]" 
                    : "w-40 md:w-52 lg:w-60 aspect-[3/4]"
                )}>
                  <div className="relative w-full h-full overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={`${product.name[lang]} | 序章`} 
                      className={cn(
                        "w-full h-full object-cover transition-all duration-[3000ms] group-hover:scale-110",
                        activeId === product.id ? "saturate-100 brightness-100" : "saturate-0 brightness-75 opacity-40"
                      )}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== product.fallback) {
                          img.src = product.fallback;
                        }
                      }}
                    />
                    {/* Brand Identifier Tag */}
                    <div className={cn(
                      "absolute bottom-4 right-4 z-30 px-3 py-1 border border-white/20 transition-all duration-700 bg-brand-black/60 backdrop-blur-md shadow-2xl",
                      activeId === product.id ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"
                    )}>
                      <span className="text-[9px] tracking-[4px] text-white font-serif uppercase">序章</span>
                    </div>
                    {/* Minimal Internal Frame */}
                    <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                  </div>
                  {/* Subtle Light Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Vertical Trim Lines */}
                <div className={cn(
                  "absolute -left-3 top-0 bottom-0 w-[1px] transition-all duration-1000",
                  ['lime', 'paper'].includes(product.id) ? "bg-brand-azure" : "bg-brand-crimson",
                  activeId === product.id ? "h-full opacity-60" : "h-0 opacity-0"
                )} />
              </motion.div>
            </div>

            {/* Product Info & Action (Bottom) */}
            <div className="z-20 mt-8">
              <div className={cn(
                "transition-all duration-1000",
                activeId === product.id ? "max-w-[450px] opacity-100" : "max-w-[280px] opacity-0 translate-y-4"
              )}>
                <div className={cn(
                  "h-[2px] transition-all duration-1000 mb-4",
                  ['lime', 'paper'].includes(product.id) ? "bg-brand-azure" : "bg-brand-crimson",
                  activeId === product.id ? "w-24" : "w-0"
                )} />
                <p className="font-mono text-[9px] tracking-[6px] uppercase mb-4 text-brand-mid">
                  {product.notes[lang]}
                </p>
                <p className={cn(
                  "text-base md:text-lg leading-relaxed tracking-wider transition-colors duration-500 whitespace-pre-line font-light italic opacity-95 font-serif text-brand-light"
                )}>
                  {product.description[lang]}
                </p>
                
                <motion.div 
                  initial={false}
                  animate={{ opacity: activeId === product.id ? 1 : 0, y: activeId === product.id ? 0 : 20 }}
                  className="mt-10 flex items-center gap-6 group/btn"
                >
                  <button 
                    onClick={() => setShowComingSoon(true)}
                    className={cn(
                      "px-10 py-4 border text-[11px] tracking-[5px] uppercase font-bold transition-all duration-500 shadow-lg",
                      ['lime', 'paper'].includes(product.id) 
                        ? "border-brand-azure bg-brand-azure/5 text-brand-azure hover:bg-brand-azure hover:text-white shadow-brand-azure/10" 
                        : "border-brand-crimson bg-brand-crimson/5 text-brand-crimson hover:bg-brand-crimson hover:text-white shadow-brand-crimson/10"
                    )}
                  >
                    {t.book[lang]}
                  </button>
                  <div className={cn(
                    "w-16 h-[1px] transition-all duration-700",
                    ['lime', 'paper'].includes(product.id) ? "bg-brand-azure/40 group-hover/btn:w-32" : "bg-brand-crimson/40 group-hover/btn:w-32"
                  )} />
                </motion.div>
              </div>
            </div>

            {/* Background Scent Name (Huge Background Text) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] select-none z-0 overflow-hidden w-full text-center">
              <span className="text-[14vw] font-serif font-light whitespace-nowrap text-white uppercase italic tracking-tighter">
                {product.enName}
              </span>
            </div>

            {/* Subtle Blue/Red Wash */}
            <div className={cn(
              "absolute inset-0 z-0 transition-opacity duration-700 bg-radial-gradient from-transparent to-transparent pointer-events-none",
              activeId === product.id && (['lime', 'paper'].includes(product.id) ? "from-brand-azure/10 opacity-100" : "from-brand-crimson/5 opacity-100"),
              activeId !== product.id && "opacity-0"
            )} />
          </motion.div>
        ))}
      </main>

      {/* Brand Story Section with Full-Bleed Background */}
      <section className="relative py-32 md:py-48 px-8 md:px-16 border-t geometric-grid-line overflow-hidden bg-brand-black">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dv3erhizb/image/upload/v1776604631/image_841e372b_jhwbxe.png" 
            alt="PROLOGUE | Brand Atmosphere" 
            className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Visual Frame & Decorative Elements */}
            <div className="absolute -inset-8 border border-white/5 translate-x-2 translate-y-2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-brand-crimson/30 -translate-y-4 translate-x-4 pointer-events-none" />
            
            <div className="relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              {/* Full Image Display: No cropping, natural proportions */}
              <img 
                src="https://res.cloudinary.com/dv3erhizb/image/upload/v1776601024/78f3e4167ee6ba758f37a4dfb9cba04a_eajqbh.png" 
                alt="PROLOGUE | Luxury Detail" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <span className="font-mono text-xs tracking-[10px] text-brand-crimson uppercase block">
              {t.brandPhilosophy[lang]}
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white tracking-widest leading-tight">
              {t.storyTitle[lang]}
            </h3>
            <p className="text-white text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-xl">
              {t.storyText[lang]}
            </p>
            <div className="w-16 h-[1px] bg-brand-crimson mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Visual Epilogue: Seamless Full-Bleed Artistic Conclusion */}
      <section className="relative w-full bg-brand-black overflow-hidden border-t border-white/5 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3 }}
          viewport={{ once: true }}
          className="relative w-full max-w-[1000px] mx-auto group px-8"
        >
          {/* Layered Ambient Glows for Elite Blending */}
          <div className="absolute inset-0 bg-brand-crimson/10 blur-[100px] pointer-events-none opacity-40" />
          
          {/* The Image with subtle transparency - Slightly Smaller */}
          <img 
            src="https://res.cloudinary.com/dv3erhizb/image/upload/v1776611066/c5e96942b790cd09a0a9ff085c86ec83_orclwy.png" 
            alt="PROLOGUE | Final Impression" 
            className="w-full h-auto block opacity-80 transition-all duration-[5000ms] group-hover:scale-[1.02] group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
          
          {/* Edge Softening Gradients (The "Melting" Effect) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-black to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-brand-black to-transparent" />
            <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-brand-black to-transparent hidden md:block" />
            <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-brand-black to-transparent hidden md:block" />
          </div>
        </motion.div>
      </section>

      {/* Minimal Footer */}
      <footer className="h-auto py-12 lg:py-0 lg:h-[120px] px-8 md:px-16 flex flex-col lg:flex-row justify-between items-center border-t geometric-grid-line bg-brand-black/80 backdrop-blur-md text-[10px] uppercase tracking-[3px] text-brand-light font-light">
        <div className="flex gap-10 mb-8 lg:mb-0 text-brand-mid">
          <button onClick={() => setShowComingSoon(true)} className="hover:text-brand-crimson transition-colors opacity-50 hover:opacity-100">Terms</button>
          <button onClick={() => setShowComingSoon(true)} className="hover:text-brand-crimson transition-colors opacity-50 hover:opacity-100">Privacy</button>
          <button onClick={() => setShowComingSoon(true)} className="hover:text-brand-crimson transition-colors opacity-50 hover:opacity-100">Contact</button>
        </div>

        <div className="py-8 lg:py-0 opacity-20 text-[9px]">
          <p>© 2026 PROLOGUE FRAGRANCE. {t.curated[lang]}.</p>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div 
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-md" 
              onClick={() => setShowComingSoon(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-brand-dark border border-white/10 p-12 text-center"
            >
              <button 
                onClick={() => setShowComingSoon(false)}
                className="absolute top-4 right-4 text-brand-mid hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 border border-brand-crimson/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-crimson animate-pulse" />
                </div>
              </div>

              <h2 className="font-serif text-2xl tracking-[10px] text-white uppercase mb-4 ml-[10px]">
                {t.comingSoon[lang]}
              </h2>
              <p className="text-brand-mid text-xs tracking-[2px] leading-relaxed mb-10 font-light">
                {t.comingSoonDesc[lang]}
              </p>

              <button
                onClick={() => setShowComingSoon(false)}
                className="w-full py-4 border border-white/20 text-[10px] tracking-[4px] uppercase hover:bg-white hover:text-brand-black transition-all duration-500"
              >
                {t.close[lang]}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
