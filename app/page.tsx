"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Volume2, History, Languages, Link } from "lucide-react";
import wordsData from "../data.json";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Qidiruv mantig'i: so'zning o'zidan yoki izohidan (semantika) qidiradi
  const filteredWords = wordsData.filter((item) =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.semantics.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-2xl mx-auto p-4 pb-20">
      {/* Qidiruv qismi (Sticky - ekranning tepadagi qismida qotib turadi) */}
      <div className="sticky top-0 z-10 bg-[var(--background)] pt-4 pb-4 border-b border-[var(--hint-color)]/20">
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
                {/* Sarlavha */}
                <h2 className="text-3xl font-bold text-[var(--button-bg)] mb-4">
                  {item.word}
                </h2>

                {/* Ma'lumotlar bloki */}
                <div className="space-y-4">
                  {/* Semantika */}
                  <div>
                    <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase tracking-wider">Semantikasi</span>
                    </div>
                    <p className="text-[var(--text)] font-medium">{item.semantics}</p>
                  </div>

                  {/* Etimologiya */}
                  <div className="bg-[var(--hint-color)]/10 p-3 rounded-xl border-l-4 border-[var(--button-bg)]">
                    <div className="flex items-center gap-2 text-[var(--hint-color)] mb-1">
                      <History className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase tracking-wider">Etimologiyasi</span>
                    </div>
                    <p className="text-[var(--text)] text-sm leading-relaxed">{item.etymology}</p>
                  </div>

                  {/* Morfologiya va Talaffuz (2 ta ustunli grid) */}
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

                  {/* Tarjimalar */}
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
