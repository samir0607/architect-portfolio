import Projects from "../sections/Projects";
import Intro from "../sections/Intro";
import Activity from "../sections/Activity";
import Contact from "../sections/Contact";
import Skills from "../sections/Skills";

export default function Home() {
  return (
    <div className="h-full px-10 md:px-40">
      <Intro></Intro>
      <Projects></Projects>
      <Activity></Activity>
      <Skills></Skills>
      {/* <Contact></Contact> */}
    </div>
  );
}
