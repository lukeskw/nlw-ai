import { Github } from "lucide-react";
import { Button, buttonVariants  } from "../ui/button";
import { Separator } from "../ui/separator";

export function Header(){
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.ai</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Desenvolvido com ❤ por
            <a target="_blank" className="text-muted-default font-bold hover:brightness-125" href="https://porfiriodev.vercel.app"> porfirio.dev</a>
        </span>

        <Separator orientation="vertical" className="h-6" />

        <Button asChild variant="secondary">
          <a target="_blank" href="https://github.com/lukeskw/">
            <Github className="w-4 h-4 mr-2"/>
            Github

          </a>
        </Button>
      </div>
    </div>
  )
}