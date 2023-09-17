import { useState } from "react";
import { Sidebar } from "../Sidebar";
import { TextAreaSection } from "../TextAreaSection";
import { useCompletion } from "ai/react";

interface MainProps {
  temperature: number,
  videoId: string
}

export function Main(props: MainProps){

  const [videoId, setVideoId] = useState<string | null>(null)
  const [temperature, setTemperature] = useState<number>(0.5)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading

  } = useCompletion({
    api: 'http://localhost:3333/ai/completed',
    body: {
      videoId,
      temperature
    },
    headers: {
      'Content-type': 'application/json'
    }
  })

 return (
  <main className="flex-1 p-6 flex gap-6">
    <TextAreaSection textAreaInput={input} textAreaChange={handleInputChange} textAreaCompletion={completion} />
    <Sidebar
      completionSetInput={setInput}
      completionSubmit={handleSubmit}
      isLoading={isLoading}
      temperature={temperature}
      onTemperatureChange={setTemperature}
      onVideoIdChange={setVideoId}
      />
  </main>
 )
}