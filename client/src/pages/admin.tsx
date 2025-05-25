import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InviteCode {
  id: number;
  code: string;
  isUsed: string;
  usedAt: Date | null;
  createdAt: Date;
}

export default function Admin() {
  const [generatedCodes, setGeneratedCodes] = useState<InviteCode[]>([]);
  const { toast } = useToast();

  const generateCodeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/invite-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("코드 생성에 실패했습니다.");
      }
      
      return response.json();
    },
    onSuccess: (newCode: InviteCode) => {
      setGeneratedCodes(prev => [newCode, ...prev]);
      toast({
        title: "초대 코드 생성 완료",
        description: `새로운 코드: ${newCode.code}`,
      });
    },
    onError: () => {
      toast({
        title: "오류",
        description: "코드 생성에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "복사 완료",
      description: `코드 ${code}가 클립보드에 복사되었습니다.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">관리자 패널</h1>
              <p className="text-gray-600">KidsMotion 초대 코드 관리</p>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              초대 코드 생성
            </CardTitle>
            <CardDescription>
              새로운 일회용 초대 코드를 생성합니다. 각 코드는 한 번만 사용할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => generateCodeMutation.mutate()}
              disabled={generateCodeMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {generateCodeMutation.isPending ? "생성 중..." : "새 코드 생성"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>생성된 초대 코드</CardTitle>
            <CardDescription>
              최근 생성된 코드들입니다. 사용된 코드는 더 이상 유효하지 않습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedCodes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                아직 생성된 코드가 없습니다.
              </div>
            ) : (
              <div className="space-y-3">
                {generatedCodes.map((code) => (
                  <div
                    key={code.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <code className="text-lg font-mono font-bold text-purple-600 bg-white px-3 py-1 rounded border">
                        {code.code}
                      </code>
                      <Badge
                        variant={code.isUsed === "true" ? "secondary" : "default"}
                        className={
                          code.isUsed === "true"
                            ? "bg-gray-200 text-gray-600"
                            : "bg-green-100 text-green-700"
                        }
                      >
                        {code.isUsed === "true" ? "사용됨" : "사용 가능"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {new Date(code.createdAt).toLocaleString('ko-KR')}
                      </span>
                      {code.isUsed === "false" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(code.code)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">사용 방법</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 새 코드 생성 버튼을 클릭하여 초대 코드를 만듭니다</li>
            <li>• 생성된 코드를 데이터 수집 참여자에게 개별적으로 전달합니다</li>
            <li>• 각 코드는 한 번만 사용 가능하며, 사용 후 자동으로 만료됩니다</li>
            <li>• 복사 버튼을 클릭하여 코드를 쉽게 복사할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}