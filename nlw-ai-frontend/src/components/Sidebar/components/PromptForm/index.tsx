import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Wand2 } from "lucide-react";
import { PromptSelect } from "./prompt-select";
import { Slider } from "@/components/ui/slider";

interface PromptFormInterface {
  onPromptSelect: React.Dispatch<React.SetStateAction<string>>
  onPromptSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  onTemperatureChange: (temperature: number) => void
  temperature: number
}

export function PromptForm(props: PromptFormInterface){

  return (
    <form onSubmit={props.onPromptSubmit} className="space-y-5">
    <div className="space-y-2">
      <Label>Prompt</Label>
      <PromptSelect onPromptSelected={props.onPromptSelect} />

    </div>

    <Separator />

    <div className="space-y-2">
      <Label>Modelo</Label>
      <Select defaultValue="gpt3.5" disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
        </SelectContent>
      </Select>
      <span className="block text-xs text-muted-foreground italic">Você poderá customizar essa opção em breve</span>
    </div>

    <Separator />

    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <Label>Temperatura</Label>
      <Label>{props.temperature}</Label>

      </div>
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={[props.temperature]}
        onValueChange={value=> props.onTemperatureChange(value[0])}
      />
      <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo, porém possivelmente com mais erros.</span>
    </div>

    <Separator />

    <Button disabled={props.isLoading} type="submit" className="w-full">
      <Wand2 className="w-4 h-4 mr-2"/>
      Executar
    </Button>
  </form>
  )
}