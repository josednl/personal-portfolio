import { PageContainer } from "@/components/layout/PageContainer";
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Education } from "@/components/sections/Education";
import { Contact } from '@/components/sections/Contact';
import { WorkExperience } from "@/components/sections/WorkExperience";

function App() {
  return (
    <PageContainer>
      <About />
      <Projects />
      {/* <WorkExperience /> */}
      <Education />
      <Contact />
    </PageContainer>
  )
}

export default App
