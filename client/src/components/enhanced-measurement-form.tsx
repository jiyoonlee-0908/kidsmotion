import { useState, useCallback, useRef } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Loader2, UserPlus, Zap, Scale, ChartLine, Plus, Minus, Info, Timer, Heart, ChevronDown, AlertTriangle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertMeasurementSchema } from "@shared/schema";
import { z } from "zod";

const enhancedFormSchema = insertMeasurementSchema.extend({
  leftBalance: z.number().min(0).max(100),
  rightBalance: z.number().min(0).max(100),
  // 확장 측정 항목 (선택적)
  power180s: z.number().optional(),
  power360s: z.number().optional(),
  // 심박수 데이터 (선택적)
  maxHeartRate: z.number().optional(),
  avgHeartRate: z.number().optional(),
  restingHeartRate: z.number().optional(),
});

type EnhancedFormData = z.infer<typeof enhancedFormSchema>;

interface EnhancedMeasurementFormProps {
  onComplete: (data: any) => void;
}

export default function EnhancedMeasurementForm({ onComplete }: EnhancedMeasurementFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHeartRate, setShowHeartRate] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [autoFillStatus, setAutoFillStatus] = useState<string>("");
  const { toast } = useToast();
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const form = useForm<EnhancedFormData>({
    resolver: zodResolver(enhancedFormSchema),
    defaultValues: {
      studentName: "",
      birthDate: "",
      gender: "",
      height: 0,
      weight: 0,
      power5s: 0,
      power15s: 0,
      power30s: 0,
      power60s: 0,
      leftBalance: 50,
      rightBalance: 50,
      power180s: undefined,
      power360s: undefined,
      maxHeartRate: undefined,
      avgHeartRate: undefined,
      restingHeartRate: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EnhancedFormData) => {
      const response = await fetch('/api/measurements', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('측정 데이터 전송에 실패했습니다.');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "측정 완료!",
        description: "체력 분석 결과가 준비되었습니다.",
      });
      onComplete(data);
    },
    onError: (error: Error) => {
      toast({
        title: "측정 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EnhancedFormData) => {
    // 좌우 밸런스 합계 검증
    if (Math.abs(data.leftBalance + data.rightBalance - 100) > 1) {
      toast({
        title: "밸런스 오류",
        description: "좌우 밸런스의 합이 100%가 되어야 합니다.",
        variant: "destructive",
      });
      return;
    }

    mutate(data);
  };

  // Debounced search function for auto-fill
  const searchSupabaseData = useCallback(async (name: string) => {
    if (!name || name.length < 2) {
      setAutoFillStatus("");
      return;
    }

    setIsSearching(true);
    setAutoFillStatus("검색 중...");

    try {
      const response = await fetch(`/api/supabase/search-user/${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error('검색 실패');
      }
      
      const userData = await response.json();
      
      if (userData) {
        // Auto-fill form with Supabase data
        const currentDate = new Date().toISOString().split('T')[0];
        
        form.setValue('measureDate', userData.measureDate || currentDate);
        form.setValue('affiliation', userData.affiliation || '');
        form.setValue('birthDate', userData.birthDate || '');
        form.setValue('gender', userData.gender || '');
        
        // Power values
        form.setValue('power5s', userData.power5s || 0);
        form.setValue('power15s', userData.power15s || 0);
        form.setValue('power30s', userData.power30s || 0);
        form.setValue('power60s', userData.power60s || 0);
        
        // Optional power values
        if (userData.power180s) {
          form.setValue('power180s', userData.power180s);
          setShowAdvanced(true);
        }
        if (userData.power360s) {
          form.setValue('power360s', userData.power360s);
          setShowAdvanced(true);
        }
        
        // Balance values
        form.setValue('leftBalance', userData.leftBalance || 50);
        form.setValue('rightBalance', userData.rightBalance || 50);
        
        // Heart rate values (if available)
        if (userData.maxHeartRate || userData.avgHeartRate) {
          if (userData.maxHeartRate) form.setValue('maxHeartRate', userData.maxHeartRate);
          if (userData.avgHeartRate) form.setValue('avgHeartRate', userData.avgHeartRate);
          setShowHeartRate(true);
        }
        
        setAutoFillStatus("✓ 앱 데이터 자동 입력 완료");
        toast({
          title: "자동 입력 완료",
          description: "KidsMotion 앱에서 측정 데이터를 불러왔습니다.",
        });
      } else {
        setAutoFillStatus("해당 이름의 데이터를 찾을 수 없습니다");
      }
    } catch (error) {
      console.error('Supabase search error:', error);
      setAutoFillStatus("검색 중 오류가 발생했습니다");
    } finally {
      setIsSearching(false);
    }
  }, [form, toast]);

  // Handle name input change with debouncing
  const handleNameChange = useCallback((value: string) => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Reset status if input is too short
    if (value.length < 2) {
      setAutoFillStatus("");
      return;
    }
    
    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      searchSupabaseData(value);
    }, 500); // 500ms delay
  }, [searchSupabaseData]);

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const currentAge = calculateAge(form.watch("birthDate"));
  const isAdvancedEligible = currentAge >= 10; // 10세 이상만 고급 측정 권장

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6">
        {/* 기본 정보 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-purple-600" />
              기본 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        이름
                        {isSearching && <Search className="w-4 h-4 animate-spin" />}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="김아이" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleNameChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      {autoFillStatus && (
                        <div className={`text-sm ${
                          autoFillStatus.includes("✓") 
                            ? "text-green-600" 
                            : autoFillStatus.includes("오류") || autoFillStatus.includes("찾을 수 없습니다")
                              ? "text-red-600"
                              : "text-blue-600"
                        }`}>
                          {autoFillStatus}
                        </div>
                      )}
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
                      {currentAge > 0 && (
                        <p className="text-sm text-gray-600">현재 나이: {currentAge}세</p>
                      )}
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
                            <SelectValue placeholder="선택하세요" />
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

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>키 (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="120" 
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
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>몸무게 (kg)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="25" 
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
            </CardContent>
          </Card>

      {/* 기본 파워 측정 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            기본 파워 측정 (필수)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="power5s"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">5초</Badge>
                    순발력/폭발력
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="50W" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500">순간 최대 파워</p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="power15s"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">15초</Badge>
                    무산소 파워
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="40W" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500">ATP-PC + 젖산계</p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="power30s"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">30초</Badge>
                    무산소성 지구력
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="35W" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500">젖산계 주도</p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="power60s"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">60초</Badge>
                    혼합 지구력
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="30W" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500">무산소 + 일부 유산소</p>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* 밸런스 측정 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-green-600" />
            좌우 밸런스 (필수)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="leftBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>왼쪽 하중 (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      placeholder="50" 
                      {...field} 
                      onChange={e => {
                        const value = Number(e.target.value);
                        field.onChange(value);
                        form.setValue("rightBalance", 100 - value);
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
                  <FormLabel>오른쪽 하중 (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      placeholder="50" 
                      {...field} 
                      onChange={e => {
                        const value = Number(e.target.value);
                        field.onChange(value);
                        form.setValue("leftBalance", 100 - value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            총합: {form.watch("leftBalance") + form.watch("rightBalance")}% (100%가 되어야 함)
          </p>
        </CardContent>
      </Card>

      {/* 고급 측정 섹션 (확장 가능) */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  고급 측정 (선택사항)
                  <Badge variant={isAdvancedEligible ? "default" : "secondary"}>
                    {isAdvancedEligible ? "권장" : "10세 이상 권장"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm">
                    <Plus className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-45' : ''}`} />
                  </Button>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </div>
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              {!isAdvancedEligible && (
                <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg mb-4">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    고급 측정은 10세 이상 아동에게 권장됩니다. 현재 나이: {currentAge}세
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">추가 지구력 측정</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="power180s"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">180초</Badge>
                          근지구력
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="25W" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500">3분간 일정 강도 유지</p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="power360s"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">360초</Badge>
                          심폐지구력
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="20W" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500">6분간 유산소 영역</p>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 심박수 연동 섹션 (확장 가능) */}
      <Collapsible open={showHeartRate} onOpenChange={setShowHeartRate}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  심박수 데이터 (선택사항)
                  <Badge variant="secondary">Garmin 연동 가능</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm">
                    <Plus className={`w-4 h-4 transition-transform ${showHeartRate ? 'rotate-45' : ''}`} />
                  </Button>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showHeartRate ? 'rotate-180' : ''}`} />
                </div>
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="maxHeartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>최대 심박수 (BPM)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="195" 
                          {...field} 
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">운동 중 최고치</p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avgHeartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>평균 심박수 (BPM)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="145" 
                          {...field} 
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">운동 중 평균</p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="restingHeartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>안정시 심박수 (BPM)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="65" 
                          {...field} 
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">휴식 상태</p>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 제출 버튼 */}
      <Card>
        <CardContent className="p-6">
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isPending} 
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <ChartLine className="w-4 h-4 mr-2" />
                체력 분석 시작
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      </form>
    </Form>
  );
}