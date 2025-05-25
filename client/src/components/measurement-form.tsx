import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, UserPlus, Zap, Scale, ChartLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertMeasurementSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertMeasurementSchema.extend({
  // Add client-side validation
  leftBalance: z.number().min(0).max(100),
  rightBalance: z.number().min(0).max(100),
}).refine((data) => {
  return Math.abs((data.leftBalance + data.rightBalance) - 100) < 0.1;
}, {
  message: "좌우 밸런스의 합이 100%가 되어야 합니다.",
  path: ["rightBalance"],
});

type FormData = z.infer<typeof formSchema>;

interface MeasurementFormProps {
  onComplete: (data: any) => void;
}

export default function MeasurementForm({ onComplete }: MeasurementFormProps) {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measureDate: new Date().toISOString().split('T')[0],
      studentName: "",
      birthDate: "",
      height: 0,
      weight: 0,
      power5s: 0,
      power15s: 0,
      power30s: 0,
      power60s: 0,
      leftBalance: 50,
      rightBalance: 50,
    },
  });

  const createMeasurement = useMutation({
    mutationFn: async (data: FormData) => {
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <Input placeholder="홍길동" {...field} />
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
            </div>

            {/* Physical Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        min="20" 
                        max="150"
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="power5s"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5초 파워</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="200" 
                          min="0" 
                          max="1000"
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
                  name="power15s"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>15초 파워</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="180" 
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
                          placeholder="160" 
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
                          placeholder="140" 
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
