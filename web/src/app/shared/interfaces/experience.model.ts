// experience.model.ts
export interface LocalizedString {
  es?: string;
  en?: string;
}

export interface ExperienceItem {
  _id: string;
  key: string;
  name: LocalizedString;
  role: LocalizedString;
  dates: LocalizedString;
  paragraphs: LocalizedString[];
  icons: string[];
}