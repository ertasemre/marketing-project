import { useState, useEffect } from 'react';
import { 
  CursorArrowRaysIcon, 
  ClockIcon, 
  ArrowsRightLeftIcon, 
  DocumentChartBarIcon,
  ArrowPathIcon,
  EyeIcon 
} from '@heroicons/react/24/outline';

type UXMetric = {
  id: number;
  name: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
};

type HeatmapData = {
  pageTitle: string;
  pageUrl: string;
  impressions: number;
  avgTimeSpent: string;
  clickRate: number;
  scrollDepth: number;
  image: string;
};

type FunnelStep = {
  id: number;
  name: string;
  visitors: number;
  dropoffRate: number;
};

type UserJourneySegment = {
  id: number;
  campaign: string;
  source: string;
  averageScreens: number;
  conversionRate: number;
  averageTime: string;
  bounceRate: number;
};

const UXInsights = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');
  const [campaignFilter, setCampaignFilter] = useState('all');

  // Clarity API'den veri çekme simülasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [period, campaignFilter]);

  // Örnek metrikler
  const metrics: UXMetric[] = [
    {
      id: 1,
      name: 'Ort. Tıklama Derinliği',
      value: '4.7',
      change: 12.3,
      icon: CursorArrowRaysIcon
    },
    {
      id: 2,
      name: 'Ort. Oturum Süresi',
      value: '3:24',
      change: 8.7,
      icon: ClockIcon
    },
    {
      id: 3,
      name: 'Rage Tıklama',
      value: '2.1%',
      change: -14.2,
      icon: ArrowsRightLeftIcon
    },
    {
      id: 4,
      name: 'Scroll Derinliği',
      value: '68%',
      change: 5.4,
      icon: DocumentChartBarIcon
    }
  ];

  // Örnek ısı haritası verileri
  const heatmaps: HeatmapData[] = [
    {
      pageTitle: 'Ana Sayfa',
      pageUrl: '/',
      impressions: 12430,
      avgTimeSpent: '1:42',
      clickRate: 23.5,
      scrollDepth: 72,
      image: 'https://via.placeholder.com/320x200/f3f4f6/000000'
    },
    {
      pageTitle: 'Ürünler',
      pageUrl: '/products',
      impressions: 8765,
      avgTimeSpent: '2:18',
      clickRate: 31.2,
      scrollDepth: 58,
      image: 'https://via.placeholder.com/320x200/f3f4f6/000000'
    },
    {
      pageTitle: 'Hakkımızda',
      pageUrl: '/about',
      impressions: 3422,
      avgTimeSpent: '1:06',
      clickRate: 14.8,
      scrollDepth: 44,
      image: 'https://via.placeholder.com/320x200/f3f4f6/000000'
    }
  ];

  // Örnek dönüşüm hunisi verileri
  const funnelSteps: FunnelStep[] = [
    { id: 1, name: 'Ziyaret', visitors: 45600, dropoffRate: 0 },
    { id: 2, name: 'Ürün Görüntüleme', visitors: 32400, dropoffRate: 28.9 },
    { id: 3, name: 'Sepete Ekleme', visitors: 12800, dropoffRate: 60.5 },
    { id: 4, name: 'Ödeme Başlatma', visitors: 6200, dropoffRate: 51.6 },
    { id: 5, name: 'Satın Alma', visitors: 3800, dropoffRate: 38.7 }
  ];

  // Örnek kullanıcı yolculuğu segmentleri
  const userJourneys: UserJourneySegment[] = [
    { 
      id: 1, 
      campaign: 'Google Ads Kampanya 1', 
      source: 'Google', 
      averageScreens: 3.2, 
      conversionRate: 2.8, 
      averageTime: '2:34',
      bounceRate: 52.4
    },
    { 
      id: 2, 
      campaign: 'Facebook Kampanya 2', 
      source: 'Facebook', 
      averageScreens: 2.1, 
      conversionRate: 1.9, 
      averageTime: '1:47',
      bounceRate: 64.3
    },
    { 
      id: 3, 
      campaign: 'Instagram Kampanya 1', 
      source: 'Instagram', 
      averageScreens: 2.8, 
      conversionRate: 2.3, 
      averageTime: '2:12',
      bounceRate: 58.7
    }
  ];

  return (
    <div className="space-y-6">
      {/* Başlık ve Filtreler */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">UX Insights</h1>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="py-2 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
          >
            <option value="all">Tüm Kampanyalar</option>
            <option value="google">Google Ads</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
          
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="py-2 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
          >
            <option value="7">Son 7 Gün</option>
            <option value="14">Son 14 Gün</option>
            <option value="30">Son 30 Gün</option>
            <option value="90">Son 90 Gün</option>
          </select>
          
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tab Menü */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('heatmaps')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'heatmaps'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Isı Haritaları
          </button>
          <button
            onClick={() => setActiveTab('funnel')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'funnel'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Dönüşüm Hunisi
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'journey'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Kullanıcı Yolculuğu
          </button>
        </nav>
      </div>

      {/* İçerik */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Genel Bakış */}
          {activeTab === 'overview' && (
            <>
              {/* Metrikler */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                  <div 
                    key={metric.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.name}</p>
                        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
                      </div>
                      <div className="rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
                        <metric.icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>
                    <div className={`mt-4 flex items-center text-sm font-medium ${
                      metric.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      <span>{metric.change >= 0 ? '+' : ''}{metric.change}%</span>
                      <span className="ml-1">son {period} günde</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kullanıcı Davranışı Çizelgesi */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Kullanıcı Davranış Özeti</h3>
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Clarity API'den gelen veriler burada grafikle gösterilecek</p>
                </div>
              </div>

              {/* En Çok Etkileşim Alan Sayfalar */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">En Çok Etkileşim Alan Sayfalar</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sayfa</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Görüntülenme</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ort. Süre</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tıklama Oranı</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Scroll Derinliği</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {heatmaps.map((page) => (
                        <tr key={page.pageUrl}>
                          <td className="px-3 py-4 text-sm text-gray-900 dark:text-white">{page.pageTitle}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{page.impressions.toLocaleString()}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{page.avgTimeSpent}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{page.clickRate}%</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{page.scrollDepth}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Isı Haritaları */}
          {activeTab === 'heatmaps' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heatmaps.map((heatmap) => (
                <div key={heatmap.pageUrl} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm overflow-hidden">
                  <div className="relative">
                    <img src={heatmap.image} alt={heatmap.pageTitle} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-semibold">{heatmap.pageTitle}</h3>
                        <p className="text-sm opacity-80">{heatmap.pageUrl}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Görüntülenme</p>
                      <p className="font-medium text-gray-900 dark:text-white">{heatmap.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Ortalama Süre</p>
                      <p className="font-medium text-gray-900 dark:text-white">{heatmap.avgTimeSpent}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tıklama Oranı</p>
                      <p className="font-medium text-gray-900 dark:text-white">{heatmap.clickRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Scroll Derinliği</p>
                      <p className="font-medium text-gray-900 dark:text-white">{heatmap.scrollDepth}%</p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button className="w-full py-2 text-primary-600 dark:text-primary-400 text-sm font-medium border border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20">
                      Isı Haritasını Görüntüle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dönüşüm Hunisi */}
          {activeTab === 'funnel' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Dönüşüm Hunisi</h3>
              
              <div className="flex items-start space-x-3">
                {funnelSteps.map((step, index) => (
                  <div key={step.id} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary-100 dark:bg-primary-900/20 relative overflow-hidden rounded-t-lg" 
                      style={{ 
                        height: `${200 * (step.visitors / funnelSteps[0].visitors)}px`,
                        minHeight: '40px'
                      }}
                    >
                      <div className="absolute inset-x-0 bottom-0 h-full bg-primary-500/20"></div>
                    </div>
                    
                    <div className="w-full px-2 py-3 text-center bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{step.visitors.toLocaleString()} ziyaretçi</p>
                      
                      {index > 0 && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                          %{step.dropoffRate} düşüş
                        </p>
                      )}
                    </div>
                    
                    {index < funnelSteps.length - 1 && (
                      <div className="h-6 w-6 flex items-center justify-center">
                        <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Kampanya Bazlı Dönüşüm Oranları</h4>
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Kampanya bazlı dönüşüm oranları grafiği</p>
                </div>
              </div>
            </div>
          )}

          {/* Kullanıcı Yolculuğu */}
          {activeTab === 'journey' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Kampanya Bazlı Kullanıcı Yolculuğu</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kampanya</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kaynak</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ort. Sayfa Görüntüleme</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dönüşüm Oranı</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ort. Süre</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hemen Çıkma Oranı</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {userJourneys.map((journey) => (
                        <tr key={journey.id}>
                          <td className="px-3 py-4 text-sm text-gray-900 dark:text-white">{journey.campaign}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{journey.source}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{journey.averageScreens}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{journey.conversionRate}%</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{journey.averageTime}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{journey.bounceRate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Yolculuk Akış Haritası</h3>
                <div className="h-96 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Kullanıcı yolculuğu akış haritası (Clarity API'den)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UXInsights; 