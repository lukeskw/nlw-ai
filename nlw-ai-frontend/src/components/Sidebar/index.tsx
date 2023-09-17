import { Separator } from "../ui/separator";
import { VideoForm } from "./components/VideoForm";
import { PromptForm } from "./components/PromptForm";
import { useState } from "react";

export function Sidebar() {
  const [videoId, setVideoId] = useState<string | null>(null)

  return (
    <aside className="w-80 space-y-6">
      <VideoForm onVideoUploaded={setVideoId} />

      <Separator />

      <PromptForm />
    </aside>
  )
}