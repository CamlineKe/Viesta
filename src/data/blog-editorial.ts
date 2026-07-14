export const BLOG_MEDICAL_DISCLAIMER =
  "This article provides general wellness information and is not medical advice. It does not diagnose, treat, cure, or prevent any disease and does not replace care from a qualified healthcare professional. Ask a qualified professional before using supplements or herbal products if you have a medical condition, take medication, are pregnant, or are nursing.";

export function getBlogReadTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}
