import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Learn HTML by <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Practicing</span> on the go
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                The simplest way to master HTML. Code, preview, and learn with interactive examples - no setup required.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-medium">
                  <Link href="/practice">
                    Start Coding Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-medium">
                  <Link href="/examples">
                    Explore Examples
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <i className="fas fa-code text-primary"></i>
                  <span>100+ Examples</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-bolt text-primary"></i>
                  <span>Live Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-laptop-code text-primary"></i>
                  <span>Beginner Friendly</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500/10 rounded-full"></div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-gray-900 p-3 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-white text-sm">index.html</div>
                  </div>
                  <div className="p-4 font-mono text-sm bg-gray-900 text-white overflow-auto">
                    <pre className="text-left">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to HTMLPractice!</p>
</body>
</html>`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn HTML with Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-laptop-code text-xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Code Editor</h3>
              <p className="text-gray-600">
                Practice HTML directly in your browser with our built-in code editor with syntax highlighting.
              </p>
            </div>
            
            {/* Feature card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-eye text-xl text-indigo-500"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Preview</h3>
              <p className="text-gray-600">
                See your HTML render in real-time as you type, making learning visual and intuitive.
              </p>
            </div>
            
            {/* Feature card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-graduation-cap text-xl text-emerald-500"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Examples</h3>
              <p className="text-gray-600">
                Explore a wide range of examples from basic tags to complex layouts and semantic HTML.
              </p>
            </div>
            
            {/* Feature card 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-bug text-xl text-amber-500"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Error Detection</h3>
              <p className="text-gray-600">
                Get instant feedback on your code with our error highlighting and suggestions.
              </p>
            </div>
            
            {/* Feature card 5 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-mobile-alt text-xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
              <p className="text-gray-600">
                Learn how to create websites that look great on all devices with our responsive examples.
              </p>
            </div>
            
            {/* Feature card 6 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-save text-xl text-indigo-500"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save & Share</h3>
              <p className="text-gray-600">
                Save your progress and share your code with others to get feedback and collaborate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
