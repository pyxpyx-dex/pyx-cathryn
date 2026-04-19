/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, MapPin, BookOpen, X } from 'lucide-react';
import { useState } from 'react';
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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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
    storyTitle: { cn: '用气味续写记忆的篇章', en: 'Writing Chapters of Memory with Scent' },
    storyText: {
      cn: '“序章”不仅仅是一个品牌，它是一种对时间的致敬。我们深入全球最隐秘的角落，寻觅那些被时光遗忘的稀有天然香材。从乌木的幽暗到玫瑰的炽烈，每一滴香精都承载着一段不曾言说的心事。',
      en: '"Prologue" is more than a brand; it is a tribute to time. We venture into the most secluded corners of the world to find rare natural ingredients forgotten by time. From the darkness of Oud to the blaze of Rose, every drop of essence carries an unspoken story.'
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-brand-light font-sans selection:bg-brand-crimson marble-bg">
      {/* Geometric Header */}
      <header className="h-[120px] px-8 md:px-16 flex justify-between items-center border-b geometric-grid-line bg-brand-black/90 backdrop-blur-md z-50">
        <nav className="hidden lg:block">
          <ul className="flex gap-12 text-[11px] uppercase tracking-[3px] font-medium">
            <li><a href="#" className="luxury-underline-crimson transition-colors hover:text-brand-crimson">{t.collections[lang]}</a></li>
            <li><a href="#" className="luxury-underline-crimson transition-colors hover:text-brand-crimson">{t.gifts[lang]}</a></li>
          </ul>
        </nav>

        <div className="text-center">
          <h1 className="font-serif text-3xl md:text-4xl tracking-[15px] text-white font-light ml-[15px]">序章</h1>
          <span className="text-[9px] tracking-[6px] uppercase text-brand-mid font-medium mt-1 block">PROLOGUE</span>
        </div>

        <nav className="flex items-center gap-12">
          <ul className="hidden lg:flex gap-12 text-[11px] uppercase tracking-[3px] font-medium">
            <li><a href="#" className="luxury-underline-crimson transition-colors hover:text-brand-crimson flex items-center gap-2"><BookOpen className="w-3 h-3"/> {t.stories[lang]}</a></li>
            <li><a href="#" className="luxury-underline-crimson transition-colors hover:text-brand-crimson flex items-center gap-2"><MapPin className="w-3 h-3"/> {t.boutiques[lang]}</a></li>
          </ul>
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
              className="px-3 py-1 border border-brand-mid text-[10px] tracking-widest hover:border-brand-crimson hover:text-brand-crimson transition-all font-mono"
            >
              {lang === 'cn' ? 'EN' : '中'}
            </button>
            <button className="p-2 hover:text-brand-crimson transition-colors"><Search className="w-5 h-5"/></button>
            <button className="p-2 hover:text-brand-crimson transition-colors"><ShoppingBag className="w-5 h-5"/></button>
          </div>
        </nav>
      </header>

      {/* Hero Section: Blue-Grey Fragrance Art (High Visibility) */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center bg-[#0d1117] group/hero">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {/* Blue-grey aesthetic - Clear focus on glass and scent essence */}
          <img 
            src="https://res.cloudinary.com/dv3erhizb/image/upload/v1776581313/image_4693ebd_exj9uh.png" 
            alt="PROLOGUE | Official Brand Visual" 
            className="w-full h-full object-cover cursor-zoom-in transition-transform duration-[2000ms] group-hover/hero:scale-105"
            referrerPolicy="no-referrer"
            onClick={() => setZoomedImage("https://res.cloudinary.com/dv3erhizb/image/upload/v1776581313/image_4693ebd_exj9uh.png")}
          />
          {/* Layered gradients for depth and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/40 transition-opacity duration-1000 group-hover/hero:opacity-60" />
        </motion.div>

        <div className="relative z-20 text-center px-6">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-brand-mid font-mono text-[10px] tracking-[10px] uppercase mb-8"
          >
            {t.curated[lang]}
          </motion.p>
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-white font-serif text-4xl md:text-5xl lg:text-7xl tracking-[12px] md:tracking-[20px] font-extralight mb-16 max-w-5xl mx-auto leading-tight"
          >
            {t.ourStoryBegins[lang]}
          </motion.h2>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
            onClick={() => {
              const mainElement = document.querySelector('main');
              mainElement?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-14 py-6 border border-white/20 hover:border-brand-crimson hover:bg-brand-crimson text-white text-[10px] tracking-[8px] uppercase transition-all duration-700 backdrop-blur-sm"
          >
            {t.explore[lang]}
          </motion.button>
        </div>
      </section>

      {/* Main Grid Viewport */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-220px)] bg-transparent">
        {PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            layout
            onMouseEnter={() => setActiveId(product.id)}
            onClick={() => setActiveId(product.id)}
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
                    "font-serif text-3xl md:text-4xl lg:text-5xl tracking-[4px] leading-tight transition-all duration-700",
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
                  activeId === product.id ? "w-[32vw] min-w-[340px] max-w-[520px] aspect-[4/5]" : "w-52 lg:w-60 aspect-[3/4]"
                )}>
                  <div className="relative w-full h-full overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={`${product.name[lang]} | 序章`} 
                      className={cn(
                        "w-full h-full object-cover transition-all duration-[3000ms] group-hover:scale-110 cursor-zoom-in",
                        activeId === product.id ? "saturate-100 brightness-100" : "saturate-0 brightness-75 opacity-40"
                      )}
                      referrerPolicy="no-referrer"
                      onClick={(e) => {
                        if (activeId === product.id) {
                          setZoomedImage(product.image);
                        }
                      }}
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
                  <button className={cn(
                    "px-10 py-4 border text-[11px] tracking-[5px] uppercase font-bold transition-all duration-500 shadow-lg",
                    ['lime', 'paper'].includes(product.id) 
                      ? "border-brand-azure bg-brand-azure/5 text-brand-azure hover:bg-brand-azure hover:text-white shadow-brand-azure/10" 
                      : "border-brand-crimson bg-brand-crimson/5 text-brand-crimson hover:bg-brand-crimson hover:text-white shadow-brand-crimson/10"
                  )}>
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

      {/* Brand Story Section */}
      <section className="bg-brand-dark/40 backdrop-blur-sm py-32 md:py-48 px-8 md:px-16 border-t geometric-grid-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 border border-brand-crimson/20 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-700" />
            <div className="relative overflow-hidden cursor-zoom-in group shadow-2xl ring-1 ring-white/10" onClick={() => setZoomedImage("https://res.cloudinary.com/dv3erhizb/image/upload/v1776582247/a78ff223c98c2b7c1e4044bb9548164f_dwsyak.png")}>
              <img 
                src="https://res.cloudinary.com/dv3erhizb/image/upload/v1776582247/a78ff223c98c2b7c1e4044bb9548164f_dwsyak.png" 
                alt="PROLOGUE | Luxury Atmosphere" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              {/* Dynamic Reveal Label */}
              <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <div className="border border-white/40 px-8 py-3 backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="text-[10px] tracking-[6px] text-white uppercase font-sans">{t.book[lang]}</span>
                </div>
              </div>
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

      {/* Minimal Footer */}
      <footer className="h-auto py-12 lg:py-0 lg:h-[120px] px-8 md:px-16 flex flex-col lg:flex-row justify-between items-center border-t geometric-grid-line bg-brand-black/80 backdrop-blur-md text-[10px] uppercase tracking-[3px] text-brand-light font-light">
        <div className="flex gap-10 mb-8 lg:mb-0">
          <a href="#" className="hover:text-brand-crimson transition-colors opacity-50 hover:opacity-100">Terms</a>
          <a href="#" className="hover:text-brand-crimson transition-colors opacity-50 hover:opacity-100">Privacy</a>
          <a href="#" className="hover:text-brand-crimson transition-colors opacity-50 hover:opacity-100">Contact</a>
        </div>

        <div className="py-8 lg:py-0 opacity-20 text-[9px]">
          <p>© 2026 PROLOGUE FRAGRANCE. {t.curated[lang]}.</p>
        </div>

        <div className="flex gap-10">
          <a href="#" className="hover:text-brand-crimson transition-colors flex items-center gap-2 opacity-50 hover:opacity-100">
            <BookOpen className="w-3 h-3"/> {lang === 'cn' ? '小红书' : 'RED'}
          </a>
        </div>
      </footer>

      {/* Luxury Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setZoomedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-8 right-8 text-white hover:text-brand-crimson transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
            >
              <X className="w-10 h-10 stroke-1" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={zoomedImage}
              alt="Zoomed"
              className="max-w-full max-h-full object-contain shadow-2xl ring-1 ring-white/10"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
