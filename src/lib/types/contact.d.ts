export interface ContactLinks {
  github?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
}

export interface ContactData {
  email: string;
  phone?: string;
  location?: string;
  links?: ContactLinks;
}
