import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Download, Smartphone, Share2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

interface MobileAppIntegrationProps {
  measurementData?: any;
}

export default function MobileAppIntegration({ measurementData }: MobileAppIntegrationProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [showQRCode, setShowQRCode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // PWA 설치 프롬프트 이벤트 리스너
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // 알림 권한 상태 확인
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // PWA 앱 설치
  const handleInstallApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast({
        title: "앱 설치 완료!",
        description: "KidsMotion 앱이 홈 화면에 추가되었습니다.",
      });
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // 푸시 알림 권한 요청
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: "알림 지원 안됨",
        description: "이 브라우저는 푸시 알림을 지원하지 않습니다.",
        variant: "destructive"
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        toast({
          title: "알림 권한 승인!",
          description: "측정 완료 및 분석 결과를 푸시 알림으로 받을 수 있습니다.",
        });
        
        // 서비스 워커 등록 및 푸시 구독
        await registerPushNotification();
      } else {
        toast({
          title: "알림 권한 거부됨",
          description: "설정에서 알림 권한을 허용해주세요.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };

  // 서비스 워커 등록 및 푸시 구독
  const registerPushNotification = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      // VAPID 키 (실제 프로덕션에서는 환경변수로 관리)
      const vapidPublicKey = 'BP8_TZhwNgpvgQZhQJYKlGHi7nLzLGhUHJP6pWWkXIzVfK5_jmkXgQ4hJ8Lq3mNxP5sHf2aGmZzYXwV1UoN2Ics';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
      });

      // 서버에 구독 정보 전송
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      console.log('Push subscription registered:', subscription);
    } catch (error) {
      console.error('Push notification registration error:', error);
    }
  };

  // 테스트 푸시 알림 전송
  const sendTestNotification = () => {
    if (notificationPermission === 'granted') {
      new Notification('KidsMotion 테스트 알림', {
        body: '체력 측정 완료! 결과를 확인해보세요.',
        icon: '/generated-icon.png',
        badge: '/generated-icon.png',
        tag: 'fitness-test',
        data: { url: window.location.href }
      });
    }
  };

  // 모바일 공유
  const shareToMobile = async () => {
    const shareData = {
      title: 'KidsMotion 체력 분석 결과',
      text: `${measurementData?.studentName || '학생'}의 체력 측정 결과를 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // 클립보드 복사
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "링크 복사됨!",
          description: "URL이 클립보드에 복사되었습니다.",
        });
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* PWA 설치 */}
      {isInstallable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              모바일 앱 설치
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              KidsMotion을 모바일 앱으로 설치하여 더욱 편리하게 이용하세요!
            </p>
            <Button onClick={handleInstallApp} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              홈 화면에 추가하기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 푸시 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            푸시 알림
            <Badge variant={notificationPermission === 'granted' ? 'default' : 'outline'}>
              {notificationPermission === 'granted' ? '활성화' : 
               notificationPermission === 'denied' ? '비활성화' : '미설정'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            측정 완료 및 분석 결과를 실시간으로 받아보세요.
          </p>
          
          {notificationPermission === 'default' && (
            <Button onClick={requestNotificationPermission} className="w-full">
              <Bell className="w-4 h-4 mr-2" />
              알림 권한 허용하기
            </Button>
          )}
          
          {notificationPermission === 'granted' && (
            <div className="space-y-2">
              <Button onClick={sendTestNotification} variant="outline" className="w-full">
                테스트 알림 보내기
              </Button>
              <p className="text-xs text-green-600">
                ✓ 푸시 알림이 활성화되었습니다
              </p>
            </div>
          )}
          
          {notificationPermission === 'denied' && (
            <div className="text-center space-y-2">
              <p className="text-sm text-red-600">
                알림이 차단되었습니다. 브라우저 설정에서 알림을 허용해주세요.
              </p>
              <Button onClick={requestNotificationPermission} variant="outline" size="sm">
                다시 시도
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 모바일 공유 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            모바일 공유
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={shareToMobile} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              공유하기
            </Button>
            <Button onClick={() => setShowQRCode(!showQRCode)} variant="outline">
              <QrCode className="w-4 h-4 mr-2" />
              QR코드
            </Button>
          </div>
          
          {showQRCode && (
            <div className="flex justify-center p-4 bg-white border rounded-lg">
              <QRCodeSVG
                value={window.location.href}
                size={150}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={true}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 모바일 최적화 팁 */}
      <Card>
        <CardHeader>
          <CardTitle>모바일 사용 팁</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>• 홈 화면에 추가하면 앱처럼 사용할 수 있어요</li>
            <li>• 알림을 허용하면 측정 결과를 바로 받아볼 수 있어요</li>
            <li>• QR코드로 다른 기기에서도 쉽게 접속할 수 있어요</li>
            <li>• 오프라인에서도 일부 기능을 사용할 수 있어요</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}