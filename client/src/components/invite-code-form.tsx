import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Lock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface InviteCodeFormProps {
  onSuccess: () => void;
}

export default function InviteCodeForm({ onSuccess }: InviteCodeFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const verifyCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch("/api/invite-codes/verify", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      
      return response.json();
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: any) => {
      setError(error.message || "초대 코드가 유효하지 않습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!code.trim()) {
      setError("초대 코드를 입력해주세요.");
      return;
    }

    verifyCodeMutation.mutate(code.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
            <Lock className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            접근 인증
          </CardTitle>
          <CardDescription className="text-gray-600">
            KidsMotion 체력 측정 시스템에 접근하려면<br />
            초대 코드를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                초대 코드
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="예: ABC123"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono tracking-wider"
                maxLength={8}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={verifyCodeMutation.isPending}
            >
              {verifyCodeMutation.isPending ? "확인 중..." : "접근하기"}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              초대 코드는 일회용이며, 사용 후 만료됩니다.<br />
              코드가 없으시면 담당자에게 문의해주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}