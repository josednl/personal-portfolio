import {
  Cpu,
  Lightbulb,
  BarChart3,
  ShieldCheck,
  BookOpen,
  LucideIcon,
} from 'lucide-react';

interface DetailSectionProps {
  title: string;
  text: string;
}

const getIcon = (title: string): LucideIcon => {
  const t = title.toLowerCase();
  if (t.includes('arch') || t.includes('arquitectura')) return Cpu;
  if (t.includes('decis') || t.includes('tech')) return Lightbulb;
  if (t.includes('metr') || t.includes('metric')) return BarChart3;
  if (t.includes('prob') || t.includes('solv')) return ShieldCheck;
  return BookOpen;
};

export const DetailSection = ({ title, text }: DetailSectionProps) => {
  const Icon = getIcon(title);

  return (
    <div className="group/section relative pl-8 pb-2">
      <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-primary/10 dark:bg-primary/30 group-last/section:bg-transparent" />

      <div className="absolute left-0 top-0 p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-primary/20 dark:border-primary/30 shadow-sm transition-transform">
        <Icon className="w-3.5 h-3.5 text-primary" />
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.15em]">
          {title}
        </h4>

        <div className="relative overflow-hidden rounded-xl bg-white/40 dark:bg-gray-900/40 p-3 border border-transparent transition-all group-hover/section:border-primary/20 dark:group-hover/section:border-primary/30 group-hover/section:shadow-sm">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
            {text}
          </p>

          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl transition-opacity opacity-0 group-hover/section:opacity-100" />
        </div>
      </div>
    </div>
  );
};
