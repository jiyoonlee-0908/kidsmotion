import SimpleMeasurementHistory from "@/components/simple-measurement-history";
import CommonFooter from "@/components/common-footer";

interface RecordsProps {
  onNavigate?: (page: string) => void;
}

export default function Records({ onNavigate }: RecordsProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24">
        <SimpleMeasurementHistory />
      </div>
      <CommonFooter onNavigate={onNavigate} />
    </div>
  );
}