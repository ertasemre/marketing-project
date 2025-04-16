import React, { useState } from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

// Analiz sonuçları için tip tanımlamaları
type StatusType = 'success' | 'warning' | 'error' | 'pending';

interface EventCheck {
  name: string;
  found: boolean;
  status: StatusType;
  description: string;
}

interface GA4Check {
  notSetPercentage: number;
  hasEcommerce: boolean;
  ecommerceEvents: EventCheck[];
  events: EventCheck[];
  status: StatusType;
  issues: string[];
  recommendations: string[];
}

interface AdsCheck {
  connected: boolean;
  conversionTracking: boolean;
  remarketing: boolean;
  status: StatusType;
  issues: string[];
  recommendations: string[];
}

interface MetaCheck {
  pixelDetected: boolean;
  conversionAPI: boolean;
  status: StatusType;
  events: EventCheck[];
  issues: string[];
  recommendations: string[];
}

interface TagAssistantData {
  url: string;
  scanDate: string;
  ga4: GA4Check;
  googleAds: AdsCheck;
  meta: MetaCheck;
}

// Mock veri
const mockTagAssistantData: TagAssistantData = {
  url: 'https://example.com',
  scanDate: new Date().toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }),
  ga4: {
    notSetPercentage: 8.4,
    hasEcommerce: true,
    ecommerceEvents: [
      { 
        name: 'view_item', 
        found: true, 
        status: 'success',
        description: 'Ürün görüntüleme olayı doğru şekilde yapılandırılmış.' 
      },
      { 
        name: 'add_to_cart', 
        found: true, 
        status: 'success',
        description: 'Sepete ekleme olayı doğru şekilde yapılandırılmış.' 
      },
      { 
        name: 'begin_checkout', 
        found: true, 
        status: 'warning',
        description: 'Ödeme başlatma olayı bulunuyor ancak eksik parametreler var.' 
      },
      { 
        name: 'purchase', 
        found: true, 
        status: 'error',
        description: 'Satın alma olayında transaction_id parametresi eksik.' 
      }
    ],
    events: [
      { 
        name: 'page_view', 
        found: true, 
        status: 'success',
        description: 'Sayfa görüntüleme olayı doğru şekilde yapılandırılmış.' 
      },
      { 
        name: 'user_engagement', 
        found: true, 
        status: 'success',
        description: 'Kullanıcı etkileşimi olayı doğru şekilde yapılandırılmış.' 
      },
      { 
        name: 'scroll', 
        found: false, 
        status: 'warning',
        description: 'Sayfa kaydırma olayı bulunamadı. Kullanıcı davranışını daha iyi anlamak için eklenebilir.' 
      }
    ],
    status: 'warning',
    issues: [
      'GA4 ölçümlerinde %8.4 oranında (not set) değeri tespit edildi.',
      'Satın alma olayında transaction_id parametresi eksik.',
      'Ödeme başlatma olayında eksik parametreler var.'
    ],
    recommendations: [
      'Sayfa URL yönlendirmelerini kontrol edin ve tüm sayfalarda GA4 tag\'inin doğru yüklendiğinden emin olun.',
      'purchase olayına benzersiz transaction_id ekleyin.',
      'begin_checkout olayına value ve currency parametrelerini ekleyin.'
    ]
  },
  googleAds: {
    connected: true,
    conversionTracking: true,
    remarketing: false,
    status: 'warning',
    issues: [
      'Yeniden pazarlama etiketi aktif değil veya doğru yapılandırılmamış.',
      'Dönüşüm izleme etkinleştirilmiş ancak bazı ürün kategorilerinde eksik.'
    ],
    recommendations: [
      'Google Ads remarketing tag\'ini etkinleştirin ve tüm sayfalarda çalıştığından emin olun.',
      'Tüm ürün kategorileri için dönüşüm izleme kurallarını kontrol edin.'
    ]
  },
  meta: {
    pixelDetected: true,
    conversionAPI: false,
    status: 'error',
    events: [
      { 
        name: 'PageView', 
        found: true, 
        status: 'success',
        description: 'Sayfa görüntüleme olayı doğru şekilde yapılandırılmış.' 
      },
      { 
        name: 'ViewContent', 
        found: true, 
        status: 'success',
        description: 'İçerik görüntüleme olayı doğru şekilde yapılandırılmış.' 
      },
      { 
        name: 'AddToCart', 
        found: true, 
        status: 'warning',
        description: 'Sepete ekleme olayı bulunuyor ancak content_ids parametresi eksik.' 
      },
      { 
        name: 'Purchase', 
        found: false, 
        status: 'error',
        description: 'Satın alma olayı bulunamadı. Meta Pixel için kritik bir olay eksik.' 
      }
    ],
    issues: [
      'Meta Conversion API entegrasyonu bulunamadı.',
      'Satın alma (Purchase) olayı bulunamadı.',
      'Sepete ekleme olayında content_ids parametresi eksik.'
    ],
    recommendations: [
      'ITP ve tarayıcı sınırlamalarını aşmak için Meta Conversion API\'ı ekleyin.',
      'Purchase olayını hem Pixel hem de Conversion API ile entegre edin.',
      'AddToCart olayına content_ids parametresini ekleyin.'
    ]
  }
};

