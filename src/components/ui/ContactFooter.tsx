import { ContactData } from '@/lib/types/contact';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Twitter,
  ArrowUpRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
} as const;

const socialLabels = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  website: 'Website',
} as const;

export const ContactFooter = ({ contact }: { contact: ContactData }) => {
  const { t } = useTranslation();
  const { email, phone, location, links } = contact;

  const socialLinks = links
    ? (Object.keys(socialIcons) as Array<keyof typeof socialIcons>)
        .map((key) => ({
          key,
          href: links[key],
          label: socialLabels[key],
          Icon: socialIcons[key],
        }))
        .filter((link): link is typeof link & { href: string } =>
          Boolean(link.href),
        )
    : [];

  return (
    <footer className="border-t border-border pt-10 dark:border-border-dark md:pt-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="flex flex-col justify-between">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-light dark:text-text-light-dark">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              {t('contactTitle')}
            </p>

            <h2 className="mt-5 max-w-[16ch] text-balance font-display text-4xl font-semibold leading-[1.05] text-text dark:text-text-dark md:text-5xl lg:text-6xl">
              {t('contactCta')}
            </h2>

            <p className="mt-5 max-w-[48ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark md:text-base">
              {t('message')}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:py-1">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-light dark:text-text-light-dark">
              {t('socialProfiles')}
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark dark:hover:text-primary-dark"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-text-light dark:text-text-light-dark"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-light dark:text-text-light-dark">
              Email
            </p>

            <a
              href={`mailto:${email}`}
              className="group flex items-center justify-between gap-4 border-b border-border pb-4 text-lg font-semibold text-text transition-colors duration-200 hover:border-primary hover:text-primary dark:border-border-dark dark:text-text-dark dark:hover:text-primary-dark md:text-xl"
            >
              <span className="break-all">{email}</span>
              <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-5 border-t border-border pt-6 text-xs text-text-light dark:border-border-dark dark:text-text-light-dark sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {location && (
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {location}
            </p>
          )}

          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 transition-colors duration-200 hover:text-primary dark:hover:text-primary-dark"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {phone}
            </a>
          )}
        </div>

        <p>
          &copy; {new Date().getFullYear()} {t('portfolioOwner')}. {t('rights')}
        </p>
      </div>
    </footer>
  );
};
