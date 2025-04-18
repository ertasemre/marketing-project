import React, { useState } from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// Analiz sonuçları için tip tanımlamaları
type StatusType = 'success' | 'warning' | 'error' | 'pending';
type IntegrationType = 'pixel' | 'api' | 'gtm' | 'code' | 'other';
type TechnicalLevel = 'basic' | 'intermediate' | 'advanced';

interface EventParam {
  name: string;
  found: boolean;
  required: boolean;
  value?: string;
  example?: string;
  description?: string;
}

interface EventCheck {
  name: string;
  found: boolean;
  status: StatusType;
  description: string;
  importance: 'critical' | 'recommended' | 'optional';
  parameters?: EventParam[];
  technicalDetails?: string;
  lastTriggered?: string;
  frequency?: number; // 24 saat içinde kaç kez
  firstDetected?: string;
  whyImportant?: string;
  howToFix?: string;
}

interface GA4Check {
  notSetPercentage: number;
  hasEcommerce: boolean;
  healthScore: number; // Yüzde olarak
  integrationType: IntegrationType;
  connected: boolean;
  propertyId?: string;
  measurementId?: string;
  ecommerceEvents: EventCheck[];
  events: EventCheck[];
  status: StatusType;
  issues: string[];
  recommendations: string[];
  // GA4 denetim alanları
  dataStreams?: {
    web: boolean;
    ios: boolean;
    android: boolean;
    multipleStreams: boolean;
  };
  tagHealth?: {
    isWorking: boolean;
    wrongOrder: boolean;
    duplicated: boolean;
    eventsBeforePageview: boolean;
  };
  loadTiming?: {
    averageLoadTime: number; // ms cinsinden
    isSlow: boolean;
  };
  installationMethod?: {
    gtm: boolean;
    hardcoded: boolean;
    multipleInstances: boolean;
  };
  generalSettings?: {
    timezone: string;
    currency: string;
    industry: string;
    correctSettings: boolean;
  };
  dataSettings?: {
    googleSignals: boolean;
    dataRetention: number; // Ay cinsinden
    recommendedRetention: boolean;
  };
  attributionSettings?: {
    model: 'data-driven' | 'last-click' | 'first-click' | 'linear' | 'position-based' | 'time-decay';
    conversionWindow: number; // Gün cinsinden
    acquisitionWindow: number; // Gün cinsinden
  };
  domainSetup?: {
    domains: string[];
    hasCrossDomainIssues: boolean;
  };
  botTraffic?: {
    percentage: number;
    isHigh: boolean;
  };
  devTraffic?: {
    hasLocalhost: boolean;
    hasTestEnvironment: boolean;
    hasPaymentGateways: boolean;
    percentage: number;
  };
  anomalies?: {
    users: { detected: boolean; date?: string; percentage?: number }[];
    sessions: { detected: boolean; date?: string; percentage?: number }[];
    pageviews: { detected: boolean; date?: string; percentage?: number }[];
    conversions: { detected: boolean; date?: string; percentage?: number }[];
  };
  eventTracking?: {
    automatic: number;
    recommended: number;
    custom: number;
    missingCritical: string[];
  };
  eventNaming?: {
    consistent: boolean;
    hasUppercase: boolean;
    recommendedFormat: 'snake_case' | 'camelCase';
  };
  conversionEvents?: {
    total: number;
    active: number;
    withValue: number;
  };
  siteSearch?: {
    isConfigured: boolean;
    isWorking: boolean;
    searchTerm: string;
  };
  utmAndChannels?: {
    directTrafficPercentage: number;
    highDirectTraffic: boolean;
    hasCustomChannels: boolean;
  };
  ecommerce?: {
    hasFunnelEvents: boolean;
    missingParameters: { event: string; params: string[] }[];
    hasUniqueTransactionId: boolean;
    duplicateTransactions: number;
  };
  googleAdsLink?: {
    isLinked: boolean;
    notSetPercentage: number;
  };
  bigQueryLink?: {
    isLinked: boolean;
    hasDailyExport: boolean;
  };
  audiences?: {
    automatic: number;
    manual: number;
    predictive: number;
  };
  customDefinitions?: {
    dimensions: number;
    metrics: number;
  };
  rawData?: any; // Teknik veriler için
}

