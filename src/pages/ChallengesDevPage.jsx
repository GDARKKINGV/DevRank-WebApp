import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChallengeByIdRequest } from "../api/challenges";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChallengesDevPage() {
  const { challengeId } = useParams();

  const [challenge, setChallenge] = useState(null);

  const getChallenge = async () => {
    try {
      const res = await getChallengeByIdRequest(challengeId);
      setChallenge(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [code, setCode] = useState(""); // Estado para almacenar el código introducido por el usuario

  const handleRunCode = () => {
    // Función para ejecutar el código
    // Aquí podrías enviar el código a un servidor para su ejecución
  };

  const handleBack = () => {
    // Función para retroceder a la página anterior
  };

  const handleNext = () => {
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
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[70vh] rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">Instructions</h2>
              <p className="text-gray-600">
                Here you can provide instructions for the challenge development.
                Include headings, subheadings, and any textual content necessary
                to guide the user through the challenge.
              </p>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={75}>
                {
                  // Aquí podrías mostrar el editor de código
                }
                <div className=" flex p-2 items-end h-full">
                  <Button variant="outline" onClick={handleRunCode}>
                    Run
                  </Button>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={25}>
                {
                  // Aquí podrías mostrar la consola
                }
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <footer className="px-4 md:p-6">
        <Card className="flex justify-between p-4">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>Complete</Button>
        </Card>
      </footer>
    </div>
  );
}
