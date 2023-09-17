import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FileVideo, Upload } from "lucide-react";

export function VideoForm(){
  return (
    <form className="space-y-4">
    <label
    htmlFor="video"
    className="border flex rounded-md aspect-video cursor-pointer border-dashed
    text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-secondary"
    >
      <FileVideo className="w-4 h-4"/>
      Selecione um vídeo
    </label>
    <input type="file" id="video" accept="video/mp4" className="sr-only"/>
    <Separator />

    <div className="space-y-1">
      <Label htmlfor="transcription-prompt">Prompt de Transcrição</Label>
      <Textarea
        id="transcription-prompt"
        className="h-20 leading-relaxed resize-none"
        placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
      />
    </div>
      <Button type="submit" className="w-full">
        <Upload className="w-4 h-4 mr-2" />
        Carregar vídeo
      </Button>
  </form>
  )
}