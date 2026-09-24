export const CUSTOMER_CATEGORIES = [
  { id: 'TV_MONITOR', label: 'TV / Monitor', marathiLabel: 'टीव्ही / मॉनिटर', emoji: '📺' },
  { id: 'MOBILE_TABLET', label: 'Mobile / Tablet', marathiLabel: 'मोबाईल / टॅबलेट', emoji: '📱' },
  { id: 'COMPUTER_LAPTOP', label: 'Computer / Laptop', marathiLabel: 'कॉम्प्युटर / लॅपटॉप', emoji: '💻' },
  { id: 'FRIDGE_AC', label: 'Fridge / AC', marathiLabel: 'फ्रिज / एसी', emoji: '🧊' },
  { id: 'WASHING_APPLIANCE', label: 'Washing Machine / Appliance', marathiLabel: 'वॉशिंग मशीन / उपकरण', emoji: '🧺' },
  { id: 'CABLE_WIRE', label: 'Wire / Cable / Charger', marathiLabel: 'तार / केबल / चार्जर', emoji: '🔌' },
  { id: 'OTHER_ELECTRONICS', label: 'Other Electronics', marathiLabel: 'इतर इलेक्ट्रॉनिक वस्तू', emoji: '📦' },
  { id: 'NOT_SURE', label: "I Don't Know", marathiLabel: 'मला माहीत नाही', emoji: '❓' },
];

const CATEGORY_BY_ID = Object.fromEntries(
  CUSTOMER_CATEGORIES.map((category) => [category.id, category]),
);

// Legacy records only carry technical material names; show a friendly fallback.
const LEGACY_CATEGORY_IDS = {
  LCD: 'TV_MONITOR',
  CRT: 'TV_MONITOR',
  PCB: 'OTHER_ELECTRONICS',
  Cable: 'CABLE_WIRE',
  Battery: 'OTHER_ELECTRONICS',
  Motor: 'WASHING_APPLIANCE',
  'Mixed Plastic': 'OTHER_ELECTRONICS',
  Other: 'OTHER_ELECTRONICS',
};

export function getCustomerCategory(categoryId) {
  const id = CATEGORY_BY_ID[categoryId] ? categoryId : LEGACY_CATEGORY_IDS[categoryId];
  return CATEGORY_BY_ID[id] || CATEGORY_BY_ID.OTHER_ELECTRONICS;
}
