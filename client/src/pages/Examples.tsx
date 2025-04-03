import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { examples } from "@/lib/examples";

type Category = "all" | "structure" | "text" | "links" | "lists" | "tables" | "forms" | "semantic";

export default function Examples() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [visibleExamples, setVisibleExamples] = useState(6);

  const { data: examplesData = examples } = useQuery({
    queryKey: ["/api/examples"],
  });

  const filteredExamples = selectedCategory === "all"
    ? examplesData
    : examplesData.filter(example => example.category === selectedCategory);

  const categoryLabels: Record<Category, string> = {
    all: "All Examples",
    structure: "Basic Structure",
    text: "Text Formatting",
    links: "Links & Images",
    lists: "Lists",
    tables: "Tables",
    forms: "Forms",
    semantic: "Semantic HTML"
  };

  const handleLoadMore = () => {
    setVisibleExamples(prev => prev + 6);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold mb-8">HTML Examples</h1>
      <p className="text-lg text-gray-600 max-w-3xl mb-12">
        Browse through our collection of HTML examples. Click on any card to view the code and try it yourself in our interactive editor.
      </p>
      
      <div className="mb-8">
        <div className="flex overflow-x-auto pb-4 space-x-4 mb-6 scrollbar-thin">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              onClick={() => setSelectedCategory(key as Category)}
              className="whitespace-nowrap"
            >
              {label}
            </Button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.slice(0, visibleExamples).map((example) => (
            <Card 
              key={example.id}
              className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <CardHeader className="p-4 bg-gray-900 text-white flex justify-between items-center">
                <span className="font-medium">{example.title}</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </CardHeader>
              <div className="p-4 border-b bg-gray-50">
                <div className="font-mono text-sm overflow-hidden max-h-[100px]">
                  <pre className="whitespace-pre-wrap break-all">
                    {example.code.substring(0, 200) + (example.code.length > 200 ? '...' : '')}
                  </pre>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-4">{example.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Badge variant={example.level === "beginner" ? "secondary" : "default"}>
                  {example.level.charAt(0).toUpperCase() + example.level.slice(1)}
                </Badge>
                <Button variant="link" asChild>
                  <Link href={`/practice?example=${example.id}`}>
                    Try it <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredExamples.length > visibleExamples && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={handleLoadMore}
            >
              Load More Examples
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
