import Navigation from "@/components/navigation";
import SimpleMeasurementHistory from "@/components/simple-measurement-history";

interface RecordsProps {
  onNavigate?: (page: string) => void;
}

export default function Records({ onNavigate }: RecordsProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <div className="pt-20">
        <SimpleMeasurementHistory />
      </div>
    </div>
  );
}