/**
 * Google Analytics Event Tracking Utility
 */

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void;
  }
}

export const trackEvent = (eventName: string, params?: AnalyticsParams) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// Common Event Types
export const ANALYTICS_EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CUSTOMIZE_TRIP_SUBMIT: 'customize_trip_submit',
  BROCHURE_DOWNLOAD: 'brochure_download',
};
