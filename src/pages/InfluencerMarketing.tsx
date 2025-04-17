import { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon, 
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

type InfluencerMetric = {
  id: number;
  name: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
};

type InfluencerCampaign = {
  id: number;
  influencerName: string;
  platform: string;
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  roi: number;
  status: 'active' | 'completed' | 'scheduled';
  hasCorrectUtm: boolean;
  utmIssues?: string[];
};

type UTMWarning = {
  id: number;
  campaignId: number;
  influencerName: string;
  platform: string;
  message: string;
  severity: 'error' | 'warning';
};

const InfluencerMarketing = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('campaigns');

  // API'den veri çekme simülasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [period, platformFilter]);

  // Örnek metrikler
  const metrics: InfluencerMetric[] = [
    {
      id: 1,
      name: 'Toplam Influencer',
      value: 24,
      change: 8.3,
      icon: UsersIcon
    },
    {
      id: 2,
      name: 'Ort. Etkileşim Oranı',
      value: '3.8%',
      change: 12.5,
      icon: ChartBarIcon
    },
    {
      id: 3,
      name: 'Toplam Harcama',
      value: '₺32,450',
      change: 15.2,
      icon: CurrencyDollarIcon
    },
    {
      id: 4,
      name: 'Influencer ROI',
      value: '4.3x',
      change: 7.8,
      icon: ArrowTrendingUpIcon
    }
  ];

  // Örnek influencer kampanyaları
  const campaigns: InfluencerCampaign[] = [
    {
      id: 1,
      influencerName: 'Ayşe Yılmaz',
      platform: 'Instagram',
      reach: 125000,
      engagement: 5.8,
      clicks: 3420,
      conversions: 215,
      roi: 3.8,
      status: 'active',
      hasCorrectUtm: true
    },
    {
      id: 2,
      influencerName: 'Mehmet Demir',
      platform: 'YouTube',
      reach: 450000,
      engagement: 4.2,
      clicks: 6750,
      conversions: 312,
      roi: 4.5,
      status: 'active',
      hasCorrectUtm: false,
      utmIssues: ['utm_campaign değeri eksik', 'utm_medium değeri hatalı']
    },
    {
      id: 3,
      influencerName: 'Zeynep Kaya',
      platform: 'TikTok',
      reach: 86000,
      engagement: 8.7,
      clicks: 2130,
      conversions: 187,
      roi: 2.9,
      status: 'completed',
      hasCorrectUtm: false,
      utmIssues: ['utm_source değeri Instagram olarak ayarlanmış ancak TikTok olmalı']
    },
    {
      id: 4,
      influencerName: 'Can Öztürk',
      platform: 'Instagram',
      reach: 92000,
      engagement: 3.9,
      clicks: 1850,
      conversions: 98,
      roi: 1.7,
      status: 'scheduled',
      hasCorrectUtm: true
    }
  ];

  // UTM uyarıları
  const utmWarnings: UTMWarning[] = [
    {
      id: 1,
      campaignId: 2,
      influencerName: 'Mehmet Demir',
      platform: 'YouTube',
      message: 'utm_campaign parametresi eksik. Doğru izleme için "influencer_mehmet_youtube_haziran" değeri eklenmelidir.',
      severity: 'error'
    },
    {
      id: 2,
      campaignId: 2,
      influencerName: 'Mehmet Demir',
      platform: 'YouTube',
      message: 'utm_medium değeri "social" olarak ayarlanmış, ancak "influencer" olmalı.',
      severity: 'warning'
    },
    {
      id: 3,
      campaignId: 3,
      influencerName: 'Zeynep Kaya',
      platform: 'TikTok',
      message: 'utm_source hatalı: "instagram" yerine "tiktok" kullanılmalı.',
      severity: 'error'
    }
  ];

  // Filtrelenmiş kampanyalar
  const filteredCampaigns = campaigns.filter(campaign => {
    if (platformFilter === 'all') return true;
    return campaign.platform.toLowerCase() === platformFilter.toLowerCase();
  });

  // Platform bazlı filtreleme için platformları alma
  const platforms = Array.from(new Set(campaigns.map(c => c.platform)));

  return (
    <div className="space-y-6">
      {/* Başlık ve Filtreler */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Influencer Marketing</h1>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="py-2 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
          >
            <option value="all">Tüm Platformlar</option>
            {platforms.map((platform, idx) => (
              <option key={idx} value={platform}>{platform}</option>
            ))}
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

      {/* UTM Uyarıları */}
      {utmWarnings.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 shadow-soft-sm">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">UTM Parametresi Uyarıları</h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                <ul className="list-disc pl-5 space-y-1">
                  {utmWarnings.map((warning) => (
                    <li key={warning.id}>
                      <span className="font-medium">{warning.influencerName} ({warning.platform}):</span> {warning.message}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3">
                <a href="#" className="text-sm font-medium text-yellow-800 dark:text-yellow-300 hover:text-yellow-600 dark:hover:text-yellow-200">
                  UTM Rehberini İncele <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Menü */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Aktif Kampanyalar
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Analitik
          </button>
          <button
            onClick={() => setActiveTab('influencers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'influencers'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Influencer Dizini
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
          {/* Kampanyalar */}
          {activeTab === 'campaigns' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Influencer</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platform</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Erişim</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Etkileşim</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tıklamalar</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dönüşümler</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ROI</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">UTM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{campaign.influencerName}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.platform}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.reach.toLocaleString()}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.engagement}%</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.clicks.toLocaleString()}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.conversions.toLocaleString()}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.roi}x</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campaign.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : campaign.status === 'completed'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {campaign.status === 'active' ? 'Aktif' : campaign.status === 'completed' ? 'Tamamlandı' : 'Planlandı'}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          {campaign.hasCorrectUtm ? (
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <CheckCircleIcon className="h-5 w-5 mr-1" />
                              <span>Doğru</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                              <ExclamationTriangleIcon className="h-5 w-5 mr-1" />
                              <span>Hatalı</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analitik */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Platform Bazlı Performans</h3>
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Platform bazlı performans grafiği</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Influencer Kampanyası Dönüşüm Hunisi</h3>
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Influencer kampanyaları dönüşüm hunisi grafiği</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">UTM Takibi Performansı</h3>
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">UTM bazlı trafik ve dönüşüm grafiği</p>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Doğru UTM Parametreleri Kullanımı</h3>
                      <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                        <p>
                          Influencerlar ile çalışırken, doğru UTM parametreleri kullanmak kampanyalarınızın performansını doğru şekilde ölçmenizi sağlar. Her influencer için şu UTM yapısını kullanmanızı öneririz:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>utm_source = platform adı (instagram, tiktok, youtube)</li>
                          <li>utm_medium = influencer</li>
                          <li>utm_campaign = influencer_isim_platform_tarih</li>
                          <li>utm_content = içerik formatı (post, story, reel, video)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Influencer Dizini */}
          {activeTab === 'influencers' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Influencer Dizini</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Potansiyel influencerlar ve geçmiş iş birliklerinin kaydı burada görüntülenir. Influencer dizini şu anda geliştirme aşamasındadır.
              </p>
              <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium">
                Influencer İşbirliği Ekle
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfluencerMarketing; 