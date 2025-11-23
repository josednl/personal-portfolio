import { PageContainer } from "@/components/layout/PageContainer";
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Education } from "@/components/sections/Education";
import { Contact } from '@/components/sections/Contact';
import { WorkExperience } from "@/components/sections/WorkExperience";
import { Skills } from "@/components/sections/Skills";
import AccessibilityMenu from "./components/ui/AccessibilityMenu";

function App() {
  return (
    <PageContainer>
      <About />
      {/* <Skills /> */}
      <Projects />
      {/* <WorkExperience /> */}
      <Education />
      <Contact />

      <AccessibilityMenu />
    </PageContainer>
  )
}

export default App
