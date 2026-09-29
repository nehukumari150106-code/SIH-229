import React, { createContext, useState, useContext } from 'react';

export const translations = {
  English: {
    aggregatorDashboardTitle: "Aggregator Dashboard",
    aggregatorDashboardSubtitle: "Manage lots, inventory and recycler activity",
    totalLots: "Total Lots",
    pendingLots: "Pending Lots",
  },
  Marathi: {
    aggregatorDashboardTitle: "ॲग्रीगेटर डॅशबोर्ड",
    aggregatorDashboardSubtitle: "लॉट्स, इनव्हेंटरी आणि रीसायकलर कामे व्यवस्थापित करा",
    totalLots: "एकूण लॉट्स",
    pendingLots: "प्रलंबित लॉट्स",
  },
  Hindi: {
    aggregatorDashboardTitle: "एग्रीगेटर डैशबोर्ड",
    aggregatorDashboardSubtitle: "लॉट, इन्वेंट्री और रीसाइक्लर गतिविधियों को संभालें",
    totalLots: "कुल लॉट",
    pendingLots: "लंबित लॉट",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');

  const t = (key) => translations[language]?.[key] || translations['English'][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);