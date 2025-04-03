import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { examples } from "@/lib/examples";

interface ExerciseProps {
  title: string;
  description: string;
  borderColor: string;
}

function Exercise({ title, description, borderColor }: ExerciseProps) {
  return (
    <Card className={`p-4 rounded-lg shadow border-l-4 ${borderColor}`}>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <Button variant="link" className="text-primary p-0 h-auto text-sm">
        Show Example
      </Button>
    </Card>
  );
}

export default function Practice() {
  const [htmlCode, setHtmlCode] = useState("");
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const exampleId = searchParams.get("example");

  const { data: exampleData } = useQuery({
    queryKey: exampleId ? [`/api/examples/${exampleId}`] : null,
    enabled: !!exampleId,
  });

  useEffect(() => {
    if (exampleId && !exampleData) {
      // While waiting for API, use local examples
      const localExample = examples.find(ex => ex.id.toString() === exampleId);
      if (localExample) {
        setHtmlCode(localExample.code);
      }
    } else if (exampleData) {
      setHtmlCode(exampleData.code);
    }
  }, [exampleId, exampleData]);

  const handleCodeChange = (code: string) => {
    setHtmlCode(code);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold mb-4">HTML Practice</h1>
      <p className="text-lg text-gray-600 max-w-3xl mb-8">
        Write your HTML code in the editor below and see the result in real-time. Try out different tags and attributes to build your HTML skills.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <CodeEditor initialValue={htmlCode} onChange={handleCodeChange} />
          <div className="mt-4 text-sm text-gray-500 flex items-center">
            <i className="fas fa-lightbulb text-amber-500 mr-2"></i>
            <span>Tip: Try changing the title and adding more elements to see the changes in real-time!</span>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <LivePreview htmlCode={htmlCode} />
        </div>
      </div>
      
      {/* Exercise Suggestions */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Try These Exercises</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Exercise 
            title="Create a Profile Card" 
            description="Build a personal profile card with name, image and social links."
            borderColor="border-primary"
          />
          <Exercise 
            title="Build a Navigation Menu" 
            description="Create a horizontal navigation bar with links to different pages."
            borderColor="border-indigo-500"
          />
          <Exercise 
            title="Design a Contact Form" 
            description="Create a form with various input types and a submit button."
            borderColor="border-emerald-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