// Status iconları için bileşen
const StatusIcon: React.FC<{ status: StatusType }> = ({ status }) => {
  switch (status) {
    case 'success':
      return <CheckCircleIcon className="h-5 w-5 text-success-600" />;
    case 'warning':
      return <ExclamationTriangleIcon className="h-5 w-5 text-warning-600" />;
    case 'error':
      return <ExclamationTriangleIcon className="h-5 w-5 text-error-600" />;
    case 'pending':
      return <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />;
    default:
      return null;
  }
};

// Olay kontrolü kartı
const EventCheckCard: React.FC<{ event: EventCheck }> = ({ event }) => {
  return (
    <div className="border rounded-lg p-3 mb-2 bg-white">
      <div className="flex items-center">
        <StatusIcon status={event.status} />
        <span className={`ml-2 font-medium ${event.found ? '' : 'line-through text-gray-500'}`}>
          {event.name}
        </span>
        <span className={`ml-auto text-xs ${
          event.status === 'success' ? 'text-success-600' : 
          event.status === 'warning' ? 'text-warning-600' : 
          event.status === 'error' ? 'text-error-600' : 'text-gray-500'
        }`}>
          {event.found ? 'Bulundu' : 'Bulunamadı'}
        </span>
      </div>
      <p className="text-xs text-gray-600 mt-1">{event.description}</p>
    </div>
  );
};

