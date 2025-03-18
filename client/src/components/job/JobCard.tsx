import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Briefcase } from "lucide-react";

interface JobCardProps {
  job: {
    name: string;
    company: {
      name: string;
    };
    locations: Array<{ name: string }>;
    levels: Array<{ name: string }>;
    refs: {
      landing_page: string;
    };
  };
}

export default function JobCard({ job }: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleApply = () => {
    window.open(job.refs.landing_page, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="w-full h-full bg-background/40 hover:bg-background/60
          backdrop-blur-[8px] border-white/10 
          shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] 
          transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <h3 className="font-semibold text-lg text-foreground/90 hover:text-foreground transition-colors">
              {job.name}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <div className="p-1 rounded-full bg-background/60 backdrop-blur-none">
                <Building className="h-4 w-4" />
              </div>
              <span>{job.company.name}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-full bg-primary/10 backdrop-blur-none"
          >
            <Briefcase className="h-5 w-5 text-primary" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <div className="p-1 rounded-full bg-background/60 backdrop-blur-none">
              <MapPin className="h-4 w-4" />
            </div>
            <span>{job.locations[0]?.name}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.levels.map((level) => (
              <Badge 
                key={level.name} 
                variant="secondary" 
                className="bg-primary/5 hover:bg-primary/10 text-primary/80
                  backdrop-blur-none border-primary/20 transition-colors"
              >
                {level.name}
              </Badge>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary/70 
                hover:opacity-90 transition-colors shadow-lg font-semibold
                hover:shadow-primary/20"
              onClick={handleApply}
            >
              Apply Now
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}