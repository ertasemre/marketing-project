import React, { useState } from 'react';
import {
  UserGroupIcon,
  PlusIcon,
  UserIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  AdjustmentsHorizontalIcon,
  PencilIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

// Tür tanımlamaları
type AudienceType = 'automated' | 'manual' | 'ai_generated' | 'imported';
type SourceType = 'ga4' | 'meta' | 'website' | 'crm' | 'ai' | 'cross-platform' | 'google-ads';
type PlatformType = 'meta' | 'google' | 'ga4' | 'google-ads';
type StatusType = 'active' | 'inactive' | 'draft' | 'archived';
type OperatorType = 'equals' | 'contains' | 'not_completed' | 'greater_than' | 'less_than' | 'in_range' | 'during';

// Kriter ara yüzü
interface Criterion {
  type: string;
  value: string;
  operator: OperatorType;
}

// Performans ara yüzü
interface Performance {
  ctr: number;
  conversionRate: number;
  costPerConversion?: number;
}

// Hedef kitle ara yüzü
interface Audience {
  id: number | string;
  name: string;
  type: AudienceType;
  source: SourceType;
  description: string;
  size: number;
  createdAt: string;
  performance: Performance;
  status: StatusType;
  platform: PlatformType[];
  criteria: Criterion[];
  segment: string;
  lastSync?: string;
}

// Önerilen hedef kitle ara yüzü
interface SuggestedAudience {
  id: string;
  name: string;
  description: string;
  potentialSize: number;
  estimatedPerformance: Performance;
  source: SourceType;
  match: string;
  criteria: Criterion[];
}

// Ara yüzler için props tanımlamaları
interface AudienceCardProps {
  audience: Audience;
  onExport: (id: number | string) => void;
  onEdit: (id: number | string) => void;
}

interface SuggestedAudienceCardProps {
  audience: SuggestedAudience;
  onCreate: (id: string) => void;
}

// Mock veriler
const mockAudiences: Audience[] = [
  {
    id: 1,
    name: 'Mobil Kullanıcılar',
    type: 'automated',
    source: 'ga4',
    description: 'Son 30 günde mobil cihazlardan web sitenizi ziyaret eden kullanıcılar',
    size: 12540,
    createdAt: '2023-05-15',
    performance: {
      ctr: 2.8,
      conversionRate: 3.2,
      costPerConversion: 42.5
    },
    status: 'active',
    platform: ['meta', 'google'],
    criteria: [
      { type: 'device', value: 'mobile', operator: 'equals' }
    ],
    segment: 'Mobil',
    lastSync: '2 saat önce'
  },
  {
    id: 2,
    name: 'Sepet Terk Edenler',
    type: 'automated',
    source: 'website',
    description: 'Son 14 günde sepete ürün ekleyip satın almadan ayrılan kullanıcılar',
    size: 3250,
    createdAt: '2023-05-20',
    performance: {
      ctr: 4.6,
      conversionRate: 8.2,
      costPerConversion: 28.3
    },
    status: 'active',
    platform: ['meta', 'google'],
    criteria: [
      { type: 'page_visit', value: '/cart', operator: 'contains' },
      { type: 'conversion', value: 'purchase', operator: 'not_completed' }
    ],
    segment: 'Sepet Terk',
    lastSync: '1 gün önce'
  },
  {
    id: 3,
    name: 'Blog Okuyucuları',
    type: 'automated',
    source: 'ga4',
    description: 'Son 90 günde blog sayfalarında 2+ ziyaret ve 3+ dakika geçiren kullanıcılar',
    size: 8760,
    createdAt: '2023-05-01',
    performance: {
      ctr: 1.9,
      conversionRate: 1.8,
      costPerConversion: 54.2
    },
    status: 'active',
    platform: ['meta'],
    criteria: [
      { type: 'page_visit', value: '/blog', operator: 'contains' },
      { type: 'visit_count', value: '2', operator: 'greater_than' },
      { type: 'time_on_page', value: '180', operator: 'greater_than' }
    ],
    segment: 'Blog Okuyucuları',
    lastSync: '12 saat önce'
  },
  {
    id: 4,
    name: 'Yüksek Değerli Müşteriler',
    type: 'automated',
    source: 'crm',
    description: 'Son 6 ayda 1000₺+ harcama yapan ve 2+ sipariş veren müşteriler',
    size: 2180,
    createdAt: '2023-04-10',
    performance: {
      ctr: 3.2,
      conversionRate: 6.7,
      costPerConversion: 22.8
    },
    status: 'active',
    platform: ['meta', 'google'],
    criteria: [
      { type: 'purchase_value', value: '1000', operator: 'greater_than' },
      { type: 'purchase_count', value: '2', operator: 'greater_than' },
      { type: 'purchase_recency', value: '180', operator: 'less_than' }
    ],
    segment: 'VIP',
    lastSync: '3 gün önce'
  },
  {
    id: 5,
    name: 'Kadın Giyim İlgililer',
    type: 'ai_generated',
    source: 'ai',
    description: 'Yapay zeka ile belirlenen kadın giyim kategorileriyle ilgilenen hedef kitle',
    size: 15420,
    createdAt: '2023-05-22',
    performance: {
      ctr: 3.5,
      conversionRate: 4.8,
      costPerConversion: 32.1
    },
    status: 'active',
    platform: ['meta'],
    criteria: [
      { type: 'interest', value: 'kadın giyim', operator: 'contains' },
      { type: 'gender', value: 'female', operator: 'equals' },
      { type: 'age', value: '25-45', operator: 'in_range' }
    ],
    segment: 'Kadın Giyim İlgilileri'
  },
  {
    id: 6,
    name: 'Premium Ürün İlgilileri',
    type: 'automated',
    source: 'ga4',
    description: 'Premium kategori ürünlerini görüntüleyen ama satın almayan kullanıcılar',
    size: 876,
    createdAt: '2023-05-02',
    performance: {
      ctr: 3.8,
      conversionRate: 5.2
    },
    status: 'active',
    platform: ['ga4'],
    criteria: [
      { type: 'page_visit', value: '/premium', operator: 'contains' },
      { type: 'conversion', value: 'purchase', operator: 'not_completed' }
    ],
    segment: 'Ürün İlgilileri'
  },
  {
    id: 7,
    name: 'Facebook Katılımcıları',
    type: 'automated',
    source: 'meta',
    description: 'Son 60 gün içinde Facebook reklamlarımızla etkileşime girmiş kullanıcılar',
    size: 3241,
    createdAt: '2023-03-20',
    performance: {
      ctr: 4.2,
      conversionRate: 6.8
    },
    status: 'active',
    platform: ['meta'],
    criteria: [
      { type: 'facebook_interaction', value: 'true', operator: 'equals' },
      { type: 'website_visit', value: 'true', operator: 'equals' }
    ],
    segment: 'Sosyal Medya',
    lastSync: '1 gün önce'
  },
  {
    id: 8,
    name: 'Arama Reklamı Tıklayanlar',
    type: 'automated',
    source: 'google-ads',
    description: 'Google Arama reklamlarımıza tıklayan ama dönüşüm gerçekleştirmeyen kullanıcılar',
    size: 1842,
    createdAt: '2023-04-05',
    performance: {
      ctr: 2.9,
      conversionRate: 3.4
    },
    status: 'active',
    platform: ['google-ads'],
    criteria: [
      { type: 'google_ads_interaction', value: 'true', operator: 'equals' },
      { type: 'conversion', value: 'false', operator: 'equals' }
    ],
    segment: 'Reklam İlgilileri',
    lastSync: '3 gün önce'
  },
  {
    id: 9,
    name: 'Kampanya Dönüşümleri',
    type: 'automated',
    source: 'ga4',
    description: 'Yaz kampanyasından dönüşüm sağlayan müşteriler',
    size: 734,
    createdAt: '2023-05-15',
    performance: {
      ctr: 2.9,
      conversionRate: 3.4
    },
    status: 'draft',
    platform: ['ga4'],
    criteria: [
      { type: 'purchase_date', value: 'seasonal_campaign', operator: 'during' }
    ],
    segment: 'Kampanya'
  }
];

// Otomatik kitle önerileri
const mockSuggestedAudiences: SuggestedAudience[] = [
  {
    id: 'sg1',
    name: 'Premium Ürün İlgililer',
    description: 'Premium kategoride ürünleri inceleyen ancak satın almayan kullanıcılar',
    potentialSize: 5800,
    estimatedPerformance: {
      ctr: 3.8,
      conversionRate: 5.2
    },
    source: 'ga4',
    match: '%92',
    criteria: [
      { type: 'page_visit', value: '/premium', operator: 'contains' },
      { type: 'conversion', value: 'purchase', operator: 'not_completed' }
    ]
  },
  {
    id: 'sg2',
    name: 'App Kullanıcıları',
    description: 'Mobil uygulamanızı kullanan ve web sitesini ziyaret eden kullanıcılar',
    potentialSize: 7400,
    estimatedPerformance: {
      ctr: 4.2,
      conversionRate: 6.8
    },
    source: 'cross-platform',
    match: '%87',
    criteria: [
      { type: 'app_user', value: 'true', operator: 'equals' },
      { type: 'website_visit', value: 'true', operator: 'equals' }
    ]
  },
  {
    id: 'sg3',
    name: 'Seasonal Shoppers',
    description: 'Sadece kampanya dönemlerinde alışveriş yapan kullanıcılar',
    potentialSize: 9200,
    estimatedPerformance: {
      ctr: 2.9,
      conversionRate: 3.4
    },
    source: 'crm',
    match: '%84',
    criteria: [
      { type: 'purchase_date', value: 'seasonal_campaign', operator: 'during' }
    ]
  }
];

// Tür nesneleri
const typeLabels = {
  automated: { label: 'Otomatik', className: 'bg-primary-100 text-primary-800' },
  manual: { label: 'Manuel', className: 'bg-gray-100 text-gray-800' },
  ai_generated: { label: 'AI Oluşturuldu', className: 'bg-secondary-100 text-secondary-800' },
  imported: { label: 'İçe Aktarılmış', className: 'bg-warning-100 text-warning-800' }
};

type SourceIconsType = {
  [key in SourceType]: React.ReactElement;
};

const AudienceCard = ({ audience, onExport, onEdit }: AudienceCardProps) => {
  const { name, description, source, size, type, performance, status, platform } = audience;
  
  const sourceIcons: Partial<SourceIconsType> = {
    ga4: <div className="h-8 w-8 rounded-full bg-blue-100 flex-center text-blue-700">GA</div>,
    meta: <div className="h-8 w-8 rounded-full bg-indigo-100 flex-center text-indigo-700">FB</div>,
    website: <div className="h-8 w-8 rounded-full bg-green-100 flex-center text-green-700">WS</div>,
    crm: <div className="h-8 w-8 rounded-full bg-orange-100 flex-center text-orange-700">CRM</div>,
    ai: <div className="h-8 w-8 rounded-full bg-purple-100 flex-center text-purple-700">AI</div>
  };
  
  const typeData = typeLabels[type];
  const sourceIcon = sourceIcons[source] || <UserGroupIcon className="h-8 w-8 text-gray-400" />;
  
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex">
            {sourceIcon}
            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${typeData.className}`}>
                  {typeData.label}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500">Hedef Kitle Boyutu</p>
            <p className="font-semibold mt-1">{size.toLocaleString()} kişi</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">CTR</p>
            <p className="font-semibold mt-1">%{performance.ctr.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Dönüşüm Oranı</p>
            <p className="font-semibold mt-1">%{performance.conversionRate.toFixed(1)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-1">Platformlar</p>
          <div className="flex space-x-2">
            {platform.includes('meta') && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                Meta Ads
              </span>
            )}
            {platform.includes('google') && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700">
                Google Ads
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
        <div className="flex items-center text-gray-500 text-sm">
          <UserIcon className="h-4 w-4 mr-1" />
          <span>{status === 'active' ? 'Aktif' : 'Pasif'}</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(audience.id)}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Düzenle
          </button>
          
          <button
            onClick={() => onExport(audience.id)}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
            Dışa Aktar
          </button>
        </div>
      </div>
    </div>
  );
};

const SuggestedAudienceCard = ({ audience, onCreate }: SuggestedAudienceCardProps) => {
  const { name, description, potentialSize, estimatedPerformance, match } = audience;
  
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">{name}</h3>
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                Önerilen
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="text-sm font-medium text-primary-700">
            <span className="px-2 py-1 bg-primary-50 rounded-lg">{match} Eşleşme</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500">Potansiyel Boyut</p>
            <p className="font-semibold mt-1">{potentialSize.toLocaleString()} kişi</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Tahmini CTR</p>
            <p className="font-semibold mt-1">%{estimatedPerformance.ctr.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Tahmini Dönüşüm</p>
            <p className="font-semibold mt-1">%{estimatedPerformance.conversionRate.toFixed(1)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex justify-end">
        <button
          onClick={() => onCreate(audience.id)}
          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Oluştur
        </button>
      </div>
    </div>
  );
};

const AudienceBuilder = () => {
  const [audiences] = useState<Audience[]>(mockAudiences);
  const [suggestedAudiences] = useState<SuggestedAudience[]>(mockSuggestedAudiences);
  const [selectedTab, setSelectedTab] = useState('existing');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtreleme işlemi
  const filteredAudiences = audiences.filter(audience => {
    // Tab filtreleme
    if (activeTab !== 'all' && audience.status !== activeTab) {
      return false;
    }
    
    // Veri kaynağı filtreleme
    if (selectedDataSource && audience.source !== selectedDataSource) {
      return false;
    }
    
    // Arama filtresi
    if (
      searchQuery && 
      !audience.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !audience.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  // Veri kaynağı seçenekleri
  const dataSourceOptions = [
    { id: 'ga4', label: 'Google Analytics 4', icon: '📊' },
    { id: 'meta', label: 'Meta', icon: '👥' },
    { id: 'website', label: 'Website', icon: '🌐' },
    { id: 'crm', label: 'CRM', icon: '💼' },
    { id: 'ai', label: 'AI', icon: '🤖' },
    { id: 'cross-platform', label: 'Cross-Platform', icon: '🌍' }
  ];
  
  // Yeni hedef kitle oluşturma işlemi
  const handleCreateNewAudience = () => {
    setIsCreatingNew(true);
    // Gerçek uygulamada form açma veya modal gösterme işlemi yapılır
    alert('Yeni hedef kitle oluşturma formu/modalı açılacak...');
  };
  
  // Önerilen hedef kitleyi oluşturma işlemi
  const handleCreateSuggestedAudience = (id: string) => {
    // Gerçek uygulamada API çağrısı yapılır
    alert(`"${suggestedAudiences.find(a => a.id === id)?.name}" hedef kitlesi oluşturuluyor...`);
  };
  
  // Hedef kitleleri yenileme işlemi
  const handleRefreshAudiences = () => {
    // Gerçek uygulamada API çağrısı yapılır
    alert('Hedef kitleler yenileniyor...');
  };
  
  // Add missing function handlers
  const handleExportAudience = (id: number | string) => {
    // Implementation would be added here
    console.log(`Exporting audience: ${id}`);
  };

  const handleEditAudience = (id: number | string) => {
    // Implementation would be added here
    console.log(`Editing audience: ${id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Hedef Kitle Oluşturucu</h1>
        </div>
        
        <div className="flex space-x-3">
          {!isCreatingNew && (
            <button
              onClick={handleCreateNewAudience}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Yeni Hedef Kitle
            </button>
          )}
          
          <button
            onClick={handleRefreshAudiences}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Yenile
          </button>
          
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Filtreler
          </button>
        </div>
      </div>
      
      {/* Filtreler */}
      <div className="bg-white rounded-xl shadow-soft p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Tab Seçenekleri */}
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'active'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Aktif Kitleler
            </button>
            
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'draft'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Taslaklar
            </button>
            
            <button
              onClick={() => setActiveTab('archived')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'archived'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Arşivlenen
            </button>
            
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'all'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tümü
            </button>
          </div>
          
          <div className="flex space-x-2">
            {/* Arama */}
            <div className="relative flex-1 min-w-[240px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kitle ara..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            
            {/* Veri Kaynağı Filtresi */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => {}}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  {selectedDataSource 
                    ? dataSourceOptions.find(ds => ds.id === selectedDataSource)?.label
                    : 'Veri Kaynağı'}
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Filtre Sıfırlama */}
            <button
              onClick={() => {
                setActiveTab('active');
                setSelectedDataSource(null);
                setSearchQuery('');
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Sıfırla
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-soft-sm p-1 flex space-x-1">
        <button
          onClick={() => setSelectedTab('existing')}
          className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg ${
            selectedTab === 'existing'
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <UserGroupIcon className="h-4 w-4 mr-2" />
          Mevcut Hedef Kitleler
        </button>
        <button
          onClick={() => setSelectedTab('suggested')}
          className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg ${
            selectedTab === 'suggested'
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <SparklesIcon className="h-4 w-4 mr-2" />
          Önerilen Hedef Kitleler
        </button>
      </div>
      
      {/* Mevcut Hedef Kitleler İçeriği */}
      {selectedTab === 'existing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
              <div className="bg-primary-50 p-3 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{audiences.length}</h3>
                <p className="text-sm text-gray-500">Toplam Hedef Kitle</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
              <div className="bg-success-50 p-3 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">
                  {audiences.filter(a => a.status === 'active').length}
                </h3>
                <p className="text-sm text-gray-500">Aktif Hedef Kitle</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
              <div className="bg-secondary-50 p-3 rounded-lg">
                <SparklesIcon className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">
                  {audiences.filter(a => a.type === 'ai_generated').length}
                </h3>
                <p className="text-sm text-gray-500">AI Oluşturulmuş</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            {filteredAudiences.map(audience => (
              <AudienceCard
                key={audience.id}
                audience={audience}
                onExport={handleExportAudience}
                onEdit={handleEditAudience}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Önerilen Hedef Kitleler İçeriği */}
      {selectedTab === 'suggested' && (
        <div className="space-y-6">
          <div className="bg-warning-50 border-l-4 border-warning-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <SparklesIcon className="h-5 w-5 text-warning-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-warning-800">
                  AI Tarafından Önerilen Hedef Kitleler
                </h3>
                <div className="mt-2 text-sm text-warning-700">
                  <p>
                    Bu hedef kitleler, kullanıcıların verilerine göre yapay zeka tarafından oluşturulmuştur. Hedef kitleyi oluşturmak için "Oluştur" butonuna tıklayın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        
          <div className="grid grid-cols-1 gap-6">
            {suggestedAudiences.map(audience => (
              <SuggestedAudienceCard 
                key={audience.id} 
                audience={audience} 
                onCreate={handleCreateSuggestedAudience} 
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Segmentasyon Verileri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-5">
          <h3 className="text-base font-semibold mb-4">Kitle Kaynakları</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
                <span className="ml-2 text-sm">Google Analytics 4</span>
              </div>
              <span className="text-sm font-medium">{audiences.filter(a => a.source === 'ga4').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-lg">👥</span>
                </div>
                <span className="ml-2 text-sm">Meta</span>
              </div>
              <span className="text-sm font-medium">{audiences.filter(a => a.source === 'meta').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌐</span>
                </div>
                <span className="ml-2 text-sm">Website</span>
              </div>
              <span className="text-sm font-medium">{audiences.filter(a => a.source === 'website').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-lg">💼</span>
                </div>
                <span className="ml-2 text-sm">CRM</span>
              </div>
              <span className="text-sm font-medium">{audiences.filter(a => a.source === 'crm').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <span className="ml-2 text-sm">AI</span>
              </div>
              <span className="text-sm font-medium">{audiences.filter(a => a.source === 'ai').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌍</span>
                </div>
                <span className="ml-2 text-sm">Cross-Platform</span>
              </div>
              <span className="text-sm font-medium">{audiences.filter(a => a.source === 'cross-platform').length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-5">
          <h3 className="text-base font-semibold mb-4">Segment Dağılımı</h3>
          <div className="space-y-4">
            {Array.from(new Set(audiences.map(a => a.segment))).map((segment) => {
              const count = audiences.filter(a => a.segment === segment).length;
              return (
                <div key={segment as string} className="flex justify-between items-center">
                  <span className="text-sm">{segment}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-5">
          <h3 className="text-base font-semibold mb-4">Kitle Metrikleri</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Toplam Kitle Sayısı</span>
              <span className="text-sm font-medium">{audiences.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Aktif Kitlenin Toplam Kullanıcı Sayısı</span>
              <span className="text-sm font-medium">
                {audiences
                  .filter(a => a.status === 'active')
                  .reduce((sum, a) => sum + a.size, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Ortalama Kitle Boyutu</span>
              <span className="text-sm font-medium">
                {Math.round(
                  audiences.reduce((sum, a) => sum + a.size, 0) / audiences.length
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceBuilder; 