// Sorunlar ve Öneriler bileşeni
const IssuesAndRecommendations: React.FC<{ 
  issues: string[], 
  recommendations: string[] 
}> = ({ issues, recommendations }) => {
  return (
    <div className="mt-4 space-y-4">
      {issues.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Tespit Edilen Sorunlar</h4>
          <ul className="list-disc pl-5 space-y-1">
            {issues.map((issue, index) => (
              <li key={index} className="text-sm text-gray-600">{issue}</li>
            ))}
          </ul>
        </div>
      )}
      
      {recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Öneriler</h4>
          <ul className="list-disc pl-5 space-y-1">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-gray-600">{recommendation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Genişletilebilir panel bileşeni
const ExpandablePanel: React.FC<{ 
  title: string;
  status: StatusType;
  children: React.ReactNode;
}> = ({ title, status, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer ${
          status === 'success' ? 'bg-success-50 border-b border-success-200' : 
          status === 'warning' ? 'bg-warning-50 border-b border-warning-200' : 
          status === 'error' ? 'bg-error-50 border-b border-error-200' : 'bg-gray-50 border-b border-gray-200'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <StatusIcon status={status} />
          <h3 className="text-lg font-medium ml-2">{title}</h3>
        </div>
        {isExpanded ? 
          <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : 
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        }
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// Ana Tag Assistant bileşeni
const TagAssistant: React.FC = () => {
  const [tagData, setTagData] = useState<TagAssistantData>(mockTagAssistantData);
  const [isScanning, setIsScanning] = useState(false);
  
  // Tarama işlemini simüle et
  const handleScan = () => {
    setIsScanning(true);
    
    // Gerçek bir uygulamada burada API çağrısı yapılır
    setTimeout(() => {
      setTagData({
        ...mockTagAssistantData,
        scanDate: new Date().toLocaleDateString('tr-TR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      setIsScanning(false);
    }, 2500);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tag Assistant</h1>
        
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isScanning ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {isScanning ? (
            <>
              <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Taranıyor...
            </>
          ) : (
            'Yeniden Tara'
          )}
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {tagData.url}
            </h2>
            <p className="text-sm text-gray-500">
              Son tarama: {tagData.scanDate}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              tagData.ga4.status === 'success' ? 'bg-success-100 text-success-800' : 
              tagData.ga4.status === 'warning' ? 'bg-warning-100 text-warning-800' : 
              tagData.ga4.status === 'error' ? 'bg-error-100 text-error-800' : 'bg-gray-100 text-gray-800'
            }`}>
              GA4
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              tagData.googleAds.status === 'success' ? 'bg-success-100 text-success-800' : 
              tagData.googleAds.status === 'warning' ? 'bg-warning-100 text-warning-800' : 
              tagData.googleAds.status === 'error' ? 'bg-error-100 text-error-800' : 'bg-gray-100 text-gray-800'
            }`}>
              Google Ads
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              tagData.meta.status === 'success' ? 'bg-success-100 text-success-800' : 
              tagData.meta.status === 'warning' ? 'bg-warning-100 text-warning-800' : 
              tagData.meta.status === 'error' ? 'bg-error-100 text-error-800' : 'bg-gray-100 text-gray-800'
            }`}>
              Meta
            </span>
          </div>
        </div>
      </div>
      
      {/* GA4 Bölümü */}
      <ExpandablePanel title="Google Analytics 4" status={tagData.ga4.status}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Not Set Oranı</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">%{tagData.ga4.notSetPercentage}</span>
              <span className={`ml-2 text-xs ${
                tagData.ga4.notSetPercentage < 5 ? 'text-success-600' : 
                tagData.ga4.notSetPercentage < 10 ? 'text-warning-600' : 'text-error-600'
              }`}>
                {tagData.ga4.notSetPercentage < 5 ? 'İyi' : 
                tagData.ga4.notSetPercentage < 10 ? 'Orta' : 'Kötü'}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">E-ticaret Takibi</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.ga4.hasEcommerce ? 'Aktif' : 'Pasif'}</span>
              <span className={`ml-2 text-xs ${tagData.ga4.hasEcommerce ? 'text-success-600' : 'text-error-600'}`}>
                {tagData.ga4.hasEcommerce ? 'Yapılandırılmış' : 'Yapılandırılmamış'}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Olaylar</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.ga4.events.filter(e => e.found).length}</span>
              <span className="text-sm text-gray-500 ml-1">/ {tagData.ga4.events.length}</span>
            </div>
          </div>
        </div>
        
        {tagData.ga4.hasEcommerce && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">E-ticaret Olayları</h3>
            <div className="space-y-2">
              {tagData.ga4.ecommerceEvents.map((event, idx) => (
                <EventCheckCard key={idx} event={event} />
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Temel Olaylar</h3>
          <div className="space-y-2">
            {tagData.ga4.events.map((event, idx) => (
              <EventCheckCard key={idx} event={event} />
            ))}
          </div>
        </div>
        
        <IssuesAndRecommendations 
          issues={tagData.ga4.issues} 
          recommendations={tagData.ga4.recommendations} 
        />
      </ExpandablePanel>
      
      {/* Google Ads Bölümü */}
      <ExpandablePanel title="Google Ads" status={tagData.googleAds.status}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">GA4 Bağlantısı</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.googleAds.connected ? 'Aktif' : 'Pasif'}</span>
              <span className={`ml-2 text-xs ${tagData.googleAds.connected ? 'text-success-600' : 'text-error-600'}`}>
                {tagData.googleAds.connected ? 'Bağlı' : 'Bağlı Değil'}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Dönüşüm Takibi</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.googleAds.conversionTracking ? 'Aktif' : 'Pasif'}</span>
              <span className={`ml-2 text-xs ${tagData.googleAds.conversionTracking ? 'text-success-600' : 'text-error-600'}`}>
                {tagData.googleAds.conversionTracking ? 'Yapılandırılmış' : 'Yapılandırılmamış'}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Yeniden Pazarlama</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.googleAds.remarketing ? 'Aktif' : 'Pasif'}</span>
              <span className={`ml-2 text-xs ${tagData.googleAds.remarketing ? 'text-success-600' : 'text-error-600'}`}>
                {tagData.googleAds.remarketing ? 'Yapılandırılmış' : 'Yapılandırılmamış'}
              </span>
            </div>
          </div>
        </div>
        
        <IssuesAndRecommendations 
          issues={tagData.googleAds.issues} 
          recommendations={tagData.googleAds.recommendations} 
        />
      </ExpandablePanel>
      
      {/* Meta Bölümü */}
      <ExpandablePanel title="Meta (Facebook & Instagram)" status={tagData.meta.status}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Meta Pixel</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.meta.pixelDetected ? 'Aktif' : 'Pasif'}</span>
              <span className={`ml-2 text-xs ${tagData.meta.pixelDetected ? 'text-success-600' : 'text-error-600'}`}>
                {tagData.meta.pixelDetected ? 'Tespit Edildi' : 'Bulunamadı'}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Conversion API</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.meta.conversionAPI ? 'Aktif' : 'Pasif'}</span>
              <span className={`ml-2 text-xs ${tagData.meta.conversionAPI ? 'text-success-600' : 'text-error-600'}`}>
                {tagData.meta.conversionAPI ? 'Yapılandırılmış' : 'Yapılandırılmamış'}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Olaylar</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{tagData.meta.events.filter(e => e.found).length}</span>
              <span className="text-sm text-gray-500 ml-1">/ {tagData.meta.events.length}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Meta Olayları</h3>
          <div className="space-y-2">
            {tagData.meta.events.map((event, idx) => (
              <EventCheckCard key={idx} event={event} />
            ))}
          </div>
        </div>
        
        <IssuesAndRecommendations 
          issues={tagData.meta.issues} 
          recommendations={tagData.meta.recommendations} 
        />
      </ExpandablePanel>
    </div>
  );
};

export default TagAssistant; 