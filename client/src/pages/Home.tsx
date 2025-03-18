import SearchBar from "@/components/job/SearchBar";
import BackgroundAnimation from "@/components/hero/BackgroundAnimation";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleSearch = (query: string, location: string) => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (location) params.append("location", location);
    setLocation(`/jobs?${params.toString()}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[100px] z-0" />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <BackgroundAnimation />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative z-10"
        >
          <h1 className="text-6xl font-bold mb-6 flex flex-wrap justify-center items-center gap-x-4">
            <span className="text-foreground">Find</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70" style={{ backgroundSize: "200% 100%" }}>
              Your Dream Job
            </span>
            <span className="text-primary">in Tech</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of job opportunities for developers, designers, and tech professionals.
            Join our community of innovators and creators.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl relative z-10"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-muted-foreground relative z-10"
        >
          Popular: 
          <span className="ml-2 font-medium">
            React • JavaScript • Remote • Full Stack
          </span>
        </motion.div>
      </main>
    </div>
  );
}