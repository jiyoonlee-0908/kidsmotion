import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Activity, Zap, AlertTriangle, CheckCircle, Bluetooth } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Measurement } from "@shared/schema";

interface HeartRateIntegrationProps {
  measurement: Measurement;
  onHeartRateUpdate?: (data: HeartRateData) => void;
}

interface HeartRateData {
  maxBpm: number;
  avgBpm: number;
  restingBpm: number;
  hrReserve: number;
  fitnessAge: number;
  recoveryTime: number;
}

export default function HeartRateIntegration({ measurement, onHeartRateUpdate }: HeartRateIntegrationProps) {
  const [heartRateData, setHeartRateData] = useState<HeartRateData>({
    maxBpm: 0,
    avgBpm: 0,
    restingBpm: 0,
    hrReserve: 0,
    fitnessAge: 0,
    recoveryTime: 0
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // 이론적 최대심박수 계산 (나이 기반)
  const calculateTheoreticalMaxHR = (age: number) => {
    return 220 - age;
  };

  // 심박수 저장영역 계산
  const calculateHRZones = (maxBpm: number, restingBpm: number) => {
    const hrReserve = maxBpm - restingBpm;
    return {
      zone1: { min: restingBpm + hrReserve * 0.5, max: restingBpm + hrReserve * 0.6, name: "회복/기초", color: "#10B981" },
      zone2: { min: restingBpm + hrReserve * 0.6, max: restingBpm + hrReserve * 0.7, name: "유산소", color: "#3B82F6" },
      zone3: { min: restingBpm + hrReserve * 0.7, max: restingBpm + hrReserve * 0.8, name: "템포", color: "#F59E0B" },
      zone4: { min: restingBpm + hrReserve * 0.8, max: restingBpm + hrReserve * 0.9, name: "젖산역치", color: "#EF4444" },
      zone5: { min: restingBpm + hrReserve * 0.9, max: maxBpm, name: "무산소", color: "#7C3AED" }
    };
  };

  // 체력 나이 계산
  const calculateFitnessAge = (maxBpm: number, restingBpm: number, age: number) => {
    const theoreticalMax = calculateTheoreticalMaxHR(age);
    const hrReserve = maxBpm - restingBpm;
    const theoreticalReserve = theoreticalMax - 60; // 평균 안정시 심박수 60
    
    const fitnessRatio = hrReserve / theoreticalReserve;
    return Math.max(age - 10, age * (2 - fitnessRatio));
  };

  // 가민 연결 시뮬레이션
  const connectToGarmin = async () => {
    setIsConnecting(true);
    
    try {
      // 실제 구현시 Garmin Connect IQ API 사용
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 시뮬레이션 데이터 (실제로는 가민에서 받아옴)
      const mockData: HeartRateData = {
        maxBpm: 195,
        avgBpm: 145,
        restingBpm: 65,
        hrReserve: 130,
        fitnessAge: Math.max(measurement.age - 2, 5),
        recoveryTime: 120 // 초
      };
      
      setHeartRateData(mockData);
      setIsConnected(true);
      onHeartRateUpdate?.(mockData);
      
    } catch (error) {
      console.error('Garmin connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleManualInput = () => {
    const hrReserve = heartRateData.maxBpm - heartRateData.restingBpm;
    const fitnessAge = calculateFitnessAge(heartRateData.maxBpm, heartRateData.restingBpm, measurement.age);
    
    const updatedData = {
      ...heartRateData,
      hrReserve,
      fitnessAge
    };
    
    setHeartRateData(updatedData);
    onHeartRateUpdate?.(updatedData);
  };

  const getHeartRateAssessment = () => {
    if (!heartRateData.maxBpm || !heartRateData.restingBpm) return null;
    
    const theoreticalMax = calculateTheoreticalMaxHR(measurement.age);
    const maxComparison = (heartRateData.maxBpm / theoreticalMax) * 100;
    
    let assessment = {
      maxBpm: { status: 'normal', message: '정상 범위' },
      restingBpm: { status: 'normal', message: '정상 범위' },
      recovery: { status: 'normal', message: '양호' }
    };

    // 최대심박수 평가
    if (maxComparison > 105) {
      assessment.maxBpm = { status: 'excellent', message: '우수한 심혈관 능력' };
    } else if (maxComparison < 90) {
      assessment.maxBpm = { status: 'concern', message: '심혈관 운동 필요' };
    }

    // 안정시 심박수 평가 (아동 기준)
    if (heartRateData.restingBpm < 70) {
      assessment.restingBpm = { status: 'excellent', message: '매우 좋은 심폐 체력' };
    } else if (heartRateData.restingBpm > 90) {
      assessment.restingBpm = { status: 'concern', message: '심폐 체력 향상 필요' };
    }

    return assessment;
  };

  const zones = heartRateData.maxBpm && heartRateData.restingBpm ? 
    calculateHRZones(heartRateData.maxBpm, heartRateData.restingBpm) : null;
  
  const assessment = getHeartRateAssessment();

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            심박수 모니터링
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isConnected ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={connectToGarmin}
                    disabled={isConnecting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Bluetooth className="w-4 h-4 mr-2" />
                    {isConnecting ? '연결 중...' : 'Garmin 연결'}
                  </Button>
                  <span className="text-sm text-gray-600">또는 직접 입력</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxBpm">최대 심박수 (BPM)</Label>
                    <Input
                      id="maxBpm"
                      type="number"
                      value={heartRateData.maxBpm || ''}
                      onChange={(e) => setHeartRateData({
                        ...heartRateData,
                        maxBpm: parseInt(e.target.value) || 0
                      })}
                      placeholder="예: 195"
                    />
                  </div>
                  <div>
                    <Label htmlFor="avgBpm">평균 심박수 (BPM)</Label>
                    <Input
                      id="avgBpm"
                      type="number"
                      value={heartRateData.avgBpm || ''}
                      onChange={(e) => setHeartRateData({
                        ...heartRateData,
                        avgBpm: parseInt(e.target.value) || 0
                      })}
                      placeholder="예: 145"
                    />
                  </div>
                  <div>
                    <Label htmlFor="restingBpm">안정시 심박수 (BPM)</Label>
                    <Input
                      id="restingBpm"
                      type="number"
                      value={heartRateData.restingBpm || ''}
                      onChange={(e) => setHeartRateData({
                        ...heartRateData,
                        restingBpm: parseInt(e.target.value) || 0
                      })}
                      placeholder="예: 65"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recoveryTime">회복 시간 (초)</Label>
                    <Input
                      id="recoveryTime"
                      type="number"
                      value={heartRateData.recoveryTime || ''}
                      onChange={(e) => setHeartRateData({
                        ...heartRateData,
                        recoveryTime: parseInt(e.target.value) || 0
                      })}
                      placeholder="예: 120"
                    />
                  </div>
                </div>
                
                <Button onClick={handleManualInput} className="w-full">
                  심박수 데이터 저장
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>가민 디바이스 연결됨</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Heart Rate Analysis */}
      {(heartRateData.maxBpm > 0 && heartRateData.restingBpm > 0) && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{heartRateData.maxBpm}</div>
                <div className="text-sm text-gray-600">최대 심박수</div>
                <Badge variant={assessment?.maxBpm.status === 'excellent' ? 'default' : 'outline'} className="mt-1">
                  {assessment?.maxBpm.message}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{heartRateData.avgBpm}</div>
                <div className="text-sm text-gray-600">평균 심박수</div>
                <Badge variant="outline" className="mt-1">
                  운동 중
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{heartRateData.restingBpm}</div>
                <div className="text-sm text-gray-600">안정시 심박수</div>
                <Badge variant={assessment?.restingBpm.status === 'excellent' ? 'default' : 'outline'} className="mt-1">
                  {assessment?.restingBpm.message}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(heartRateData.fitnessAge)}세</div>
                <div className="text-sm text-gray-600">체력 나이</div>
                <Badge variant={heartRateData.fitnessAge < measurement.age ? 'default' : 'outline'} className="mt-1">
                  {heartRateData.fitnessAge < measurement.age ? '우수' : '보통'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Heart Rate Zones */}
          {zones && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  심박수 구간 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(zones).map(([zone, data]) => {
                    const isTargetZone = zone === 'zone2' || zone === 'zone3'; // 유산소, 템포 구간
                    return (
                      <div key={zone} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium">{data.name}</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>{Math.round(data.min)} - {Math.round(data.max)} BPM</span>
                            {isTargetZone && <Badge variant="default" className="text-xs">추천</Badge>}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                backgroundColor: data.color,
                                width: `${((data.max - data.min) / (heartRateData.maxBpm - heartRateData.restingBpm)) * 100}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 운동 강도 가이드</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>유산소 구간</strong>: 지구력 향상에 최적, 대화 가능한 강도</li>
                    <li>• <strong>템포 구간</strong>: 체력 향상에 효과적, 약간 힘든 강도</li>
                    <li>• <strong>젖산역치</strong>: 경쟁력 향상, 운동선수 수준</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recovery Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                회복력 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">회복 시간</h4>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {Math.floor(heartRateData.recoveryTime / 60)}분 {heartRateData.recoveryTime % 60}초
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    운동 후 심박수가 정상으로 돌아오는 시간
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>회복 속도</span>
                      <span className={heartRateData.recoveryTime < 120 ? 'text-green-600' : 'text-yellow-600'}>
                        {heartRateData.recoveryTime < 120 ? '빠름' : '보통'}
                      </span>
                    </div>
                    <Progress 
                      value={Math.max(0, 100 - (heartRateData.recoveryTime / 180) * 100)} 
                      className="h-2" 
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">심혈관 효율성</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">심박수 예비력</span>
                      <span className="font-medium">{heartRateData.hrReserve} BPM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">체력 나이</span>
                      <span className={`font-medium ${heartRateData.fitnessAge < measurement.age ? 'text-green-600' : 'text-gray-600'}`}>
                        {Math.round(heartRateData.fitnessAge)}세
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">심혈관 등급</span>
                      <Badge variant={heartRateData.fitnessAge < measurement.age ? 'default' : 'outline'}>
                        {heartRateData.fitnessAge < measurement.age ? '우수' : '보통'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}