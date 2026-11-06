import { ContactData } from '@/lib/types/contact';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Twitter,
} from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';

const accentColor = 'text-primary dark:text-primary-dark';

export const ContactFooter = ({ contact }: { contact: ContactData }) => {
  const { t } = useTranslation();

  const { email, phone, location, links } = contact;

  return (
    <footer className="border-t border-border dark:border-border-dark">
      <div className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-light dark:text-text-light-dark">
              {t('contactInformation')}
            </h4>

            <div className="space-y-3 text-text dark:text-text-dark">
              {email && (
                <p className="flex items-center">
                  <Mail className={`mr-2 h-4 w-4 ${accentColor}`} />
                  <a
                    href={`mailto:${email}`}
                    className="transition-colors duration-200 hover:text-primary dark:hover:text-primary-dark"
                  >
                    {email}
                  </a>
                </p>
              )}

              {phone && (
                <p className="flex items-center">
                  <Phone className={`mr-2 h-4 w-4 ${accentColor}`} />
                  <a
                    href={`tel:${phone}`}
                    className="transition-colors duration-200 hover:text-primary dark:hover:text-primary-dark"
                  >
                    {phone}
                  </a>
                </p>
              )}

              {location && (
                <p className="flex items-center">
                  <MapPin className={`mr-2 h-4 w-4 ${accentColor}`} />
                  <span>{location}</span>
                </p>
              )}
            </div>
          </div>

          {links && (
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-light dark:text-text-light-dark">
                {t('connectOnline')}
              </h4>
              <div className="flex space-x-5">
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-text-light transition-colors duration-200 hover:text-primary dark:text-text-light-dark dark:hover:text-primary-dark"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                )}

                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="text-text-light transition-colors duration-200 hover:text-primary dark:text-text-light-dark dark:hover:text-primary-dark"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}

                {links.twitter && (
                  <a
                    href={links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X Profile"
                    className="text-text-light transition-colors duration-200 hover:text-primary dark:text-text-light-dark dark:hover:text-primary-dark"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                )}

                {links.website && (
                  <a
                    href={links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Personal Website"
                    className="text-text-light transition-colors duration-200 hover:text-primary dark:text-text-light-dark dark:hover:text-primary-dark"
                  >
                    <Globe className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="md:text-right">
            <p className="max-w-xs leading-relaxed text-text-light dark:text-text-light-dark md:ml-auto">
              {t('message')}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 dark:border-border-dark">
          <p className="text-center text-sm text-text-light dark:text-text-light-dark">
            &copy; {new Date().getFullYear()} {t('portfolioOwner')}.{' '}
            {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
