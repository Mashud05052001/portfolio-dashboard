import {
  Code2,
  Github,
  Linkedin,
  LucideIcon,
  Mail,
  Palette,
  Terminal,
} from "lucide-react";

interface SkillBadgeProps {
  Icon: LucideIcon;
  text: string;
  iconColor: string;
}

function SkillBadge({ Icon, text, iconColor }: SkillBadgeProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
      <Icon className={iconColor} size={20} />
      <span className="text-gray-800">{text}</span>
    </div>
  );
}

// Main App Component
function InitialPage() {
  return (
    <div className="min-h-[90vh]">
      <main className="container mx-auto px-6  pb-32 min-h-[90vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Mashudur Rahman Mahi
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Full-Stack Developer & Creative Problem Solver
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <SkillBadge
              Icon={Code2}
              text="Web Development"
              iconColor="text-blue-600"
            />
            <SkillBadge
              Icon={Terminal}
              text="Backend Solutions"
              iconColor="text-purple-600"
            />
            <SkillBadge
              Icon={Palette}
              text="UI/UX Design"
              iconColor="text-pink-600"
            />
          </div>
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/Mashud05052001/"
              className="hover:text-blue-600 text-gray-700 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/mashudur-rahman-mahi-311263244/"
              className="hover:text-blue-600 text-gray-700 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:masudmahi0505@gmail.com"
              className="hover:text-blue-600 text-gray-700 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InitialPage;
