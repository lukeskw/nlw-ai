import { Separator } from "../ui/separator";
import { VideoForm } from "./components/VideoForm";
import { PromptForm } from "./components/PromptForm";

export function Sidebar() {
  return (
    <aside className="w-80 space-y-6">
      <VideoForm />

      <Separator />

      <PromptForm />
    </aside>
  )
}