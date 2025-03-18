import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import SearchBar from "@/components/job/SearchBar";
import JobCard from "@/components/job/JobCard";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Jobs() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const { user } = useAuth();

  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ['/api/jobs', searchParams.toString()],
    queryFn: async () => {
      console.log(searchParams);
      
      try {
        const res = await fetch(`https://www.themuse.com/api/public/jobs?page=10&descending=true${
          searchParams.get('q') ? `&q=${searchParams.get('q')}` : ''
        }${
          searchParams.get('location') ? `&location=${searchParams.get('location')}` : ''
        }${
          searchParams.get('category') ? `&category=${searchParams.get('category')}` : ''
        }${
          searchParams.get('level') ? `&level=${searchParams.get('level')}` : ''
        }`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        return data.results;
      } catch (err) {
        console.error('Error fetching jobs:', err);
        throw new Error('Failed to fetch jobs. Please try again later.');
      }
    },
    enabled: !!user // Only fetch when user is authenticated
  });

  const handleSearch = (query: string, location: string, category: string, level: string) => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (location) params.append("location", location);
    if (category) params.append("category", category);
    if (level) params.append("level", level);
    setLocation(`/jobs?${params.toString()}`);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Please Login to View Jobs</h2>
          <p className="text-muted-foreground mb-8">
            Create an account or login to access our job listings
          </p>
          <Button 
            onClick={() => setLocation("/login")}
            className="bg-gradient-to-r from-primary to-primary/70 hover:opacity-90"
          >
            Login to Continue
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="w-full h-48 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error?.message || 'Failed to load jobs'}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {jobs?.map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </motion.div>
      )}
    </div>
  );
}