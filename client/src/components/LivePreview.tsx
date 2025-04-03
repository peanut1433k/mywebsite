import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  htmlCode: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";

export default function LivePreview({ htmlCode }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  
  useEffect(() => {
    updateIframeContent();
  }, [htmlCode]);
  
  const updateIframeContent = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(htmlCode);
        doc.close();
      }
    }
  };
  
  const handleRun = () => {
    updateIframeContent();
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Live Preview</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="success" 
            onClick={handleRun} 
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <i className="fas fa-play mr-1"></i> Run
          </Button>
          <Button
            variant={viewMode === "desktop" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("desktop")}
            title="Desktop View"
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "tablet" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("tablet")}
            title="Tablet View"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "mobile" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("mobile")}
            title="Mobile View"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[464px]">
        <div className="bg-gray-100 p-3 flex items-center border-b">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="ml-4 text-sm">Preview</div>
        </div>
        <div 
          className={cn(
            "bg-white p-0 h-full w-full transition-all duration-300 overflow-auto flex items-start justify-center",
            viewMode === "desktop" ? "p-0" : "p-4",
            viewMode === "tablet" ? "max-w-[768px] mx-auto" : "",
            viewMode === "mobile" ? "max-w-[375px] mx-auto" : ""
          )}
        >
          <iframe
            ref={iframeRef}
            title="HTML Preview"
            className={cn(
              "border-0 h-full transition-all duration-300",
              viewMode === "desktop" ? "w-full" : "",
              viewMode === "tablet" ? "w-[768px]" : "",
              viewMode === "mobile" ? "w-[375px]" : ""
            )}
            sandbox="allow-same-origin"
          ></iframe>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500">
          <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
          <span>Tip: Click Run to see changes or enable auto-run in settings</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex items-center">
            <i className="fas fa-save mr-1"></i> Save
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <i className="fas fa-share-alt mr-1"></i> Share
          </Button>
        </div>
      </div>
    </div>
  );
}
