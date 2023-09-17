import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Wand2 } from "lucide-react";
import { PromptSelect } from "./prompt-select";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export function PromptForm(){

  const [temperature, setTemperature] = useState(0.5)

  function handlePromptSelected (template:string) {
    console.log(template)
  }

  return (
    <form className="space-y-6">
    <div className="space-y-2">
      <Label>Prompt</Label>
      <PromptSelect onPromptSelected={handlePromptSelected} />

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
      <Label>{temperature}</Label>

      </div>
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={[temperature]}
        onValueChange={value=> setTemperature(value[0])}
      />
      <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo, porém possivelmente com mais erros.</span>
    </div>

    <Separator />

    <Button type="submit" className="w-full">
      <Wand2 className="w-4 h-4 mr-2"/>
      Executar
    </Button>
  </form>
  )
}