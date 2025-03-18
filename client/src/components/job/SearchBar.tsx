import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string, location: string, category: string, level: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem('query') as HTMLInputElement).value;
    const location = (form.elements.namedItem('location') as HTMLInputElement).value;
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
    const level = (form.elements.namedItem('level') as HTMLSelectElement).value;
    onSearch(query, location, category, level);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex gap-4 w-full max-w-4xl relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex-1 relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
        <Input
          name="query"
          placeholder="Job title, keyword, or company"
          className="pl-10 bg-background/40 hover:bg-background/60 focus:bg-background/80 
            backdrop-blur-sm border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.1)]
            transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
        />
      </div>
      <div className="flex-1 relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
        <Input
          name="location"
          placeholder="Location"
          className="pl-10 bg-background/40 hover:bg-background/60 focus:bg-background/80 
            backdrop-blur-sm border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.1)]
            transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
        />
      </div>
      <select
        name="category"
        className="flex-1 px-4 py-2 rounded-md bg-background/40 hover:bg-background/60 focus:bg-background/80 
          backdrop-blur-sm border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.1)]
          transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      >
        <option value="Computer and IT">Computer and IT</option>
        <option value="Software Engineering">Software Engineering</option>
        <option value="Data Science">Data Science</option>
        <option value="Design">Design</option>
      </select>
      <select
        name="level"
        className="flex-1 px-4 py-2 rounded-md bg-background/40 hover:bg-background/60 focus:bg-background/80 
          backdrop-blur-sm border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.1)]
          transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      >
        <option value="">Any Level</option>
        <option value="Entry Level">Entry Level</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior Level">Senior Level</option>
      </select>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          type="submit" 
          className="px-8 bg-gradient-to-r from-primary to-primary/70 
            hover:opacity-90 shadow-lg hover:shadow-primary/20 
            transition-all duration-300 font-semibold"
        >
          Find Jobs
        </Button>
      </motion.div>
    </motion.form>
  );
}