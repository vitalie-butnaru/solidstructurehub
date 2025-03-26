
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { getLocalizedContent } from "@/utils/languageUtils";

interface ProjectLightboxProps {
  project: {
    id: string;
    title: string | { ro: string; en: string; ru: string };
    description: string | { ro: string; en: string; ru: string };
    category?: string | { ro: string; en: string; ru: string };
    imageSrc: string;
    date?: string;
  };
  children: React.ReactNode;
}

const ProjectLightbox = ({ project, children }: ProjectLightboxProps) => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "ro";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer h-full">{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-0 bg-white overflow-hidden">
        <div className="relative flex flex-col md:flex-row max-h-[80vh]">
          <div className="md:w-1/2 h-[300px] md:h-auto relative">
            <img
              src={project.imageSrc}
              alt={typeof project.title === 'string' ? project.title : project.title[lang as keyof typeof project.title]}
              className="w-full h-full object-cover"
            />
            {project.category && (
              <div className="absolute top-3 left-3 bg-construction-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                {getLocalizedContent(project.category, lang)}
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-6 overflow-y-auto">
            <h3 className="text-2xl font-bold text-construction-900 mb-4">
              {getLocalizedContent(project.title, lang)}
            </h3>
            <p className="text-construction-600 mb-6">
              {getLocalizedContent(project.description, lang)}
            </p>
            {project.date && (
              <div className="text-sm text-construction-500 mt-auto">
                {project.date}
              </div>
            )}
          </div>
          <button
            className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-construction-900" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectLightbox;
