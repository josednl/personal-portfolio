import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppSettingsProvider } from "@/lib/context/AppSettingsContext";
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Education } from "@/components/sections/Education";
import { Contact } from '@/components/sections/Contact';
import { WorkExperience } from "@/components/sections/WorkExperience";
import { Skills } from "@/components/sections/Skills";
import AccessibilityMenu from "./components/ui/AccessibilityMenu";
import { useTranslation } from "@/lib/hooks/useTranslation";

function App() {
  return (
    <AppSettingsProvider>
      <AppContent />
    </AppSettingsProvider>
  );
}

function AppContent() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('portfolioOwner')} - ${t('portfolioTitle')}`;
  }, [t]);

  return (
    <PageContainer>
      <About />
      <Skills />
      <Projects />
      <WorkExperience />
      <Education />
      <Contact />

      <AccessibilityMenu />
    </PageContainer>
  );
}

export default App;
