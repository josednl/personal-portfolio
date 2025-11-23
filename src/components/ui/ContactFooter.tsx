import { ContactData } from "@/lib/types/contact";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter } from "lucide-react";

const accentColor = "text-blue-600";

export const ContactFooter = ({ contact }: { contact: ContactData }) => {
  const { email, phone, location, links } = contact;

  return (
    <footer className="border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Contact Information
            </h4>

            <div className="space-y-3 text-gray-700">
              {email && (
                <p className="flex items-center">
                  <Mail className={`w-4 h-4 mr-2 ${accentColor}`} />
                  <a href={`mailto:${email}`} className="hover:text-gray-900 hover:underline transition">
                    {email}
                  </a>
                </p>
              )}

              {phone && (
                <p className="flex items-center">
                  <Phone className={`w-4 h-4 mr-2 ${accentColor}`} />
                  <a href={`tel:${phone}`} className="hover:text-gray-900 hover:underline transition">
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
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Connect Online
              </h4>
              <div className="flex space-x-5">
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-gray-400 hover:text-gray-900 transition-colors"
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
            <p className="text-gray-600 leading-relaxed max-w-xs md:ml-auto">
              Let's collaborate and create meaningful digital experiences together.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} [José]. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
