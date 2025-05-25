import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, HelpCircle, Settings, Shield, Users, BarChart, Phone, Mail, MapPin, Star } from "lucide-react";
import MeasurementForm from "@/components/measurement-form";
import ResultsDisplay from "@/components/results-display";
import type { Measurement, AnalysisResult } from "@shared/schema";

interface MeasurementResponse {
  measurement: Measurement;
  analysis: AnalysisResult;
  strengths: string[];
  improvements: string[];
}

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [measurementData, setMeasurementData] = useState<MeasurementResponse | null>(null);

  const handleMeasurementComplete = (data: MeasurementResponse) => {
    setMeasurementData(data);
    setShowResults(true);
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-container');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNewMeasurement = () => {
    setShowResults(false);
    setMeasurementData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Modern Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="fitness-icon animated-pulse">
                <Bike className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="gradient-text">MotionBike</span>
                  <span className="text-gray-700 mx-2">|</span>
                  <span className="text-gray-800">KidsMotion</span>
                </h1>
                <p className="text-sm text-gray-600 font-medium">AI 기반 아동 체력 분석 플랫폼</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#home" className="text-gray-700 hover:text-primary font-medium transition-colors">홈</a>
                <a href="#analysis" className="text-gray-700 hover:text-primary font-medium transition-colors">분석</a>
                <a href="#about" className="text-gray-700 hover:text-primary font-medium transition-colors">소개</a>
                <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition-colors">문의</a>
              </nav>
              <div className="flex items-center space-x-3">
                <button className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-gray-700 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-2xl bg-white/60 hover:bg-white/80 text-gray-700 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <MeasurementForm onComplete={handleMeasurementComplete} />
        ) : (
          <div id="results-container">
            {measurementData && (
              <ResultsDisplay 
                data={measurementData}
                onNewMeasurement={handleNewMeasurement}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
