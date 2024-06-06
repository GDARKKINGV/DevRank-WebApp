import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Terminal({ output, input, setInput }) {
  return (
    <div className="overflow-auto h-full flex flex-col gap-4">
      <div className="">
        <Label>Input</Label>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder=">>"
        />
      </div>
      <div className="">
        <Label>Output</Label>
        <Textarea
          value={output || ""}
          readOnly
          placeholder="Output will be displayed here"
        />
      </div>
    </div>
  );
}