interface AdsCheck {
  connected: boolean;
  conversionTracking: boolean;
  remarketing: boolean;
  status: StatusType;
  healthScore: number;
  integrationType: IntegrationType;
  conversionIds?: string[];
  linkedWithGA4?: boolean;
  enhancedConversions?: boolean;
  issues: string[];
  recommendations: string[];
  // Google Ads denetim alanları
  campaignTypes?: {
    search: boolean;
    pmax: boolean;
    display: boolean;
    demandGen: boolean;
    shopping: boolean;
    video: boolean;
    missingTypes: string[];
  };
  campaignNaming?: {
    consistent: boolean;
    issues: string[];
  };
  accountSettings?: {
    autoTagging: boolean;
    enhancedConversions: boolean;
    leadFormTerms: boolean;
  };
  autoApplyRecommendations?: {
    count: number;
    isExcessive: boolean;
  };
  exclusionLists?: {
    ip: boolean;
    apps: boolean;
    placements: boolean;
    negativeKeywords: boolean;
  };
  conversionSettings?: {
    total: number;
    primary: number;
    sources: {
      web: number;
      analytics: number;
      app: number;
      call: number;
      other: number;
    };
    funnelComplete: boolean;
  };
  attributionModel?: {
    currentModel: string;
    lastClickEvents: number;
    dataDriverEligible: number;
  };
  keywordQuality?: {
    lowQualityPercentage: number;
    caseSensitiveCount: number;
    distribution: {
      broad: number;
      exact: number;
      phrase: number;
    };
    matchTypePerformance: {
      bestPerformingType: string;
      worstPerformingType: string;
    };
  };
  searchTermPerformance?: {
    addedVsNotAddedCost: number; // % olarak fark
    exactMatchSuggestions: number;
  };
  adQuality?: {
    adsPerAdGroup: number;
    adGroupsWithLessThanThreeAds: number;
    adStrengthDistribution: {
      excellent: number;
      good: number;
      average: number;
      poor: number;
    };
    disapprovedAds: number;
  };
  adExtensions?: {
    hasSitelinks: boolean;
    hasCallouts: boolean;
    hasStructuredSnippets: boolean;
    campaignsWithLessThanFourExtensions: number;
  };
  landingPageQuality?: {
    brokenUrls: number;
    redirectUrls: number;
  };
  rawData?: any; // Teknik veriler için
}

