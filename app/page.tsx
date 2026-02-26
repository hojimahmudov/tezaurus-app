"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Volume2, History, Languages, Link } from "lucide-react";
import wordsData from "../data.json";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWords = wordsData.filter((item) =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.semantics.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-2xl mx-auto p-4 pb-20">
      
      {/* 🚀 YANGI QO'SHILGAN SARLAVHA QISMI */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-6 pb-4"
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] mb-2 tracking-tight leading-tight">
          <span className="text-[var(--button-bg)]">"Boburnoma"</span> fe'l-atvor leksemalari
        </h1>
        <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--hint-color)]/10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--hint-color)]">
            Elektron tezaurusi
          </p>
        </div>
      </motion.div>

      {/* Qidiruv qismi (Sticky) */}
      <div className="sticky top-0 z-10 bg-[var(--background)] pt-2 pb-4 border-b border-[var(--hint-color)]/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hint-color)] w-5 h-5" />
          <input
            type="text"
            placeholder="So'z yoki izoh izlang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[var(--hint-color)]/10 border-none outline-none text-[var(--text)] placeholder-[var(--hint-color)] focus:ring-2 focus:ring-[var(--button-bg)] transition-all"
          />
        </div>
      </div>

      {/* Natijalar ro'yxati */}
      <div className="mt-6 space-y-6">
        <AnimatePresence>
          {filteredWords.length > 0 ? (
            filteredWords.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[var(--hint-color)]/5 rounded-3xl p-5 border border-[var(--hint-color)]/10 shadow-sm"
              >
                <h2 className="text-3xl font-bold text-[var(--button-bg)] mb-4">
                  {item.word}
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase tracking-wider">Semantikasi</span>
                    </div>
                    <p className="text-[var(--text)] font-medium">{item.semantics}</p>
                  </div>

                  <div className="bg-[var(--hint-color)]/10 p-3 rounded-xl border-l-4 border-[var(--button-bg)]">
                    <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1">
                      <History className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase tracking-wider">Etimologiyasi</span>
                    </div>
                    <p className="text-[var(--text)] text-sm leading-relaxed">{item.etymology}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1">
                        <Link className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">Morfologiya</span>
                      </div>
                      <p className="text-[var(--text)] text-sm">{item.morphology}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1">
                        <Volume2 className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">Talaffuz</span>
                      </div>
                      <p className="text-[var(--text)] text-sm">{item.pronunciation}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--hint-color)]/20">
                    <div className="flex items-center gap-2 text-[var(--hint-color)] mb-2">
                      <Languages className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase tracking-wider">Tarjimalar</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-semibold rounded-lg">🇬🇧 {item.translations.en}</span>
                      <span className="px-3 py-1 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-semibold rounded-lg">🇷🇺 {item.translations.ru}</span>
                      <span className="px-3 py-1 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-semibold rounded-lg">🇹🇷 {item.translations.tr}</span>
                      <span className="px-3 py-1 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-semibold rounded-lg">🇰🇿 {item.translations.kk}</span>
                      <span className="px-3 py-1 bg-[var(--button-bg)]/10 text-[var(--button-bg)] text-xs font-semibold rounded-lg">🇹🇯 {item.translations.tg}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-[var(--hint-color)]"
            >
              Kechirasiz, so'z topilmadi...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
