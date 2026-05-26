import { CheckCircle2 } from "lucide-react";

export function TrustIndicators({
  className = "",
  light = true,
}: {
  className?: string;
  light?: boolean;
}) {
  const colorClass = light ? "text-gray-500" : "text-white/60";
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${colorClass} ${className}`}>
      <span className="flex items-center gap-1.5">
        <CheckCircle2 className={`w-4 h-4 ${light ? "text-gold" : "text-white"}`} />
        Acesso vitalício
      </span>
      <span className="text-current/40 hidden sm:inline">·</span>
      <span className="flex items-center gap-1.5">
        <CheckCircle2 className={`w-4 h-4 ${light ? "text-gold" : "text-white"}`} />
        Sem mensalidade
      </span>
      <span className="text-current/40 hidden sm:inline">·</span>
      <span className="flex items-center gap-1.5">
        <CheckCircle2 className={`w-4 h-4 ${light ? "text-gold" : "text-white"}`} />
        Garantia 7 dias
      </span>
    </div>
  );
}