interface MetaCheck {
  pixelDetected: boolean;
  conversionAPI: boolean;
  status: StatusType;
  healthScore: number;
  integrationType: IntegrationType;
  connected: boolean;
  pixelId?: string;
  advancedMatching?: boolean;
  events: EventCheck[];
  issues: string[];
  recommendations: string[];
  rawData?: any; // Teknik veriler için
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
    healthScore: 72,
    integrationType: 'gtm',
    connected: true,
    propertyId: 'G-ABC123XYZ',
    measurementId: 'G-ABC123XYZ',
    ecommerceEvents: [
      { 
        name: 'view_item', 
        found: true, 
        status: 'success',
        description: 'Ürün görüntüleme olayı doğru şekilde yapılandırılmış.',
        importance: 'recommended',
        lastTriggered: '2 saat önce',
        frequency: 152,
        firstDetected: '14 gün önce',
        whyImportant: 'Ürün sayfalarında hangi ürünlerin görüntülendiğini ölçer. Bu, kullanıcıların hangi ürünlere ilgi gösterdiğini anlamanıza yardımcı olur.',
        howToFix: 'Bu olay zaten doğru şekilde çalışıyor.',
        parameters: [
          { name: 'item_id', found: true, required: true, value: 'ID-12345' },
          { name: 'item_name', found: true, required: true, value: 'Örnek Ürün' },
          { name: 'currency', found: true, required: true, value: 'TRY' },
          { name: 'value', found: true, required: true, value: '149.99' }
        ]
      },
      { 
        name: 'add_to_cart', 
        found: true, 
        status: 'success',
        description: 'Sepete ekleme olayı doğru şekilde yapılandırılmış.',
        importance: 'critical',
        lastTriggered: '1 saat önce',
        frequency: 78,
        firstDetected: '14 gün önce',
        whyImportant: 'Kullanıcıların sepete ekledikleri ürünleri takip eder. Bu, dönüşüm hunisindeki ilk adımdır ve sepet terki analizi için kritik öneme sahiptir.',
        howToFix: 'Bu olay zaten doğru şekilde çalışıyor.',
        parameters: [
          { name: 'item_id', found: true, required: true, value: 'ID-12345' },
          { name: 'item_name', found: true, required: true, value: 'Örnek Ürün' },
          { name: 'currency', found: true, required: true, value: 'TRY' },
          { name: 'value', found: true, required: true, value: '149.99' }
        ]
      },
      { 
        name: 'begin_checkout', 
        found: true, 
        status: 'warning',
        description: 'Ödeme başlatma olayı bulunuyor ancak eksik parametreler var.',
        importance: 'critical',
        lastTriggered: '3 saat önce',
        frequency: 42,
        firstDetected: '14 gün önce',
        whyImportant: 'Ödeme sürecinin başlatıldığını belirtir. Bu, dönüşüm hunisindeki kritik bir adımdır ve ödeme süreci optimizasyonu için önemlidir.',
        howToFix: 'value ve currency parametrelerini eklemeniz gerekiyor. Bunlar, ödeme sürecinin değerini ölçmek için önemlidir.',
        parameters: [
          { name: 'items', found: true, required: true },
          { name: 'value', found: false, required: true, example: '149.99' },
          { name: 'currency', found: false, required: true, example: 'TRY' }
        ]
      },
      { 
        name: 'purchase', 
        found: true, 
        status: 'error',
        description: 'Satın alma olayında transaction_id parametresi eksik.',
        importance: 'critical',
        lastTriggered: '5 saat önce',
        frequency: 12,
        firstDetected: '14 gün önce',
        whyImportant: 'Tamamlanan satın almaları ölçer. Bu, gelir ve dönüşüm takibi için en kritik olaydır. Tüm pazarlama kanallarınızın performansını değerlendirmek için gereklidir.',
        howToFix: 'transaction_id parametresi eklenmelidir. Bu, her satın alma işlemini benzersiz şekilde tanımlar ve çift sayımı önler. Her sipariş için benzersiz bir değer olmalıdır.',
        parameters: [
          { name: 'transaction_id', found: false, required: true, example: 'T-12345' },
          { name: 'value', found: true, required: true, value: '149.99' },
          { name: 'currency', found: true, required: true, value: 'TRY' },
          { name: 'items', found: true, required: true }
        ]
      }
    ],
    events: [
      { 
        name: 'page_view', 
        found: true, 
        status: 'success',
        description: 'Sayfa görüntüleme olayı doğru şekilde yapılandırılmış.',
        importance: 'critical',
        lastTriggered: '1 dakika önce',
        frequency: 1254,
        firstDetected: '30 gün önce',
        whyImportant: 'Kullanıcıların hangi sayfaları ziyaret ettiğini ölçer. Bu, site trafiğinizi anlamak için temel bir ölçümdür.',
        howToFix: 'Bu olay zaten doğru şekilde çalışıyor.'
      },
      { 
        name: 'user_engagement', 
        found: true, 
        status: 'success',
        description: 'Kullanıcı etkileşimi olayı doğru şekilde yapılandırılmış.',
        importance: 'recommended',
        lastTriggered: '2 dakika önce',
        frequency: 980,
        firstDetected: '30 gün önce',
        whyImportant: 'Kullanıcının sayfada geçirdiği aktif zamanı ölçer. Bu, içeriğinizin ne kadar ilgi çekici olduğunu anlamanıza yardımcı olur.',
        howToFix: 'Bu olay zaten doğru şekilde çalışıyor.'
      },
      { 
        name: 'scroll', 
        found: false, 
        status: 'warning',
        description: 'Sayfa kaydırma olayı bulunamadı. Kullanıcı davranışını daha iyi anlamak için eklenebilir.',
        importance: 'optional',
        whyImportant: 'Kullanıcıların sayfayı ne kadar aşağı kaydırdığını ölçer. Bu, içeriğinizin ne kadarının görüntülendiğini anlamanızı sağlar.',
        howToFix: 'GTM üzerinden Enhanced Measurement özelliğini etkinleştirin veya özel bir scroll event\'i tanımlayın.'
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
    ],
    // Yeni GA4 denetim alanları
    dataStreams: {
      web: true,
      ios: true,
      android: false,
      multipleStreams: true
    },
    tagHealth: {
      isWorking: true,
      wrongOrder: false,
      duplicated: true,
      eventsBeforePageview: true
    },
    loadTiming: {
      averageLoadTime: 1850, // ms cinsinden
      isSlow: true
    },
    installationMethod: {
      gtm: true,
      hardcoded: false,
      multipleInstances: true
    },
    generalSettings: {
      timezone: 'Europe/Istanbul',
      currency: 'TRY',
      industry: 'E-commerce',
      correctSettings: true
    },
    dataSettings: {
      googleSignals: false,
      dataRetention: 2, // Ay cinsinden
      recommendedRetention: false
    },
    attributionSettings: {
      model: 'last-click',
      conversionWindow: 30, // Gün cinsinden
      acquisitionWindow: 30 // Gün cinsinden
    },
    domainSetup: {
      domains: ['example.com', 'blog.example.com', 'shop.example.com'],
      hasCrossDomainIssues: true
    },
    botTraffic: {
      percentage: 12.5,
      isHigh: true
    },
    devTraffic: {
      hasLocalhost: true,
      hasTestEnvironment: true,
      hasPaymentGateways: false,
      percentage: 5.2
    },
    anomalies: {
      users: [
        { detected: true, date: '2023-05-15', percentage: 45 },
        { detected: true, date: '2023-06-02', percentage: -30 }
      ],
      sessions: [
        { detected: true, date: '2023-05-15', percentage: 40 }
      ],
      pageviews: [
        { detected: false }
      ],
      conversions: [
        { detected: true, date: '2023-06-10', percentage: -60 }
      ]
    },
    eventTracking: {
      automatic: 8,
      recommended: 4,
      custom: 12,
      missingCritical: ['login', 'sign_up', 'generate_lead']
    },
    eventNaming: {
      consistent: false,
      hasUppercase: true,
      recommendedFormat: 'snake_case'
    },
    conversionEvents: {
      total: 8,
      active: 6,
      withValue: 3
    },
    siteSearch: {
      isConfigured: true,
      isWorking: false,
      searchTerm: 'q'
    },
    utmAndChannels: {
      directTrafficPercentage: 42.5,
      highDirectTraffic: true,
      hasCustomChannels: false
    },
    ecommerce: {
      hasFunnelEvents: true,
      missingParameters: [
        { event: 'purchase', params: ['transaction_id'] },
        { event: 'begin_checkout', params: ['value', 'currency'] }
      ],
      hasUniqueTransactionId: false,
      duplicateTransactions: 8
    },
    googleAdsLink: {
      isLinked: true,
      notSetPercentage: 15.2
    },
    bigQueryLink: {
      isLinked: false,
      hasDailyExport: false
    },
    audiences: {
      automatic: 3,
      manual: 5,
      predictive: 0
    },
    customDefinitions: {
      dimensions: 8,
      metrics: 2
    },
    rawData: {
      // Teknik inceleme verileri burada olacak
      measurementId: 'G-ABC123XYZ',
      timestamp: new Date().toISOString(),
      pageLoadTime: {
        avg: 1850,
        min: 950,
        max: 3200
      },
      eventSequence: [
        { name: 'page_view', time: 0 },
        { name: 'user_engagement', time: 1200 },
        { name: 'add_to_cart', time: 4500 }
      ],
      debugMode: false,
      consentStatus: {
        analytics_storage: 'granted',
        ad_storage: 'denied'
      }
    }
  },
  googleAds: {
    connected: true,
    conversionTracking: true,
    remarketing: false,
    status: 'warning',
    healthScore: 65,
    integrationType: 'gtm',
    conversionIds: ['AW-123456789'],
    linkedWithGA4: true,
    enhancedConversions: false,
    issues: [
      'Yeniden pazarlama etiketi aktif değil veya doğru yapılandırılmamış.',
      'Dönüşüm izleme etkinleştirilmiş ancak bazı ürün kategorilerinde eksik.'
    ],
    recommendations: [
      'Google Ads remarketing tag\'ini etkinleştirin ve tüm sayfalarda çalıştığından emin olun.',
      'Tüm ürün kategorileri için dönüşüm izleme kurallarını kontrol edin.',
      'Gelişmiş dönüşüm özelliğini (Enhanced Conversions) etkinleştirerek ölçüm doğruluğunu artırın.'
    ],
    rawData: {
      // Teknik inceleme verileri burada olacak
      adIds: ['AW-123456789'],
      loadTimes: {
        avg: 780,
        min: 450,
        max: 1200
      },
      conversionsConfigured: true,
      remarketingConfigured: false
    }
  },
  meta: {
    pixelDetected: true,
    conversionAPI: false,
    status: 'error',
    healthScore: 45,
    integrationType: 'pixel',
    connected: true,
    pixelId: '123456789012345',
    advancedMatching: false,
    events: [
      { 
        name: 'PageView', 
        found: true, 
        status: 'success',
        description: 'Sayfa görüntüleme olayı doğru şekilde yapılandırılmış.',
        importance: 'critical',
        lastTriggered: '1 dakika önce',
        frequency: 1254,
        firstDetected: '30 gün önce',
        whyImportant: 'Sayfa görüntülemelerini kaydeder. Bu, tüm Meta piksel uygulamaları için temel olaydır ve hedefleme ve analiz için gereklidir.',
        howToFix: 'Bu olay zaten doğru şekilde çalışıyor.',
        parameters: []
      },
      { 
        name: 'ViewContent', 
        found: true, 
        status: 'success',
        description: 'İçerik görüntüleme olayı doğru şekilde yapılandırılmış.',
        importance: 'recommended',
        lastTriggered: '5 dakika önce',
        frequency: 658,
        firstDetected: '30 gün önce',
        whyImportant: 'Ürün sayfası görüntülemelerini kaydeder. Yeniden hedefleme kampanyaları için önemlidir.',
        howToFix: 'Bu olay zaten doğru şekilde çalışıyor.',
        parameters: [
          { name: 'content_type', found: true, required: true, value: 'product' },
          { name: 'content_ids', found: true, required: true, value: '["ID-12345"]' }
        ]
      },
      { 
        name: 'AddToCart', 
        found: true, 
        status: 'warning',
        description: 'Sepete ekleme olayı bulunuyor ancak content_ids parametresi eksik.',
        importance: 'critical',
        lastTriggered: '10 dakika önce',
        frequency: 78,
        firstDetected: '30 gün önce',
        whyImportant: 'Kullanıcıların sepete ekledikleri ürünleri kaydeder. Dönüşüm hunisi optimizasyonu ve terkedilen sepet kampanyaları için kritik öneme sahiptir.',
        howToFix: 'content_ids parametresi eksik. Bu, hangi ürünlerin sepete eklendiğini belirtir. Ürün ID\'lerini bir dizi içinde geçmeniz gerekiyor.',
        parameters: [
          { name: 'content_type', found: true, required: true, value: 'product' },
          { name: 'content_ids', found: false, required: true, example: '["ID-12345"]' },
          { name: 'value', found: true, required: false, value: '149.99' },
          { name: 'currency', found: true, required: false, value: 'TRY' }
        ]
      },
      { 
        name: 'Purchase', 
        found: false, 
        status: 'error',
        description: 'Satın alma olayı bulunamadı. Meta Pixel için kritik bir olay eksik.',
        importance: 'critical',
        whyImportant: 'Tamamlanan satın almaları kaydeder. Meta reklamlarınızın dönüşüm performansını ölçmek için kritik öneme sahiptir. Bu olay olmadan ROAS hesaplanamaz ve Meta\'nın algoritması doğru çalışamaz.',
        howToFix: 'Satın alma onay sayfasında Purchase olayını tetikleyin. content_ids, value ve currency parametrelerini eklemeniz gerekiyor.',
        parameters: [
          { name: 'content_type', found: false, required: true, example: 'product' },
          { name: 'content_ids', found: false, required: true, example: '["ID-12345"]' },
          { name: 'value', found: false, required: true, example: '149.99' },
          { name: 'currency', found: false, required: true, example: 'TRY' }
        ]
      }
    ],
    issues: [
      'Meta Conversion API entegrasyonu bulunamadı.',
      'Satın alma (Purchase) olayı bulunamadı.',
      'Sepete ekleme olayında content_ids parametresi eksik.',
      'İleri düzey eşleştirme (Advanced Matching) özelliği aktif değil.'
    ],
    recommendations: [
      'ITP ve tarayıcı sınırlamalarını aşmak için Meta Conversion API\'ı ekleyin.',
      'Purchase olayını hem Pixel hem de Conversion API ile entegre edin.',
      'AddToCart olayına content_ids parametresini ekleyin.',
      'Daha iyi eşleştirme ve reklam performansı için Advanced Matching özelliğini etkinleştirin.'
    ],
    rawData: {
      // Teknik inceleme verileri burada olacak
      pixelId: '123456789012345',
      version: '2.9.115',
      capi: false,
      events: [
        { name: 'PageView', params: {} },
        { name: 'ViewContent', params: { content_type: 'product', content_ids: ['ID-12345'] } }
      ]
    }
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

// Platform Kartı bileşeni
const PlatformCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  status: StatusType;
  connected: boolean;
  integrationType: IntegrationType;
  eventCount: { found: number, total: number };
  healthScore: number;
  criticalIssue?: string;
  onViewDetails: () => void;
}> = ({ title, icon, status, connected, integrationType, eventCount, healthScore, criticalIssue, onViewDetails }) => {
  
  const getIntegrationTypeLabel = (type: IntegrationType) => {
    switch (type) {
      case 'pixel': return 'Pixel';
      case 'api': return 'API';
      case 'gtm': return 'GTM';
      case 'code': return 'Hardcoded';
      case 'other': return 'Diğer';
      default: return 'Bilinmiyor';
    }
  };
  
  const statusColorClass = 
    status === 'success' ? 'bg-success-500' : 
    status === 'warning' ? 'bg-warning-500' : 
    status === 'error' ? 'bg-error-500' : 'bg-gray-300';
    
  const statusBadgeClass = 
    status === 'success' ? 'bg-success-100 text-success-800' : 
    status === 'warning' ? 'bg-warning-100 text-warning-800' : 
    status === 'error' ? 'bg-error-100 text-error-800' : 'bg-gray-100 text-gray-800';
    
  const statusText = connected ? (
    status === 'success' ? 'Aktif' : 
    status === 'warning' ? 'Sorun Var' : 
    status === 'error' ? 'Kritik Hata' : 'Bilinmiyor'
  ) : 'Bağlı Değil';
  
  const healthColorClass = 
    healthScore >= 80 ? 'bg-success-500' : 
    healthScore >= 50 ? 'bg-warning-500' : 'bg-error-500';
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className={`h-2 ${statusColorClass}`}></div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass}`}>
            {statusText}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">Sağlık Puanı</span>
            <span className="font-medium">%{healthScore}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${healthColorClass}`} 
              style={{ width: `${healthScore}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500 block">Entegrasyon Tipi</span>
            <span className="font-medium">{getIntegrationTypeLabel(integrationType)}</span>
          </div>
          
          <div>
            <span className="text-gray-500 block">Olaylar</span>
            <span className="font-medium">{eventCount.found}/{eventCount.total}</span>
          </div>
        </div>
        
        {criticalIssue && (
          <div className="bg-error-50 border-l-4 border-error-500 p-3 mb-4 text-sm text-error-700">
            {criticalIssue}
          </div>
        )}
        
        <button
          onClick={onViewDetails}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          Detaya Git
        </button>
      </div>
    </div>
  );
};

// Olay Detayları Kartı
const EventDetailsCard: React.FC<{
  event: EventCheck;
  onCopyEventData?: () => void;
}> = ({ event, onCopyEventData }) => {
  const [expanded, setExpanded] = useState(!event.found || event.status !== 'success');
  
  return (
    <div className={`mb-4 rounded-lg border overflow-hidden ${
      event.status === 'success' ? 'border-success-200' : 
      event.status === 'warning' ? 'border-warning-200' : 
      event.status === 'error' ? 'border-error-200' : 'border-gray-200'
    }`}>
      <div 
        className={`p-4 cursor-pointer flex items-center justify-between ${
          event.status === 'success' ? 'bg-success-50' : 
          event.status === 'warning' ? 'bg-warning-50' : 
          event.status === 'error' ? 'bg-error-50' : 'bg-gray-50'
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <StatusIcon status={event.status} />
          <div className="ml-3">
            <span className={`font-medium ${event.found ? '' : 'line-through text-gray-500'}`}>
              {event.name}
            </span>
            <span className="text-xs ml-2 text-gray-500">
              {event.importance === 'critical' ? '(Kritik)' : 
               event.importance === 'recommended' ? '(Önerilen)' : '(İsteğe Bağlı)'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center">
          {event.lastTriggered && (
            <span className="text-xs text-gray-500 mr-4">
              Son: {event.lastTriggered}
            </span>
          )}
          
          {event.frequency && (
            <span className="text-xs text-gray-500 mr-4">
              24s: {event.frequency}x
            </span>
          )}
          
          <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 bg-white border-t border-gray-200">
          <p className="text-sm text-gray-700 mb-4">{event.description}</p>
          
          {event.parameters && event.parameters.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Parametreler</h4>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parametre</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Değer/Örnek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {event.parameters.map((param, idx) => (
                      <tr key={idx} className={param.found ? '' : 'bg-error-50'}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {param.name}
                          {param.required && <span className="text-error-600 ml-1">*</span>}
                        </td>
                        <td className="px-4 py-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            param.found ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                          }`}>
                            {param.found ? 'Bulundu' : 'Eksik'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {param.found ? param.value : (param.example ? `Örnek: ${param.example}` : '-')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {event.whyImportant && (
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-blue-800 flex items-center mb-1">
                  <InformationCircleIcon className="h-4 w-4 mr-1" />
                  Neden Önemli?
                </h4>
                <p className="text-sm text-blue-700">{event.whyImportant}</p>
              </div>
            )}
            
            {event.howToFix && event.status !== 'success' && (
              <div className="bg-primary-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-primary-800 flex items-center mb-1">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Nasıl Düzeltilir?
                </h4>
                <p className="text-sm text-primary-700">{event.howToFix}</p>
              </div>
            )}
          </div>
          
          {event.technicalDetails && onCopyEventData && (
            <div className="text-right">
              <button
                onClick={onCopyEventData}
                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                Teknik Veriyi Kopyala
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Google Ads detay analizi bileşeni
const GoogleAdsDetailAnalysis: React.FC<{ data: AdsCheck }> = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* 1. Kampanya Türleri ve Performansı */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Kampanya Türleri ve Performansı</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {data.campaignTypes && (
            <>
              <div className="bg-gray-50 p-3 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">Search</p>
                <p className={`text-sm font-medium ${data.campaignTypes.search ? 'text-success-600' : 'text-gray-400'}`}>
                  {data.campaignTypes.search ? 'Aktif' : 'Pasif'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">PMax</p>
                <p className={`text-sm font-medium ${data.campaignTypes.pmax ? 'text-success-600' : 'text-gray-400'}`}>
                  {data.campaignTypes.pmax ? 'Aktif' : 'Pasif'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md text-center">
                <p className="text-xs text-gray-500 mb-1">Display</p>
                <p className={`text-sm font-medium ${data.campaignTypes.display ? 'text-success-600' : 'text-gray-400'}`}>
                  {data.campaignTypes.display ? 'Aktif' : 'Pasif'}
                </p>
              </div>
            </>
          )}
        </div>
        
        {data.campaignTypes?.missingTypes && data.campaignTypes.missingTypes.length > 0 && (
          <div className="bg-warning-50 border-l-4 border-warning-500 p-3">
            <p className="text-sm text-warning-700">
              <span className="font-medium">Eksik kampanya türleri: </span>
              {data.campaignTypes.missingTypes.join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Diğer modüller (kampanya isimlendirme, hesap ayarları, vb) burada eklenebilir */}
    </div>
  );
};

// Meta detay analizi bileşeni
const MetaDetailAnalysis: React.FC<{ data: MetaCheck }> = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Meta Pixel Temel Bilgiler */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Meta Pixel Temel Bilgiler</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <div className={`h-5 w-5 flex-shrink-0 rounded-full ${data.pixelDetected ? 'bg-success-500' : 'bg-error-500'}`}></div>
            <div className="ml-3">
              <p className="text-sm font-medium">Meta Pixel</p>
              <p className="text-xs text-gray-500">{data.pixelDetected ? 'Tespit Edildi' : 'Bulunamadı'}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <div className={`h-5 w-5 flex-shrink-0 rounded-full ${data.conversionAPI ? 'bg-success-500' : 'bg-error-500'}`}></div>
            <div className="ml-3">
              <p className="text-sm font-medium">Conversion API</p>
              <p className="text-xs text-gray-500">{data.conversionAPI ? 'Aktif' : 'Pasif'}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <div className={`h-5 w-5 flex-shrink-0 rounded-full ${data.advancedMatching ? 'bg-success-500' : 'bg-error-500'}`}></div>
            <div className="ml-3">
              <p className="text-sm font-medium">Advanced Matching</p>
              <p className="text-xs text-gray-500">{data.advancedMatching ? 'Aktif' : 'Pasif'}</p>
            </div>
          </div>
        </div>
        
        {data.pixelId && (
          <div className="mt-4 bg-primary-50 p-3 rounded-md">
            <p className="text-sm text-primary-700">
              <span className="font-medium">Pixel ID: </span>
              {data.pixelId}
            </p>
          </div>
        )}
      </div>

      {/* Diğer Meta analiz modülleri burada eklenebilir */}
    </div>
  );
};

// GA4 Detay Komponenti
const GA4DetailModule: React.FC<{ data: GA4Check }> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* 1. Veri Akışı (Data Streams) */}
      {data.dataStreams && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Veri Akışı (Data Streams)</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">Web</p>
              <p className={`text-sm font-medium ${data.dataStreams.web ? 'text-success-600' : 'text-gray-400'}`}>
                {data.dataStreams.web ? 'Aktif' : 'Pasif'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">iOS</p>
              <p className={`text-sm font-medium ${data.dataStreams.ios ? 'text-success-600' : 'text-gray-400'}`}>
                {data.dataStreams.ios ? 'Aktif' : 'Pasif'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">Android</p>
              <p className={`text-sm font-medium ${data.dataStreams.android ? 'text-success-600' : 'text-gray-400'}`}>
                {data.dataStreams.android ? 'Aktif' : 'Pasif'}
              </p>
            </div>
          </div>
          
          {data.dataStreams.multipleStreams && (
            <div className="bg-warning-50 border-l-4 border-warning-500 p-3">
              <p className="text-sm text-warning-700">
                Birden fazla stream aynı property içinde yer alıyor olabilir, bu önerilmez.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. Tag Sağlığı */}
      {data.tagHealth && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tag Sağlığı</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className={`h-5 w-5 flex-shrink-0 rounded-full ${data.tagHealth.isWorking ? 'bg-success-500' : 'bg-error-500'}`}></div>
              <div className="ml-3">
                <p className="text-sm font-medium">Tag Çalışıyor</p>
                <p className="text-xs text-gray-500">{data.tagHealth.isWorking ? 'Evet' : 'Hayır'}</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className={`h-5 w-5 flex-shrink-0 rounded-full ${!data.tagHealth.wrongOrder ? 'bg-success-500' : 'bg-error-500'}`}></div>
              <div className="ml-3">
                <p className="text-sm font-medium">Doğru Sırada</p>
                <p className="text-xs text-gray-500">{!data.tagHealth.wrongOrder ? 'Evet' : 'Hayır'}</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className={`h-5 w-5 flex-shrink-0 rounded-full ${!data.tagHealth.duplicated ? 'bg-success-500' : 'bg-error-500'}`}></div>
              <div className="ml-3">
                <p className="text-sm font-medium">Tekrarlı Yükleme</p>
                <p className="text-xs text-gray-500">{!data.tagHealth.duplicated ? 'Yok' : 'Var'}</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className={`h-5 w-5 flex-shrink-0 rounded-full ${!data.tagHealth.eventsBeforePageview ? 'bg-success-500' : 'bg-error-500'}`}></div>
              <div className="ml-3">
                <p className="text-sm font-medium">PageView'den Önce Event</p>
                <p className="text-xs text-gray-500">{!data.tagHealth.eventsBeforePageview ? 'Yok' : 'Var'}</p>
              </div>
            </div>
          </div>
          
          {(data.tagHealth.wrongOrder || data.tagHealth.duplicated || data.tagHealth.eventsBeforePageview) && (
            <div className="mt-4 bg-error-50 border-l-4 border-error-500 p-3">
              <p className="text-sm text-error-700">
                Tag sağlığında sorunlar tespit edildi. GA4 tag'in doğru şekilde yüklenmesi ve çalışması için gerekli düzeltmeleri yapın.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Diğer GA4 modülleri burada... */}
    </div>
  );
};

// Google Ads Detay Komponenti
const GoogleAdsDetailModule: React.FC<{ data: AdsCheck }> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* 1. Kampanya Türleri ve Performansı */}
      {data.campaignTypes && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Kampanya Türleri ve Performansı</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">Search</p>
              <p className={`text-sm font-medium ${data.campaignTypes.search ? 'text-success-600' : 'text-gray-400'}`}>
                {data.campaignTypes.search ? 'Aktif' : 'Pasif'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">PMax</p>
              <p className={`text-sm font-medium ${data.campaignTypes.pmax ? 'text-success-600' : 'text-gray-400'}`}>
                {data.campaignTypes.pmax ? 'Aktif' : 'Pasif'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs text-gray-500 mb-1">Display</p>
              <p className={`text-sm font-medium ${data.campaignTypes.display ? 'text-success-600' : 'text-gray-400'}`}>
                {data.campaignTypes.display ? 'Aktif' : 'Pasif'}
              </p>
            </div>
          </div>
          
          {data.campaignTypes.missingTypes && data.campaignTypes.missingTypes.length > 0 && (
            <div className="bg-warning-50 border-l-4 border-warning-500 p-3">
              <p className="text-sm text-warning-700">
                <span className="font-medium">Eksik kampanya türleri: </span>
                {data.campaignTypes.missingTypes.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. Kampanya İsimlendirme */}
      {data.campaignNaming && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Kampanya İsimlendirme</h3>
          
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">İsimlendirme tutarlılığı</p>
            {data.campaignNaming.consistent ? (
              <span className="bg-success-100 text-success-800 text-xs px-2 py-1 rounded-full flex items-center">
                <CheckCircleIcon className="h-4 w-4 mr-1" /> Tutarlı
              </span>
            ) : (
              <span className="bg-error-100 text-error-800 text-xs px-2 py-1 rounded-full flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" /> Tutarsız
              </span>
            )}
          </div>
          
          {!data.campaignNaming.consistent && data.campaignNaming.issues.length > 0 && (
            <div className="bg-warning-50 border-l-4 border-warning-500 p-3">
              <p className="text-sm text-warning-700 font-medium mb-2">Tespit edilen uyumsuzluklar:</p>
              <ul className="list-disc list-inside text-sm text-warning-700">
                {data.campaignNaming.issues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Diğer Google Ads modülleri burada... */}
    </div>
  );
};

// Platform Detay Görünümü
const PlatformDetailsView: React.FC<{
  platformName: string;
  data: GA4Check | AdsCheck | MetaCheck;
  onBack: () => void;
}> = ({ platformName, data, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'issues' | 'technical'>('overview');
  
  // Platforma göre olayları getir
  const getEvents = () => {
    if ('events' in data) {
      const events = [...data.events];
      if ('ecommerceEvents' in data) {
        return [...events, ...data.ecommerceEvents];
      }
      return events;
    }
    return [];
  };
  
  const events = getEvents();
  const issues = data.issues || [];
  const recommendations = data.recommendations || [];
  
  // Platform spesifik içeriği render et
  const renderPlatformContent = () => {
    if (platformName === 'Google Analytics 4' && 'notSetPercentage' in data) {
      return <GA4DetailModule data={data} />;
    } else if (platformName === 'Google Ads' && 'remarketing' in data) {
      return <GoogleAdsDetailModule data={data} />;
    } else if (platformName === 'Meta' && 'pixelDetected' in data) {
      // Meta detayları burada render edilebilir
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Meta Pixel Temel Bilgiler</h3>
          <p className="text-gray-600">Meta Pixel detay modülü henüz eklenmedi.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">{platformName} Detayları</h2>
        </div>
        
        <div className="flex space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            data.status === 'success' ? 'bg-success-100 text-success-800' : 
            data.status === 'warning' ? 'bg-warning-100 text-warning-800' : 
            data.status === 'error' ? 'bg-error-100 text-error-800' : 'bg-gray-100 text-gray-800'
          }`}>
            Sağlık Skoru: %{data.healthScore}
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'overview' 
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'events' 
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Olaylar ve Parametreler
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'issues' 
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sorunlar ve Öneriler
          </button>
          {('rawData' in data) && (
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'technical' 
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Teknik Veriler
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === 'overview' && renderPlatformContent()}
        
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Olaylar</h3>
              <div className="text-sm text-gray-500">
                {events.filter(e => e.found).length} / {events.length} tespit edildi
              </div>
            </div>
            
            <div className="space-y-1">
              {events.map((event, idx) => (
                <EventDetailsCard 
                  key={idx} 
                  event={event} 
                  onCopyEventData={event.technicalDetails ? () => {
                    navigator.clipboard.writeText(event.technicalDetails || '');
                    alert('Teknik veri panoya kopyalandı!');
                  } : undefined}
                />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'issues' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tespit Edilen Sorunlar</h3>
              {issues.length > 0 ? (
                <ul className="space-y-3">
                  {issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-warning-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Sorun tespit edilmedi.</p>
              )}
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Öneriler</h3>
              {recommendations.length > 0 ? (
                <ul className="space-y-3">
                  {recommendations.map((recommendation, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Herhangi bir öneri bulunmuyor.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'technical' && 'rawData' in data && (
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Teknik Veriler</h3>
              <button 
                onClick={() => {
                  const rawData = JSON.stringify(data.rawData || {}, null, 2);
                  navigator.clipboard.writeText(rawData);
                  alert('Teknik veri panoya kopyalandı!');
                }}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                Kopyala
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-xs text-gray-300">
                {data.rawData ? JSON.stringify(data.rawData, null, 2) : 'Teknik veri bulunmuyor.'}
              </pre>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Bu veri geliştirici ekibi için tasarlanmıştır ve teknik detaylar içerir.</p>
            </div>
          </div>
        )}
      </div>
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
                <EventDetailsCard key={idx} event={event} />
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Temel Olaylar</h3>
          <div className="space-y-2">
            {tagData.ga4.events.map((event, idx) => (
              <EventDetailsCard key={idx} event={event} />
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
              <EventDetailsCard key={idx} event={event} />
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