import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getChallengeByIdRequest, runCodeRequest } from "../api/challenges";
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
import Loader from "@/components/Loader";
import ReactModal from "react-modal";

export default function ChallengesDevPage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const navigate = useNavigate();

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
              "c88fdee80amshfed65df64218544p1d1593jsn13a189526832",
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
                "c88fdee80amshfed65df64218544p1d1593jsn13a189526832",
            },
          }
        );
        result = resultResponse.data;
      }

      if (result.status.id === 3) {
        setOutput(result.stdout);
      } else {
        setOutput(result.stderr || result.compile_output);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleComplete = async () => {
    if (!code) {
      toast({
        variant: "destructive",
        description: "Please write some code to run",
      });
      return;
    }

    const testResults = await Promise.all(
      challenge.testCases.map(async (testCase) => {
        const requestPayload = {
          source_code: code,
          language_id: 63, // ID para JavaScript en Judge0
          stdin: testCase.input,
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
                  "c88fdee80amshfed65df64218544p1d1593jsn13a189526832",
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
                    "c88fdee80amshfed65df64218544p1d1593jsn13a189526832",
                },
              }
            );
            result = resultResponse.data;
          }

          if (result.status.id === 3) {
            return {
              passed: result.stdout.trim() === testCase.output.trim(),
            };
          } else {
            return {
              passed: false,
            };
          }
        } catch (error) {
          return {
            passed: false,
          };
        }
      })
    );

    setTestResults(testResults);

    const allPassed = testResults.every((result) => result.passed);

    toast({
      variant: allPassed ? "default" : "destructive",
      description: allPassed
        ? "All test cases passed!"
        : "Some test cases failed. Check the output for more details.",
    });

    if (allPassed) {
      setShowCongratulations(true);
      setTimeout(() => {
        setShowCongratulations(false);
        navigate(`/challenges`);
      }, 5000);
    }
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

  const customStyles = {
    content: {
      width: "40vw", // Tamaño personalizado para el contenido del modal
      height: "20vh", // Altura automática para ajustarse al contenido
      margin: "auto", // Centrar el modal horizontalmente
      borderRadius: "8px", // Borde redondeado
      backgroundColor: "hsl(var(--background))", // Color de fondo del modal
      color: "var(--color-text)", // Color del texto del modal
      borderColor: "hsl(var(--border))", // Color del borde del modal
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Color de fondo del overlay (fondo desenfocado)
    },
  };

  return (
    <div>
      <Navbar />
      <ReactModal
        isOpen={showCongratulations}
        onRequestClose={() => setShowCongratulations(false)}
        contentLabel="Congratulations Modal"
        style={customStyles}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter ">
            Congratulations!
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
            You have successfully completed the challenge. You have earned{" "}
            <span className="icon-[mdi--star]"></span>
            {challenge.points} points. Keep up the great work and continue to
            learn and grow. Well done!
          </p>
        </div>
      </ReactModal>

      <div className="px-4 md:px-6">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={35} className="pr-2">
            <Card className="h-[72vh] overflow-auto">
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
          <ResizablePanel defaultSize={65} className="pl-2">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={55} className="pb-2">
                <Card className="relative h-full p-2">
                  <Editor
                    defaultLanguage="javascript"
                    defaultValue="//Debe recibir un input"
                    theme="vs-dark"
                    onChange={(value) => setCode(value)}
                    loading={<Loader />}
                    className="rounded-lg overflow-hidden"
                  />
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Button variant="outline" onClick={handleRunCode}>
                      Run
                    </Button>
                  </div>
                </Card>
              </ResizablePanel>
              <ResizableHandle className="border-4 bg-secondary" />
              <ResizablePanel defaultSize={45} className="pt-2 overflow-auto">
                <Card className="h-full">
                  <CardContent className="h-full overflow-auto">
                    <Terminal
                      output={output}
                      input={input}
                      setInput={setInput}
                    />
                    <div className="mt-4">
                      <h3 className="text-xl font-bold mb-2">Test Results</h3>
                      <ul>
                        {testResults.map((result, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            {result.passed ? (
                              <span class="icon-[mdi--checkbox-marked-circle-outline] text-green-600"></span>
                            ) : (
                              <span class="icon-[material-symbols--cancel-outline-rounded] text-red-600"></span>
                            )}
                            <span>Test {index + 1}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <footer className="p-4 md:p-6">
        <Card className="flex justify-between p-4">
          <Link variant="outline" to="/challenges">
            <Button variant="outline">Back</Button>
          </Link>
          <Button onClick={handleComplete}>Complete</Button>
        </Card>
      </footer>
    </div>
  );
}
