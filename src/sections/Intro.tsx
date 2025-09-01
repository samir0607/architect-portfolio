import { Ms_Madi } from "next/font/google";
import TextType from "../components/TextType";

export default function Intro() {
  return (
	<>
		<div className="grid md:grid-cols-2 items-center gap-6 h-screen">
			<div className="md:w-[500px]">
				<div className="text-2xl font-light text-gray-200">Hi, I'm</div>
				<div className="text-6xl text-gray-300 font-bold">Anushka Thebe</div>
				<div className="mt-3 text-2xl">
					I'm 
					<TextType className="ml-3 w-[240px] border rounded-xl shadow-[0_0_15px_3px_rgba(0,115,180,0.7),0_0_40px_10px_rgba(0,223,128,0.4)]" text={[" an Architect Student", " a Passionate Vlogger", " a Creative Artist"]}/> 
				</div>
				<div className="text-lg text-gray mt-6"> 
					driven by the vision of designing spaces that harmonize aesthetics, functionality, and sustainability. My approach blends creative vision with technical precision to design environments that inspire, endure, and enhance everyday life. 
				</div>
			</div>
			<div className="flex justify-center h-[400] md:h-[600]">
				<img src="front.png" alt="Loading..." className="rounded-2xl shadow-[0_0_15px_3px_rgba(0,215,180,0.7),0_0_40px_10px_rgba(0,123,228,0.4)]"/>
			</div>
		</div>
	</>
  );
}
