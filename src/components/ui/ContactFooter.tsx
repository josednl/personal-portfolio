import { ContactData } from "@/lib/types/contact";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter } from "lucide-react";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { useTranslation } from "@/lib/hooks/useTranslation";

const accentColor = "text-blue-600";

export const ContactFooter = ({ contact }: { contact: ContactData }) => {
  const { t } = useTranslation();

  const { email, phone, location, links } = contact;

  return (
    <footer className="border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              {t("contactInformation")}
            </h4>

            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              {email && (
                <p className="flex items-center">
                  <Mail className={`w-4 h-4 mr-2 ${accentColor}`} />
                  <a href={`mailto:${email}`} className="hover:underline transition">
                    {email}
                  </a>
                </p>
              )}

              {phone && (
                <p className="flex items-center">
                  <Phone className={`w-4 h-4 mr-2 ${accentColor}`} />
                  <a href={`tel:${phone}`} className="hover:underline transition">
                    {phone}
                  </a>
                </p>
              )}

              {location && (
                <p className="flex items-center">
                  <MapPin className={`w-4 h-4 mr-2 ${accentColor}`} />
                  <span>{location}</span>
                </p>
              )}
            </div>
          </div>

          {links && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                {t("connectOnline")}
              </h4>
              <div className="flex space-x-5">
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}

                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}

                {links.twitter && (
                  <a
                    href={links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X Profile"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}

                {links.website && (
                  <a
                    href={links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Personal Website"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Globe className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="md:text-right">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs md:ml-auto">
              {t("message")}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {t("portfolioOwner")}
          </p>
        </div>
      </div>
    </footer>
  );
};
