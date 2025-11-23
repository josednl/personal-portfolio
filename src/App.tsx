import { PageContainer } from "@/components/layout/PageContainer";
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Education } from "@/components/sections/Education";

function App() {
  return (
    <PageContainer>
      <About />
      <Projects />
      <Education />
    </PageContainer>
  )
}

export default App
