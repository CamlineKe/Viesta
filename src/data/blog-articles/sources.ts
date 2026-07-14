import type { BlogSource } from "@/types/blog";

const reviewedAt = "2026-07-14";

export const blogSources = {
  ahaBloodPressure: {
    title: "Understanding Blood Pressure Readings",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings",
    reviewedAt,
  },
  cdcDiabetesTesting: {
    title: "Diabetes Testing",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/diabetes/diabetes-testing/index.html",
    reviewedAt,
  },
  nccihDetoxes: {
    title: "‘Detoxes’ and ‘Cleanses’: What You Need To Know",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/detoxes-cleanses",
    reviewedAt,
  },
  nccihHerbs: {
    title: "Herbs at a Glance",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/herbsataglance",
    reviewedAt,
  },
  nccihHerbInteractions: {
    title: "Herb-Drug Interactions",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions",
    reviewedAt,
  },
  nciProstateChanges: {
    title: "Understanding Prostate Changes and Conditions",
    publisher: "National Cancer Institute",
    url: "https://www.cancer.gov/types/prostate/understanding-prostate-changes",
    reviewedAt,
  },
  nciProstateScreening: {
    title: "Prostate Cancer Screening (PDQ®)–Patient Version",
    publisher: "National Cancer Institute",
    url: "https://www.cancer.gov/types/prostate/patient/prostate-screening-pdq",
    reviewedAt,
  },
  niamsOsteoarthritis: {
    title: "Osteoarthritis: Diagnosis, Treatment, and Steps to Take",
    publisher: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
    url: "https://www.niams.nih.gov/health-topics/osteoarthritis/diagnosis-treatment-and-steps-to-take",
    reviewedAt,
  },
  nihImmuneFunction: {
    title: "Dietary Supplements for Immune Function and Infectious Diseases",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/ImmuneFunction-HealthProfessional/",
    reviewedAt,
  },
  whoHealthyDiet: {
    title: "Healthy Diet",
    publisher: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
    reviewedAt,
  },
  whoHypertension: {
    title: "Hypertension",
    publisher: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/hypertension",
    reviewedAt,
  },
  whoPhysicalActivity: {
    title: "Physical Activity",
    publisher: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
    reviewedAt,
  },
  whoSelfCare: {
    title: "Self-care for Health and Well-being",
    publisher: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/self-care-health-interventions/",
    reviewedAt,
  },
} satisfies Record<string, BlogSource>;
