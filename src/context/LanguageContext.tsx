"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Locale = "tr" | "en";

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "tr",
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("tr");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "tr" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === "tr" ? "en" : "tr";
      localStorage.setItem("locale", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
