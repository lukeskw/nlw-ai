import { Textarea } from "../ui/textarea";

export function TextAreaSection() {
  return (
    <section className="flex flex-col flex-1 gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="resize-none p-5 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
        />
        <Textarea
          className="resize-none p-5 leading-relaxed cursor-default"
          placeholder="Resultado gerado pela IA..."
          readOnly
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no
        seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</p>
    </section>
  )
}