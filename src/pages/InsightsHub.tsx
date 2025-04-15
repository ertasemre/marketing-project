import { useState } from 'react';
import {
  LightBulbIcon,
  ArrowPathIcon,
  CalendarIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  UsersIcon,
  RocketLaunchIcon,
  MegaphoneIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

// Insight türleri tanımlamaları
type SeverityType = 'yüksek' | 'orta' | 'düşük';
type StatusType = 'new' | 'read';

interface Insight {
  id: number;
  title: string;
  description: string;
  source: string;
  category: string;
  createdAt: string;
  severity: SeverityType;
  impact: string;
  status: StatusType;
  aiGenerated: boolean;
}

// Mockup insight verileri
const mockInsights: Insight[] = [
  {
    id: 1,
    title: 'Mobil kullanıcılar masaüstü kullanıcılara göre %38 daha düşük dönüşüm oranına sahip',
    description: 'Mobil kullanıcılar için dönüşüm hunisinde optimizasyonlar yapmanız önerilir. Özellikle ödeme sayfasındaki form alanlarının sadeleştirilmesi dönüşüm oranını artırabilir.',
    source: 'Google Analytics 4',
    category: 'dönüşüm',
    createdAt: '2 gün önce',
    severity: 'yüksek',
    impact: 'Potansiyel olarak 15-20% dönüşüm artışı',
    status: 'new',
    aiGenerated: true
  },
  {
    id: 2,
    title: '"Yaz Koleksiyonu" kampanyası son 7 günde en düşük ROAS değerine sahip',
    description: 'Bu kampanya, 0.8x ROAS ile diğer kampanyalara göre düşük performans gösteriyor. Kampanyanın hedef kitlesini veya mesajlarını gözden geçirmeniz önerilir.',
    source: 'Meta Ads',
    category: 'reklam',
    createdAt: '1 gün önce',
    severity: 'orta',
    impact: 'Yaklaşık 5.400₺ harcama ve 4.320₺ gelir kaybı',
    status: 'new',
    aiGenerated: true
  },
  {
    id: 3,
    title: 'Organik trafikteki düşüş trendi son 30 günde %12 seviyesinde',
    description: 'Organik arama trafiğindeki bu düşüş, son SEO çalışmalarından sonra gerçekleşti. Core Web Vitals metriklerinde düşüş ve 5 anahtar sayfada link kaybı tespit edildi.',
    source: 'Google Analytics 4',
    category: 'trafik',
    createdAt: '4 gün önce',
    severity: 'yüksek',
    impact: 'Aylık yaklaşık 18.000 ziyaret kaybı',
    status: 'new',
    aiGenerated: false
  },
  {
    id: 4,
    title: '"İndirim Kodu" remarketing kampanyası yatırım getirisinde %25 artış',
    description: 'Son 14 günde uygulanan yeni remarketing stratejisi, sepeti terk eden kullanıcılar için %25 daha yüksek ROAS sağladı. Bu stratejiyi diğer ürün kategorilerine genişletmek faydalı olabilir.',
    source: 'Google Ads',
    category: 'reklam',
    createdAt: '3 gün önce',
    severity: 'düşük',
    impact: 'Yaklaşık 8.200₺ ek gelir',
    status: 'new',
    aiGenerated: true
  },
  {
    id: 5,
    title: 'Blog içeriklerine gelen trafik %22 artış gösterdi',
    description: 'Son aylarda uygulanan içerik stratejisi ile blog sayfasına gelen trafik önemli ölçüde arttı. En çok performans gösteren içerikler ürün inceleme ve nasıl yapılır türü makaleler.',
    source: 'Google Analytics 4',
    category: 'içerik',
    createdAt: '5 gün önce',
    severity: 'düşük',
    impact: 'Aylık yaklaşık 12.000 ek ziyaret',
    status: 'read',
    aiGenerated: false
  },
  {
    id: 6,
    title: 'Alışveriş reklamları, arama kampanyalarından %15 daha yüksek dönüşüm oranına sahip',
    description: 'Google Alışveriş reklamları, standart arama kampanyalarına göre daha iyi performans gösteriyor. Ürün listesi ve görsellerinin optimize edilmesi, bu performansı daha da artırabilir.',
    source: 'Google Ads',
    category: 'reklam',
    createdAt: '1 hafta önce',
    severity: 'orta',
    impact: 'Potansiyel olarak %10-15 ROAS artışı',
    status: 'read',
    aiGenerated: true
  },
  {
    id: 7,
    title: 'Masaüstü kullanıcıları için sayfa yükleme süresi kritik seviyede',
    description: 'Masaüstü kullanıcıları için ortalama sayfa yükleme süresi 5.2 saniye, bu da sektör ortalamasının üstünde. Bu durumun bounce rate üzerinde olumsuz etkisi olduğu görülüyor.',
    source: 'Google Analytics 4',
    category: 'teknik',
    createdAt: '3 gün önce',
    severity: 'yüksek',
    impact: 'Yaklaşık %12 potansiyel ziyaretçi kaybı',
    status: 'new',
    aiGenerated: false
  },
  {
    id: 8,
    title: '25-34 yaş arası kadın kullanıcılar en yüksek müşteri yaşam boyu değerine sahip',
    description: 'Bu demografik segment, ortalamanın %67 üzerinde LTV değeri gösteriyor. Bu segment için özel kampanyalar ve sadakat programları düşünülebilir.',
    source: 'CRM + GA4',
    category: 'müşteri',
    createdAt: '1 hafta önce',
    severity: 'orta',
    impact: 'Potansiyel olarak müşteri başına 250₺ ek gelir',
    status: 'read',
    aiGenerated: true
  }
];

// Kategori seçenekleri
const categories = [
  { id: 'tümü', label: 'Tümü', icon: LightBulbIcon },
  { id: 'dönüşüm', label: 'Dönüşüm Fırsatları', icon: BoltIcon },
  { id: 'reklam', label: 'Reklam Performansı', icon: MegaphoneIcon },
  { id: 'trafik', label: 'Trafik Analizi', icon: ChartBarIcon },
  { id: 'içerik', label: 'İçerik Performansı', icon: CursorArrowRaysIcon },
  { id: 'müşteri', label: 'Müşteri Analizi', icon: UsersIcon },
  { id: 'teknik', label: 'Teknik İyileştirmeler', icon: RocketLaunchIcon }
];

// Ciddiyat seviyesi anahtar/değer ve renkler
const severityInfo = {
  yüksek: { color: 'error-600', bgColor: 'error-50', borderColor: 'error-200' },
  orta: { color: 'warning-600', bgColor: 'warning-50', borderColor: 'warning-200' },
  düşük: { color: 'success-600', bgColor: 'success-50', borderColor: 'success-200' }
};

// Tarih aralığı seçenekleri
const dateRangeOptions = [
  { id: 'today', label: 'Bugün' },
  { id: 'yesterday', label: 'Dün' },
  { id: 'last7days', label: 'Son 7 Gün' },
  { id: 'last30days', label: 'Son 30 Gün' },
  { id: 'thisMonth', label: 'Bu Ay' },
  { id: 'lastMonth', label: 'Geçen Ay' },
  { id: 'custom', label: 'Özel Tarih Aralığı' }
];

// Insight kartı bileşeni
interface InsightCardProps {
  insight: Insight;
  onMarkAsRead: (id: number) => void;
}

const InsightCard = ({ insight, onMarkAsRead }: InsightCardProps) => {
  const { id, title, description, source, category, createdAt, severity, impact, status, aiGenerated } = insight;
  
  const severityStyle = severityInfo[severity] || severityInfo.orta;
  
  return (
    <div className={`bg-white rounded-xl shadow-soft border ${status === 'new' ? `border-${severityStyle.borderColor}` : 'border-gray-100'}`}>
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${severityStyle.bgColor} text-${severityStyle.color}`}>
              {severity === 'yüksek' ? 'Yüksek Öncelik' : severity === 'orta' ? 'Orta Öncelik' : 'Düşük Öncelik'}
            </span>
            {aiGenerated && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                <BoltIcon className="h-3 w-3 mr-1" />
                AI Tarafından Oluşturuldu
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">{createdAt}</div>
        </div>
        
        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {source}
            </span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {
                categories.find(c => c.id === category)?.label || category
              }
            </span>
          </div>
        </div>
        
        {status === 'new' && (
          <div className="mt-4 text-right">
            <span className="text-sm text-gray-500 mr-2">Etki: {impact}</span>
            <button
              onClick={() => onMarkAsRead(id)}
              className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Okundu olarak işaretle
            </button>
          </div>
        )}
        {status === 'read' && (
          <div className="mt-4 text-right">
            <span className="text-sm text-gray-500 mr-2">Etki: {impact}</span>
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Okundu
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const InsightsHub = () => {
  const [insights, setInsights] = useState<Insight[]>(mockInsights);
  const [selectedCategory, setSelectedCategory] = useState('tümü');
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState('last7days');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSeverityFilter, setShowSeverityFilter] = useState(false);
  
  // Verileri yenileme işlemi
  const refreshData = () => {
    // Gerçek uygulamada API çağrısı yapılır
    alert('Insights yenileniyor...');
    // Örnek olarak okunmamış tüm öğeleri göster
    setInsights(insights.map(insight => ({ ...insight, status: 'new' })));
  };
  
  // Okundu olarak işaretleme işlemi
  const markAsRead = (id: number) => {
    setInsights(insights.map(insight => 
      insight.id === id ? { ...insight, status: 'read' as StatusType } : insight
    ));
  };
  
  // Filtreleme işlemi
  const filteredInsights = insights.filter(insight => {
    // Kategori filtresi
    if (selectedCategory !== 'tümü' && insight.category !== selectedCategory) return false;
    
    // Ciddiyat seviyesi filtresi
    if (selectedSeverity && insight.severity !== selectedSeverity) return false;
    
    // Burada tarih aralığı filtresi de eklenebilir
    
    return true;
  });
  
  // Tarih aralığı etiketi
  const dateRangeLabel = dateRangeOptions.find(option => option.id === selectedDateRange)?.label || 'Tarih Seçin';

  // Önem seviyesi seçenekleri
  const severityOptions = [
    { id: null, label: 'Tüm Öncelikler' },
    { id: 'yüksek', label: 'Yüksek Öncelik' },
    { id: 'orta', label: 'Orta Öncelik' },
    { id: 'düşük', label: 'Düşük Öncelik' }
  ];
  
  // Önem seviyesi etiketi
  const severityLabel = severityOptions.find(option => option.id === selectedSeverity)?.label || 'Öncelik Seçin';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LightBulbIcon className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Insights Hub</h1>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              {dateRangeLabel}
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            
            {showDatePicker && (
              <div className="absolute right-0 z-10 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedDateRange(option.id);
                        setShowDatePicker(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedDateRange === option.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      role="menuitem"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowSeverityFilter(!showSeverityFilter)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              {severityLabel}
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            
            {showSeverityFilter && (
              <div className="absolute right-0 z-10 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {severityOptions.map((option) => (
                    <button
                      key={option.id?.toString() || 'all'}
                      onClick={() => {
                        setSelectedSeverity(option.id);
                        setShowSeverityFilter(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedSeverity === option.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      role="menuitem"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={refreshData}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Yenile
          </button>
        </div>
      </div>
      
      {/* Kategori seçimi */}
      <div className="bg-white rounded-xl shadow-soft-sm p-1 flex overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-shrink-0 flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
              selectedCategory === category.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.label}
          </button>
        ))}
      </div>
      
      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-primary-50 p-3 rounded-lg">
            <LightBulbIcon className="h-6 w-6 text-primary-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{insights.length}</h3>
            <p className="text-sm text-gray-500">Toplam Insight</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-error-50 p-3 rounded-lg">
            <BoltIcon className="h-6 w-6 text-error-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">
              {insights.filter(insight => insight.severity === 'yüksek').length}
            </h3>
            <p className="text-sm text-gray-500">Yüksek Öncelikli</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-warning-50 p-3 rounded-lg">
            <ChartBarIcon className="h-6 w-6 text-warning-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">
              {insights.filter(insight => insight.status === 'new').length}
            </h3>
            <p className="text-sm text-gray-500">Yeni</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-secondary-50 p-3 rounded-lg">
            <BoltIcon className="h-6 w-6 text-secondary-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">
              {insights.filter(insight => insight.aiGenerated).length}
            </h3>
            <p className="text-sm text-gray-500">AI Oluşturulmuş</p>
          </div>
        </div>
      </div>
      
      {/* Insights listesi */}
      <div className="space-y-4">
        {filteredInsights.length > 0 ? (
          filteredInsights.map(insight => (
            <InsightCard 
              key={insight.id} 
              insight={insight} 
              onMarkAsRead={markAsRead} 
            />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LightBulbIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Insight Bulunamadı</h3>
            <p className="mt-2 text-gray-500">
              Seçilen filtrelerle eşleşen insight bulunmuyor. Farklı bir filtre seçmeyi deneyin veya filtreleri temizleyin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsHub; 