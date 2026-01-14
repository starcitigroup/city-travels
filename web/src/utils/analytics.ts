/**
 * Google Analytics Event Tracking Utility
 */

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

// Common Event Types
export const ANALYTICS_EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CUSTOMIZE_TRIP_SUBMIT: 'customize_trip_submit',
  BROCHURE_DOWNLOAD: 'brochure_download',
};
