import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChallengeByIdRequest } from "../api/challenges";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editor } from "@monaco-editor/react";
import Terminal from "@/components/Terminal";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export default function ChallengesDevPage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const getChallenge = async () => {
    try {
      const res = await getChallengeByIdRequest(challengeId);
      setChallenge(res.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };

  const handleRunCode = async () => {
    if (!code) {
      toast({
        variant: "destructive",
        description: "Please write some code to run",
      });
      return;
    }

    const requestPayload = {
      source_code: code,
      language_id: 63, // ID para JavaScript en Judge0
      stdin: input,
    };

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        requestPayload,
        {
          headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "fa9513a8afmsh7348594e9df017fp187023jsn8f27720a7d95",
          },
        }
      );

      const token = response.data.token;

      let result = null;

      while (!result || result.status.id <= 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const resultResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "content-type": "application/json",
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key":
                "fa9513a8afmsh7348594e9df017fp187023jsn8f27720a7d95",
            },
          }
        );
        result = resultResponse.data;
      }

      console.log(result);
      if (result.status.id === 3) {
        setOutput(result.stdout);
      } else {
        setOutput(result.stderr || result.compile_output);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleBack = () => {
    // Función para retroceder a la página anterior
  };

  const handleComplete = () => {
    // Función para avanzar a la siguiente página
  };

  useEffect(() => {
    getChallenge();
  }, [challengeId]);

  if (!challenge) {
    return (
      <div>
        <Navbar />
        <div className="container space-y-12 px-4 md:px-6">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-40 w-full mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-6">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} className="pr-2">
            <Card className=" overflow-auto">
              <CardHeader>
                <CardTitle>{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold mb-2">Instructions</h3>
                <p>{challenge.instructions.description}</p>

                <h3 className="text-xl font-bold mt-4 mb-2">Example</h3>
                <p>{challenge.instructions.example}</p>

                <h3 className="text-xl font-bold mt-4 mb-2">Input format</h3>
                <p>{challenge.instructions.input}</p>

                <h3 className="text-xl font-bold mt-4 mb-2">Output format</h3>
                <p>{challenge.instructions.output}</p>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle className="border-4 bg-secondary" />
          <ResizablePanel defaultSize={50} className="pl-2">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={55} className="pb-2">
                <div className="relative h-full">
                  <Editor
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    onChange={(value) => setCode(value)}
                  />
                  <div className="absolute bottom-4 right-4">
                    <Button variant="outline" onClick={handleRunCode}>
                      Run
                    </Button>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle className="border-4 bg-secondary" />
              <ResizablePanel defaultSize={45} className="pt-2">
                <Card>
                  <CardContent>
                    <Terminal
                      output={output}
                      input={input}
                      setInput={setInput}
                    />
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <footer className="p-4 md:p-6">
        <Card className="flex justify-between p-4">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>

          <Button onClick={handleComplete}>Complete</Button>
        </Card>
      </footer>
    </div>
  );
}
