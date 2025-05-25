import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface PDFExportProps {
  data: {
    measurement: any;
    analysis: any;
    strengths: string[];
    improvements: string[];
  };
}

export default function PDFExport({ data }: PDFExportProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current) return;

    try {
      // Create a temporary container with the report content
      const reportContainer = document.createElement('div');
      reportContainer.style.position = 'absolute';
      reportContainer.style.left = '-9999px';
      reportContainer.style.top = '0px';
      reportContainer.style.width = '794px'; // A4 width in pixels
      reportContainer.style.background = 'white';
      reportContainer.style.padding = '40px';
      reportContainer.style.fontFamily = 'Arial, sans-serif';

      // Generate report HTML
      const reportHTML = `
        <div style="max-width: 714px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #7B5CFF; padding-bottom: 20px;">
            <h1 style="color: #7B5CFF; font-size: 28px; margin: 0; font-weight: bold;">
              KidsMotion 체력 분석 리포트
            </h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              MotionBike | 과학적 아동 체력 측정 시스템
            </p>
          </div>

          <!-- Student Info -->
          <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 18px; margin: 0 0 15px 0;">측정 정보</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div><strong>이름:</strong> ${data.measurement.studentName}</div>
              <div><strong>나이:</strong> ${data.measurement.age}세</div>
              <div><strong>성별:</strong> ${data.measurement.sex === 'M' ? '남자' : '여자'}</div>
              <div><strong>측정일:</strong> ${new Date(data.measurement.createdAt).toLocaleDateString('ko-KR')}</div>
            </div>
          </div>

          <!-- Overall Score -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #7B5CFF, #9575FF); color: white; border-radius: 12px;">
            <h2 style="margin: 0 0 10px 0; font-size: 24px;">종합 평가</h2>
            <div style="font-size: 36px; font-weight: bold; margin: 10px 0;">
              ${data.analysis.overallPercentile}백분위
            </div>
            <div style="font-size: 18px; opacity: 0.9;">
              ${getGradeFromPercentile(data.analysis.overallPercentile)}
            </div>
          </div>

          <!-- Detailed Scores -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 20px;">세부 평가</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              ${generateScoreCard('파워', data.analysis.percentiles.power, data.measurement.power)}
              ${generateScoreCard('근력', data.analysis.percentiles.strength, data.measurement.strength)}
              ${generateScoreCard('근지구력', data.analysis.percentiles.muscleEndurance, data.measurement.muscleEndurance)}
              ${generateScoreCard('심폐지구력', data.analysis.percentiles.cardioEndurance, data.measurement.cardioEndurance)}
            </div>
          </div>

          <!-- Balance Analysis -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">밸런스 분석</h2>
            <div style="background: #f8f9ff; padding: 20px; border-radius: 8px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; text-align: center;">
                <div>
                  <div style="font-size: 14px; color: #666; margin-bottom: 5px;">좌측</div>
                  <div style="font-size: 20px; font-weight: bold; color: #333;">${data.measurement.leftBalance}%</div>
                </div>
                <div>
                  <div style="font-size: 14px; color: #666; margin-bottom: 5px;">우측</div>
                  <div style="font-size: 20px; font-weight: bold; color: #333;">${data.measurement.rightBalance}%</div>
                </div>
                <div>
                  <div style="font-size: 14px; color: #666; margin-bottom: 5px;">상태</div>
                  <div style="font-size: 16px; font-weight: bold; color: ${getBalanceStatusColor(data.measurement.leftBalance, data.measurement.rightBalance)};">
                    ${getBalanceStatus(data.measurement.leftBalance, data.measurement.rightBalance)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Strengths & Improvements -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div>
              <h3 style="color: #10B981; font-size: 16px; margin-bottom: 15px;">💪 강점</h3>
              <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.6;">
                ${data.strengths.map(strength => `<li style="margin-bottom: 8px;">${strength}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 style="color: #F59E0B; font-size: 16px; margin-bottom: 15px;">🎯 개선점</h3>
              <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.6;">
                ${data.improvements.map(improvement => `<li style="margin-bottom: 8px;">${improvement}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- AI Analysis -->
          ${data.analysis.aiAnalysis ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">🤖 AI 코칭 분석</h2>
            <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #7B5CFF;">
              <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${data.analysis.aiAnalysis.summary}</div>
            </div>
          </div>
          ` : ''}

          <!-- Footer -->
          <div style="margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p style="margin: 0;">본 리포트는 KidsMotion 체력 측정 시스템으로 생성되었습니다.</p>
            <p style="margin: 5px 0 0 0;">MotionBike | 과학적 아동 체력 분석 플랫폼</p>
          </div>
        </div>
      `;

      reportContainer.innerHTML = reportHTML;
      document.body.appendChild(reportContainer);

      // Convert to canvas
      const canvas = await html2canvas(reportContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Remove temporary container
      document.body.removeChild(reportContainer);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Save PDF
      const fileName = `KidsMotion_${data.measurement.studentName}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('PDF 생성 중 오류:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex gap-3">
      <Button onClick={generatePDF} className="bg-red-600 hover:bg-red-700 text-white">
        <FileText className="w-4 h-4 mr-2" />
        PDF 다운로드
      </Button>
    </div>
  );
}

// Helper functions
function getGradeFromPercentile(percentile: number): string {
  if (percentile >= 96) return "매우우수";
  if (percentile >= 80) return "우수";
  if (percentile >= 20) return "보통";
  if (percentile >= 4) return "낮음";
  return "매우낮음";
}

function getBalanceStatus(left: number, right: number): string {
  const diff = Math.abs(left - right);
  if (diff <= 5) return "균형";
  if (diff <= 10) return "약간불균형";
  return "불균형";
}

function getBalanceStatusColor(left: number, right: number): string {
  const diff = Math.abs(left - right);
  if (diff <= 5) return "#10B981";
  if (diff <= 10) return "#F59E0B";
  return "#EF4444";
}

function generateScoreCard(title: string, percentile: number, value: number): string {
  const grade = getGradeFromPercentile(percentile);
  const gradeColor = percentile >= 80 ? "#10B981" : percentile >= 20 ? "#F59E0B" : "#EF4444";
  
  return `
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; text-align: center;">
      <div style="font-size: 14px; color: #666; margin-bottom: 5px;">${title}</div>
      <div style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 5px;">${value}W</div>
      <div style="font-size: 14px; color: ${gradeColor}; font-weight: bold;">${grade}</div>
      <div style="font-size: 12px; color: #666; margin-top: 3px;">${percentile}백분위</div>
    </div>
  `;
}