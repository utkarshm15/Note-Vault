"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"
 
const subjects = [
  {
    value: "Mathematics",
    label: "Mathematics",
  },
  {
    value: "Physics",
    label: "Physics",
  },
  {
    value: "Java",
    label: "Java",
  },
  {
    value: "Electrical and Electronics",
    label: "Electrical and Electronics",
  },
  {
    value: "Python",
    label: "Python",
  },
  {
    value: "DSA",
    label: "DSA",
  },
  {
    value: "Operating Systems",
    label: "Operating Systems",
  },
  {
    value: "Computer Networking",
    label: "Computer Networking",
  },
  {
    value: "DBMS",
    label: "DBMS",
  },
]

const form = new FormData();
 

export function Upload(){
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
   
    return (<div className="w-2/4 mx-auto flex flex-col justify-center pt-20 sm:h-screen gap-4">
      <div className="text-center text-5xl font-semibold pb-10">Upload your Notes</div>
      <Input placeholder="Enter Title"></Input>
      <div className="mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="sm:w-[755px] justify-between"
          >
            {value
              ? subjects.find((subject) => subject.value === value)?.label
              : "Select subject..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search subject..." />
            <CommandList>
              <CommandEmpty>No subject found.</CommandEmpty>
              <CommandGroup>
                {subjects.map((subject) => (
                  <CommandItem
                    key={subject.value}
                    value={subject.value}
                    onSelect={(currentValue:string) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === subject.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {subject.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      </div>
      <Input type="file" className="cursor-pointer hover:bg-slate-100" required  onChange={(e)=>{
        if(e.target.files){
        return form.set("data",e.target.files[0])
        }
      }}></Input>
      <Button onClick={()=>console.log(form.get("data"))}>Submit</Button>
      </div>
    )
}