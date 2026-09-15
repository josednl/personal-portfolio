import { Code2 } from 'lucide-react';

const TECH_ICON_SRC: Record<string, string> = {
  React: '/icons/react_light.svg',
  TailwindCSS: '/icons/tailwindcss.svg',
  'Node.js': '/icons/nodejs.svg',
  Express: '/icons/express.svg',
  PostgreSQL: '/icons/postgresql.svg',
  Prisma: '/icons/prisma.svg',
  Git: '/icons/git.svg',
  Figma: '/icons/figma.svg',
  'VS Code': '/icons/vscode.svg',
  Vite: '/icons/vite.svg',
  JavaScript: '/icons/javascript.svg',
  TypeScript: '/icons/typescript.svg',
  OpenCode: '/icons/opencode.svg',
};

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon = ({ name, className }: TechIconProps) => {
  const src = TECH_ICON_SRC[name];

  if (!src) {
    return <Code2 size={14} className={className} aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt=""
      width={14}
      height={14}
      className={`${className ?? ''} h-3.5 w-3.5 object-contain`}
    />
  );
};