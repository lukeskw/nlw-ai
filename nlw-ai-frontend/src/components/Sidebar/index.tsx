import { Separator } from "../ui/separator";
import { VideoForm } from "./components/VideoForm";
import { PromptForm } from "./components/PromptForm";

interface SidebarPropsInterface{
  completionSetInput: React.Dispatch<React.SetStateAction<string>>
  completionSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  temperature: number
  onTemperatureChange: React.Dispatch<React.SetStateAction<number>>
  onVideoIdChange: React.Dispatch<React.SetStateAction<string | null>>
}

export function Sidebar(props:SidebarPropsInterface) {

  return (
    <aside className="w-80 space-y-6">
      <VideoForm onVideoUploaded={props.onVideoIdChange} />

      <Separator />

      <PromptForm onTemperatureChange={props.onTemperatureChange} temperature={props.temperature} onPromptSelect={props.completionSetInput} onPromptSubmit={props.completionSubmit} isLoading={props.isLoading} />
    </aside>
  )
}