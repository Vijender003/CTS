/* Analytics dispatcher — GTM-ready. Pushes to window.dataLayer; no-ops safely without GTM. */
export function track(event, data = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
  } catch {
    /* analytics must never break the product */
  }
}

export const EVENTS = {
  PAGE_VIEW: "page_view",
  CTA_CLICK: "cta_click",
  CONTACT_SUBMIT: "contact_submit",
  PHONE_CLICK: "phone_click",
  WHATSAPP_CLICK: "whatsapp_click",
  CONSULT_BOOK: "consultation_book",
  ROI_USE: "roi_calculator_use",
  CHAT_OPEN: "chatbot_open",
  CHAT_LEAD: "chatbot_lead",
  BLOG_READ: "blog_engage",
};
