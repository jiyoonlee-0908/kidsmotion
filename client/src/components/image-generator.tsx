import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("이미지 생성에 실패했습니다.");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">KidsMotion 시스템 시각화</h3>
          
          <Button 
            onClick={generateImage} 
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "이미지 생성 중..." : "KidsMotion 이미지 생성"}
          </Button>

          {error && (
            <div className="text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {imageUrl && (
            <div className="space-y-4">
              <img 
                src={imageUrl} 
                alt="KidsMotion 시스템 - 아동이 사용하는 모습"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600">
                고품질 KidsMotion 시스템 이미지가 생성되었습니다!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}