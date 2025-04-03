import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Code, Eye, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyProjects() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [previewCode, setPreviewCode] = useState("");

  // Fetch saved work
  const { data: savedWorks = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/user/saved-work'],
    enabled: isAuthenticated,
  });

  // Delete saved work mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/saved-work/${id}`, 'DELETE');
    },
    onSuccess: () => {
      toast({
        title: "Project deleted",
        description: "Your project has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/saved-work'] });
      setSelectedWorkId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle viewing a saved work
  const handleViewWork = (work: any) => {
    setSelectedWorkId(work.id);
    setPreviewCode(work.htmlContent);
  };

  // Handle deleting a saved work
  const handleDeleteWork = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center py-10 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to view your saved projects.
          </p>
          <Button onClick={() => window.scrollTo(0, 0)}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">My Saved Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-24 w-full rounded-md" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (selectedWorkId && savedWorks) {
    const selectedWork = savedWorks.find((work: any) => work.id === selectedWorkId);
    
    if (!selectedWork) {
      return null;
    }

    return (
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="mb-6 flex justify-between items-center">
          <Button variant="outline" onClick={() => setSelectedWorkId(null)}>
            Back to All Projects
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(selectedWork.createdAt || Date.now()), 'MMM d, yyyy')}
          </Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">{selectedWork.title}</h1>
        
        <Tabs defaultValue="preview" className="mb-8">
          <TabsList>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" /> Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" /> Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px]">
            <LivePreview htmlCode={previewCode} />
          </TabsContent>
          <TabsContent value="code">
            <CodeEditor 
              initialValue={selectedWork.htmlContent}
              onChange={setPreviewCode}
              onRun={() => {}}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  project and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteWork(selectedWork.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Saved Projects</h1>
      
      {(!savedWorks || savedWorks.length === 0) ? (
        <div className="text-center py-10 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <Code className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Projects Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't saved any HTML projects yet. Start creating in the Practice area!
          </p>
          <Button onClick={() => window.location.href = '/practice'}>
            Go to Practice
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedWorks.map((work: any) => (
            <Card key={work.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{work.title || 'Untitled Project'}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(work.createdAt || Date.now()), 'MMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div 
                  className="h-32 border rounded overflow-hidden bg-gray-50 dark:bg-gray-900 text-xs p-2 font-mono"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {work.htmlContent.substring(0, 150)}
                  {work.htmlContent.length > 150 && '...'}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => handleViewWork(work)}
                >
                  <Eye className="h-4 w-4 mr-2" /> View
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        project and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteWork(work.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}