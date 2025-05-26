import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Loader2, UserPlus, Zap, Scale, ChartLine, Plus, Minus, Info, Timer, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertMeasurementSchema } from "@shared/schema";
import { z } from "zod";
import { calculateAge } from "@/lib/fitness-calculations";

const formSchema = insertMeasurementSchema.extend({
  // Add client-side validation
  height: z.number().min(100, "키는 최소 100cm 이상이어야 합니다.").max(200, "키는 최대 200cm까지 입력 가능합니다."),
  weight: z.number().min(15, "체중은 최소 15kg 이상이어야 합니다.").max(100, "체중은 최대 100kg까지 입력 가능합니다."),
  leftBalance: z.number().min(0).max(100),
  rightBalance: z.number().min(0).max(100),
  // 필수 심박수 필드들
  maxHeartRate: z.number().min(60).max(220),
  avgHeartRate: z.number().min(50).max(200),
}).refine((data) => {
  return Math.abs((data.leftBalance + data.rightBalance) - 100) < 0.1;
}, {
  message: "좌우 밸런스의 합이 100%가 되어야 합니다.",
  path: ["rightBalance"],
});

type FormData = z.infer<typeof formSchema>;

interface MeasurementFormProps {
  onComplete: (data: any) => void;
  onStart?: () => void;
}

export default function MeasurementForm({ onComplete, onStart }: MeasurementFormProps) {
  const { toast } = useToast();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHeartRate, setShowHeartRate] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measureDate: new Date().toISOString().split('T')[0],
      studentName: "",
      affiliation: "",
      birthDate: "",
      gender: "M",
      height: 0,
      weight: 0,
      power5s: 0,
      power15s: 0,
      power30s: 0,
      power60s: 0,
      leftBalance: 50,
      rightBalance: 50,
      maxHeartRate: 0,
      avgHeartRate: 0,
    },
  });

  const createMeasurement = useMutation({
    mutationFn: async (data: FormData) => {
      // 로딩 애니메이션 시작
      onStart?.();
      const response = await apiRequest("POST", "/api/measurements", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "측정 완료",
        description: "체력 분석이 성공적으로 완료되었습니다.",
      });
      onComplete(data);
    },
    onError: (error) => {
      toast({
        title: "오류 발생",
        description: "측정 데이터 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createMeasurement.mutate(data);
  };

  // Auto-adjust right balance when left balance changes
  const handleLeftBalanceChange = (value: string) => {
    const leftValue = parseFloat(value) || 0;
    const rightValue = 100 - leftValue;
    form.setValue("leftBalance", leftValue);
    form.setValue("rightBalance", rightValue);
  };

  return (
    <Card className="fitness-card">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <UserPlus className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">측정 정보 입력</h2>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <FormField
                control={form.control}
                name="measureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>측정일</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>소속 (학교/클럽)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="예: 서울초등학교" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>생년월일</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>성별</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">남자</SelectItem>
                        <SelectItem value="F">여자</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Physical Info Section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>키 (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="150" 
                        min="100" 
                        max="200"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === '0') {
                            field.onChange('');
                          } else {
                            field.onChange(parseFloat(value) || '');
                          }
                        }}
                        onFocus={(e) => {
                          if (e.target.value === '0') {
                            e.target.value = '';
                            field.onChange('');
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>체중 (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="45" 
                        min="15" 
                        max="100"
                        step="0.1"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === '0') {
                            field.onChange('');
                          } else {
                            field.onChange(parseFloat(value) || '');
                          }
                        }}
                        onFocus={(e) => {
                          if (e.target.value === '0') {
                            e.target.value = '';
                            field.onChange('');
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Power Values Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="text-primary mr-2" />
                파워 측정값 (W)
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="power5s"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5초 파워</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          max="1000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="power15s"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>15초 파워</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          max="1000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="power30s"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>30초 파워</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 

                          min="0" 
                          max="1000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="power60s"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>60초 파워</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 

                          min="0" 
                          max="1000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Balance Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Scale className="text-primary mr-2" />
                좌/우 밸런스 비율 (%)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="leftBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>왼쪽 (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="48" 
                          min="0" 
                          max="100"
                          {...field}
                          onChange={(e) => {
                            handleLeftBalanceChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rightBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>오른쪽 (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="52" 
                          min="0" 
                          max="100"
                          value={field.value}
                          readOnly
                          className="bg-gray-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 심박수 측정 섹션 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="text-primary mr-2" />
                심박수 측정
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="maxHeartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">최대 심박수 (BPM)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="예: 185"
                          className="bg-white"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="avgHeartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">평균 심박수 (BPM)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="예: 145"
                          className="bg-white"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                

              </div>
            </div>

            {/* 고급 측정 섹션 */}
            <div className="space-y-4">
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-between p-4 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Plus className={`w-5 h-5 text-purple-600 transition-transform ${showAdvanced ? 'rotate-45' : ''}`} />
                      <span className="font-medium text-purple-700">고급 측정 추가 (선택사항) - 10세 이상 권장</span>
                      {(() => {
                        const currentAge = form.watch("birthDate") ? calculateAge(form.watch("birthDate")) : 0;
                        if (currentAge >= 10) {
                          return <Badge variant="secondary" className="bg-green-100 text-green-700">권장</Badge>;
                        }
                        return null;
                      })()}
                    </div>
                    {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium">고급 측정 안내</p>
                        <p className="text-xs text-blue-700 mt-1">
                          180초(근지구력), 360초(심폐지구력) 측정과 심박수 데이터를 추가로 수집합니다. 
                          10세 이상 권장하지만, 모든 연령에서 선택적으로 실시 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 추가 파워 측정 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <FormField
                      control={form.control}
                      name="power180s"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Timer className="w-4 h-4 text-blue-600" />
                            180초 근지구력 (W)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="예: 85"
                              className="bg-white"
                              value={field.value || ""}
                              onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <p className="text-xs text-gray-500">3분간 일정 강도 유지</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="power360s"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Timer className="w-4 h-4 text-green-600" />
                            360초 심폐지구력 (W)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="예: 70"
                              className="bg-white"
                              value={field.value || ""}
                              onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <p className="text-xs text-gray-500">6분간 유산소 영역</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>


                </CollapsibleContent>
              </Collapsible>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              disabled={createMeasurement.isPending}
            >
              {createMeasurement.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>분석 중...</span>
                </>
              ) : (
                <>
                  <ChartLine />
                  <span>체력 분석 시작</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
