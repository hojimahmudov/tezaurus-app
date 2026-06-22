"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Volume2, History, Languages, Link, ChevronDown, BookText } from "lucide-react";
import wordsData from "../data.json";

const ALPHABET = [
  "A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z", 
  "O'", "G'", "SH", "CH"
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAlphabet, setShowAlphabet] = useState(false);

  // Filterlash mantiqi
  const filteredWords = wordsData.filter((item) => {
    const matchesSearch = 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.semantics.toLowerCase().includes(searchTerm.toLowerCase());
      
    // CH va SH kabi ikki harfli tovushlar uchun maxsus tekshiruv
    const wordUpper = item.word.toUpperCase();
    let matchesLetter = true;
    
    if (selectedLetter) {
      if (selectedLetter === "SH" || selectedLetter === "CH") {
        matchesLetter = wordUpper.startsWith(selectedLetter);
      } else {
        // Agar boshqa harf bo'lsa (masalan, S), lekin so'z SH bilan boshlansa, uni qaytarmasligi kerak.
        if ((wordUpper.startsWith("SH") || wordUpper.startsWith("CH")) && selectedLetter !== wordUpper.substring(0, 2)) {
           matchesLetter = false;
        } else {
           matchesLetter = wordUpper.startsWith(selectedLetter);
        }
      }
    }

    return matchesSearch && matchesLetter;
  });

  const toggleAccordion = (id: number) => {
    // Agar ochiq turgan bo'lsa uni yopadi, bo'lmasa yangisini ochadi (bittasi ochiq turadi)
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="max-w-2xl mx-auto p-4 pb-20">
      
      {/* 🚀 HERO SECTION (Bosh qism) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-6 pb-6"
      >
        <div className="flex justify-center mb-3">
          <div className="bg-[var(--button-bg)]/10 p-3 rounded-full text-[var(--button-bg)]">
            <BookText className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] mb-2 tracking-tight leading-tight">
          <span className="text-[var(--button-bg)]">"Boburnoma"</span> fe'l-atvor leksemalari
        </h1>
        <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--hint-color)]/10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--hint-color)]">
            Elektron tezaurusi
          </p>
        </div>
      </motion.div>

      {/* STICKY QISMI: Qidiruv va Alfavit */}
      <div className="sticky top-0 z-20 bg-[var(--background)] pt-2 pb-4 border-b border-[var(--hint-color)]/20 shadow-sm">
        
        {/* Qidiruv paneli */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--hint-color)] w-5 h-5" />
          <input
            type="text"
            placeholder="So'z yoki izoh izlang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[var(--hint-color)]/10 border border-transparent outline-none text-[var(--text)] placeholder-[var(--hint-color)] focus:border-[var(--button-bg)] focus:bg-transparent transition-all shadow-inner"
          />
        </div>

        {/* Alfavit filtri ochiq-yopiqligini boshqaruvchi tugma */}
        <div className="flex justify-between items-center px-1 mb-1">
          <button
            onClick={() => setShowAlphabet(!showAlphabet)}
            className="flex items-center gap-1.5 text-[var(--hint-color)] hover:text-[var(--text)] transition-colors py-1 focus:outline-none"
          >
            <span className="text-xs font-bold uppercase tracking-wider">
              {selectedLetter ? `Tanlangan harf: ${selectedLetter}` : "Alfavit bo'yicha filtrlash"}
            </span>
            <motion.div animate={{ rotate: showAlphabet ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          
          {selectedLetter && (
            <button 
              onClick={() => setSelectedLetter(null)}
              className="text-xs font-bold text-[var(--button-bg)] hover:underline"
            >
              Tozalash
            </button>
          )}
        </div>

        {/* Alfavit filtri (Akkordeon) */}
        <AnimatePresence>
          {showAlphabet && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 pb-2 pt-2">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                    selectedLetter === null
                      ? "bg-[var(--button-bg)] text-[var(--button-text)]"
                      : "bg-[var(--background)] border border-[var(--hint-color)]/20 text-[var(--text)] hover:bg-[var(--hint-color)]/10"
                  }`}
                >
                  Barchasi
                </button>
                {ALPHABET.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      setSelectedLetter(letter);
                    }}
                    className={`shrink-0 w-[42px] h-[42px] flex items-center justify-center rounded-full text-sm font-bold transition-all shadow-sm ${
                      selectedLetter === letter
                        ? "bg-[var(--button-bg)] text-[var(--button-text)]"
                        : "bg-[var(--background)] border border-[var(--hint-color)]/20 text-[var(--text)] hover:bg-[var(--hint-color)]/10"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Natijalar ro'yxati (Akkordeon dizayni) */}
      <div className="mt-6 space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredWords.length > 0 ? (
            filteredWords.map((item) => {
              const isExpanded = expandedId === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-[var(--background)] border transition-colors duration-300 rounded-2xl overflow-hidden shadow-sm ${
                    isExpanded ? "border-[var(--button-bg)]" : "border-[var(--hint-color)]/20"
                  }`}
                >
                  {/* Akkordeon Bosh qismi (Clickable Header) */}
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-[var(--hint-color)]/5 focus:outline-none"
                  >
                    <h2 className={`text-lg sm:text-xl font-bold uppercase tracking-wide transition-colors ${
                      isExpanded ? "text-[var(--button-bg)]" : "text-[var(--text)]"
                    }`}>
                      {item.word}
                    </h2>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ml-4 p-1.5 rounded-full transition-colors ${
                        isExpanded ? "bg-[var(--button-bg)]/10 text-[var(--button-bg)]" : "bg-[var(--hint-color)]/10 text-[var(--text)]"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Akkordeon Ichidagi ma'lumotlar */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-[var(--hint-color)]/10 mt-1">
                          
                          {/* Semantika */}
                          <div className="pt-3">
                            <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1.5">
                              <BookOpen className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">Semantikasi</span>
                            </div>
                            <p className="text-[var(--text)] font-medium text-sm sm:text-base leading-relaxed">{item.semantics}</p>
                          </div>

                          {/* Etimologiya */}
                          <div className="bg-[var(--hint-color)]/5 p-3.5 rounded-xl border-l-2 border-[var(--button-bg)]">
                            <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1.5">
                              <History className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">Etimologiyasi</span>
                            </div>
                            <p className="text-[var(--text)] text-sm leading-relaxed">{item.etymology}</p>
                          </div>

                          {/* Morfologiya va Talaffuz */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-[var(--hint-color)]/5 p-3.5 rounded-xl">
                              <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1.5">
                                <Link className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Morfologiya</span>
                              </div>
                              <p className="text-[var(--text)] text-sm leading-relaxed">{item.morphology}</p>
                            </div>
                            <div className="bg-[var(--hint-color)]/5 p-3.5 rounded-xl">
                              <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1.5">
                                <Volume2 className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Talaffuz</span>
                              </div>
                              <p className="text-[var(--text)] text-sm font-medium">{item.pronunciation}</p>
                            </div>
                          </div>

                          {/* Tarjimalar */}
                          <div className="pt-2">
                            <div className="flex items-center gap-2 text-[var(--hint-color)] mb-2.5">
                              <Languages className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">Tarjimalar</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1.5 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-bold rounded-lg transition-colors hover:bg-[var(--button-bg)]/20">🇬🇧 {item.translations.en}</span>
                              <span className="px-3 py-1.5 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-bold rounded-lg transition-colors hover:bg-[var(--button-bg)]/20">🇷🇺 {item.translations.ru}</span>
                              <span className="px-3 py-1.5 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-bold rounded-lg transition-colors hover:bg-[var(--button-bg)]/20">🇹🇷 {item.translations.tr}</span>
                              <span className="px-3 py-1.5 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-bold rounded-lg transition-colors hover:bg-[var(--button-bg)]/20">🇰🇿 {item.translations.kk}</span>
                              <span className="px-3 py-1.5 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-bold rounded-lg transition-colors hover:bg-[var(--button-bg)]/20">🇹🇯 {item.translations.tg}</span>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 text-[var(--hint-color)]"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[var(--hint-color)]/10 rounded-full">
                  <Search className="w-8 h-8 opacity-50" />
                </div>
              </div>
              <p className="font-bold text-lg text-[var(--text)]">Kechirasiz, hech narsa topilmadi</p>
              <p className="text-sm mt-2 max-w-xs mx-auto">Boshqa so'z yozib ko'ring yoki boshqa harfni tanlang.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
