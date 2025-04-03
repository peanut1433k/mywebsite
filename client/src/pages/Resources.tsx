import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Resources() {
  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold mb-8">HTML Resources</h1>
      <p className="text-lg text-gray-600 max-w-3xl mb-12">
        Explore our collection of helpful resources to enhance your HTML learning journey.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-primary to-indigo-500 flex items-center justify-center">
            <i className="fas fa-book text-4xl text-white"></i>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">HTML Cheat Sheet</h3>
            <p className="text-gray-600 mb-4">
              A comprehensive reference of HTML tags, attributes, and their usage with examples.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary">
              Download PDF
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <i className="fas fa-video text-4xl text-white"></i>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
            <p className="text-gray-600 mb-4">
              Step-by-step video lessons covering everything from basics to advanced HTML concepts.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary">
              Browse Videos
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <i className="fas fa-puzzle-piece text-4xl text-white"></i>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Practice Projects</h3>
            <p className="text-gray-600 mb-4">
              Complete HTML projects with source code and step-by-step instructions to build your portfolio.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary">
              View Projects
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
            <i className="fas fa-question-circle text-4xl text-white"></i>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">FAQ & Troubleshooting</h3>
            <p className="text-gray-600 mb-4">
              Solutions to common HTML problems and answers to frequently asked questions.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary">
              Read FAQ
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center">
            <i className="fas fa-code-branch text-4xl text-white"></i>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
            <p className="text-gray-600 mb-4">
              Guidelines and conventions for writing clean, maintainable, and accessible HTML code.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary">
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-amber-500 to-emerald-500 flex items-center justify-center">
            <i className="fas fa-users text-4xl text-white"></i>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Community Forum</h3>
            <p className="text-gray-600 mb-4">
              Join our community of HTML learners to ask questions, share knowledge, and get help.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary">
              Join Discussion
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
