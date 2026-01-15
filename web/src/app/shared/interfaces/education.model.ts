export interface LocalizedString { es?: string; en?: string; }
export interface EducationItem {
  _id: string;
  key: string;
  name: LocalizedString;
  role: LocalizedString;
  dates: LocalizedString;
  icons: string[];
  hasCertificate: boolean;
  certificateUrl?: string; // Sanity image url (optional)
}
