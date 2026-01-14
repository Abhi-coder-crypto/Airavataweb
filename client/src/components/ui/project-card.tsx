import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "./glass-card";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  onViewDetails: () => void;
}

export default function ProjectCard({ title, description, image, tags, onViewDetails }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group"
    >
      <GlassCard className="neumorphism rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Button
            onClick={onViewDetails}
            variant="ghost"
            className="text-blue-500 font-semibold hover:text-cyan-500 transition-colors duration-300 p-0 h-auto"
          >
            View Details <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
