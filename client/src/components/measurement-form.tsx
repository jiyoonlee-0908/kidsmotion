import { useState, useEffect } from "react";
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
import { usePrefill } from "@/hooks/usePrefill";

const formSchema = insertMeasurementSchema.extend({
  // Add client-side validation
  height: z.number().min(100, "키는 최소 100cm 이상이어야 합니다.").max(200, "키는 최대 200cm까지 입력 가능합니다."),
  weight: z.number().min(15, "체중은 최소 15kg 이상이어야 합니다.").max(100, "체중은 최대 100kg까지 입력 가능합니다."),
  leftBalance: z.number().min(0).max(100),
  rightBalance: z.number().min(0).max(100),
  // 선택 사항 심박수 필드들
  maxHeartRate: z.number().min(60).max(220).optional().nullable(),
  avgHeartRate: z.number().min(50).max(200).optional().nullable(),
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
  const [showParticipantSelection, setShowParticipantSelection] = useState(false);
  const [participantOptions, setParticipantOptions] = useState<any[]>([]);
  const [studentNameInput, setStudentNameInput] = useState("");
  
  // usePrefill 훅 사용
  const { data: prefillData, loading: prefillLoading } = usePrefill(studentNameInput);
  
  // 한국 시간 기준 오늘 날짜 가져오기
  const getKoreanDate = () => {
    const now = new Date();
    const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
    return koreanTime.toISOString().split('T')[0];
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measureDate: getKoreanDate(),
      studentName: "",
      affiliation: "",
      birthDate: "",
      gender: "M" as "M" | "F",
      height: 0,
      weight: 0,
      power5s: 0,
      power15s: 0,
      power30s: 0,
      power60s: 0,
      leftBalance: 50,
      rightBalance: 50,
      maxHeartRate: null,
      avgHeartRate: null,
    },
  });

  // prefillData가 변경될 때 폼 자동 채우기
  useEffect(() => {
    if (prefillData?.recentSession) {
      console.log('Prefill 데이터로 폼 자동 채움:', prefillData);
      
      // stage별 maxPower 데이터 채우기
      form.setValue('power5s', prefillData.recentSession.stage1?.maxPower || 0);
      form.setValue('power15s', prefillData.recentSession.stage2?.maxPower || 0);
      form.setValue('power30s', prefillData.recentSession.stage3?.maxPower || 0);
      form.setValue('power60s', prefillData.recentSession.stage4?.maxPower || 0);
      
      // 고급 데이터가 있는 경우
      if (prefillData.recentSession.stage5?.maxPower || prefillData.recentSession.stage6?.maxPower) {
        form.setValue('power180s', prefillData.recentSession.stage5?.maxPower || undefined);
        form.setValue('power360s', prefillData.recentSession.stage6?.maxPower || undefined);
        setShowAdvanced(true);
      }
      
      // 좌우 밸런스 데이터 채우기
      form.setValue('leftBalance', prefillData.avgBalance.left);
      form.setValue('rightBalance', prefillData.avgBalance.right);
      
      toast({
        title: "자동 입력 완료",
        description: "이전 측정 데이터를 불러왔습니다.",
      });
    }
  }, [prefillData, form]);

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

  const saveToSupabase = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/supabase/save-measurement", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Supabase 저장 완료",
        description: "데이터가 KidsMotion 데이터베이스에 성공적으로 저장되었습니다.",
      });
      console.log("Supabase 저장 결과:", data);
    },
    onError: (error) => {
      toast({
        title: "Supabase 저장 실패",
        description: "데이터베이스 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      console.error("Supabase 저장 오류:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    // restingHeartRate를 기본값으로 설정 (임시 해결책)
    const measurementData = {
      ...data,
      restingHeartRate: 70 // 기본값 설정
    };
    
    // 동시에 두 작업 실행: 분석 생성 + Supabase 저장
    createMeasurement.mutate(measurementData);
    saveToSupabase.mutate(data); // 원본 데이터를 Supabase에 저장
  };

  // 폼 데이터 채우기 공통 함수
  const fillFormData = (userData: any) => {
    form.setValue("affiliation", userData.affiliation || "");
    form.setValue("birthDate", userData.birthDate || "");
    // 성별 변환: "남성" -> "M", "여성" -> "F"
    const genderCode = userData.gender === "남성" ? "M" : userData.gender === "여성" ? "F" : "";
    form.setValue("gender", genderCode);
    
    // ✅ 키/몸무게 자동 입력 추가
    console.log('키/몸무게 데이터 확인:', { height: userData.height, weight: userData.weight });
    if (userData.height) {
      console.log('키 설정:', userData.height);
      form.setValue("height", userData.height);
    }
    if (userData.weight) {
      console.log('몸무게 설정:', userData.weight);
      form.setValue("weight", userData.weight);
    }
    
    // 가민 데이터가 있으면 파워 값들도 입력
    if (userData.power5s) {
      form.setValue("power5s", userData.power5s);
      form.setValue("power15s", userData.power15s);
      form.setValue("power30s", userData.power30s);
      form.setValue("power60s", userData.power60s);
      form.setValue("leftBalance", userData.leftBalance);
      form.setValue("rightBalance", userData.rightBalance);
      
      // ✅ 고급측정 데이터가 있으면 자동으로 펼치기
      if (userData.power180s || userData.power360s) {
        console.log('고급측정 데이터 발견 - 자동 펼치기');
        setShowAdvanced(true);
        
        if (userData.power180s) {
          form.setValue("power180s", userData.power180s);
        }
        if (userData.power360s) {
          form.setValue("power360s", userData.power360s);
        }
      }
    }
    
    // 설정 후 폼 값 확인
    setTimeout(() => {
      const currentValues = form.getValues();
      console.log('폼 설정 후 키/몸무게:', { height: currentValues.height, weight: currentValues.weight });
    }, 100);
  };

  // 특정 참가자 선택 함수
  const handleParticipantSelect = async (participantId: number) => {
    try {
      const response = await fetch(`/api/supabase/participant/${participantId}`);
      
      if (!response.ok) {
        throw new Error('참가자 데이터 불러오기 실패');
      }
      
      const userData = await response.json();
      
      if (userData && userData.studentName) {
        fillFormData(userData);
        setShowParticipantSelection(false);
        setParticipantOptions([]);
        
        toast({
          title: "자동 입력 완료",
          description: `${userData.studentName}님의 정보를 불러왔습니다.`,
        });
      }
    } catch (error) {
      toast({
        title: "자동 입력 실패",
        description: "선택한 참가자의 데이터를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  // 자동 입력 함수
  const handleAutoFill = async () => {
    const name = form.getValues("studentName");
    if (!name || name.length < 2) {
      toast({
        title: "이름을 먼저 입력하세요",
        description: "최소 2글자 이상의 이름을 입력한 후 자동 입력을 시도해주세요.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(`/api/supabase/search-user/${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error('검색 실패');
      }
      
      const userData = await response.json();
      console.log('받은 사용자 데이터:', userData);
      
      // 여러 명이 있는 경우
      if (userData && userData.multiple) {
        setParticipantOptions(userData.participants);
        setShowParticipantSelection(true);
        toast({
          title: "여러 명 발견",
          description: `"${name}" 이름으로 ${userData.participants.length}명이 등록되어 있습니다. 선택해주세요.`,
        });
        return;
      }
      
      // 단일 사용자인 경우
      if (userData && userData.studentName) {
        fillFormData(userData);
        toast({
          title: "자동 입력 완료",
          description: `${userData.studentName}님의 정보를 불러왔습니다.`,
        });
      } else {
        toast({
          title: "정보 없음",
          description: "해당 이름으로 등록된 정보가 없습니다. 수동으로 입력해주세요.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "자동 입력 실패",
        description: "데이터를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
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
          <h2 className="text-2xl font-bold text-gray-900">
            측정 정보 입력 
            <span className="text-sm font-normal text-gray-500 ml-2">(유아~초등대상)</span>
          </h2>
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
                    <FormLabel>이름 {prefillLoading && <Loader2 className="inline h-4 w-4 animate-spin ml-2" />}</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="예: 박시아"
                          onBlur={(e) => {
                            field.onBlur(e);
                            setStudentNameInput(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAutoFill();
                            }
                          }}
                        />
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={handleAutoFill}
                        className="whitespace-nowrap"
                      >
                        자동입력
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>기관</FormLabel>
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
                      <Input 
                        type="text" 
                        placeholder="2018-06-15"
                        pattern="\d{4}-\d{2}-\d{2}"
                        maxLength={10}
                        {...field} 
                        onChange={(e) => {
                          // 숫자와 하이픈만 허용
                          let value = e.target.value.replace(/[^\d-]/g, '');
                          
                          // 자동으로 하이픈 추가
                          if (value.length >= 4 && value.charAt(4) !== '-') {
                            value = value.slice(0, 4) + '-' + value.slice(4);
                          }
                          if (value.length >= 7 && value.charAt(7) !== '-') {
                            value = value.slice(0, 7) + '-' + value.slice(7);
                          }
                          
                          // 최대 길이 제한
                          if (value.length > 10) {
                            value = value.slice(0, 10);
                          }
                          
                          field.onChange(value);
                        }}
                      />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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

            {/* 참가자 선택 UI */}
            {showParticipantSelection && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">참가자 선택</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-600 mb-4">
                    동일한 이름의 참가자가 여러 명 있습니다. 올바른 참가자를 선택해주세요:
                  </p>
                  <div className="space-y-2">
                    {participantOptions.map((participant) => (
                      <div 
                        key={participant.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-blue-50 cursor-pointer"
                        onClick={() => handleParticipantSelect(participant.id)}
                      >
                        <div>
                          <div className="font-semibold">{participant.name}</div>
                          <div className="text-sm text-gray-600">
                            생년월일: {participant.birthDate} | 성별: {participant.gender} | 소속: {participant.organization || "미등록"}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          선택
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => {
                      setShowParticipantSelection(false);
                      setParticipantOptions([]);
                    }}
                  >
                    취소
                  </Button>
                </CardContent>
              </Card>
            )}

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
                        min="100" 
                        max="200"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '') {
                            field.onChange(0);
                          } else {
                            field.onChange(parseFloat(value) || 0);
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
                        min="15" 
                        max="100"
                        step="0.1"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '') {
                            field.onChange(0);
                          } else {
                            field.onChange(parseFloat(value) || 0);
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
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? 0 : parseFloat(value) || 0);
                          }}
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
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? 0 : parseFloat(value) || 0);
                          }}
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
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? 0 : parseFloat(value) || 0);
                          }}
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
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? 0 : parseFloat(value) || 0);
                          }}
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
                      <FormLabel className="text-sm font-medium text-gray-700">
                        최대 심박수 (BPM) <Badge variant="secondary" className="ml-2">선택사항</Badge>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-white"
                          placeholder="심박계 미연결 시 공란 가능"
                          value={field.value === 0 || field.value === null ? "" : field.value?.toString() || ""}
                          onChange={e => {
                            const value = e.target.value;
                            field.onChange(value === '' ? null : Number(value) || null);
                          }}
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
                      <FormLabel className="text-sm font-medium text-gray-700">
                        평균 심박수 (BPM) <Badge variant="secondary" className="ml-2">선택사항</Badge>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-white"
                          placeholder="심박계 미연결 시 공란 가능"
                          value={field.value === 0 || field.value === null ? "" : field.value?.toString() || ""}
                          onChange={e => {
                            const value = e.target.value;
                            field.onChange(value === '' ? null : Number(value) || null);
                          }}
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

            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                disabled={createMeasurement.isPending || saveToSupabase.isPending}
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
              
              {/* Supabase 저장 상태 표시 */}
              {saveToSupabase.isPending && (
                <div className="flex items-center justify-center space-x-2 text-blue-600 bg-blue-50 p-2 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">KidsMotion 데이터베이스에 저장 중...</span>
                </div>
              )}
              
              {saveToSupabase.isSuccess && !saveToSupabase.isPending && (
                <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-2 rounded-lg">
                  <ChartLine className="w-4 h-4" />
                  <span className="text-sm">✓ 데이터베이스 저장 완료</span>
                </div>
              )}
              
              {saveToSupabase.isError && (
                <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-2 rounded-lg">
                  <span className="text-sm">⚠ 데이터베이스 저장 실패</span>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
