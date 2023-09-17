import { Sidebar } from "../Sidebar";
import { TextAreaSection } from "../TextAreaSection";

export function Main(){
 return (
  <main className="flex-1 p-6 flex gap-6">
    <TextAreaSection />
    <Sidebar />
  </main>
 )
}