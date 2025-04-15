import { useState } from 'react';
import { 
  ChartBarIcon, 
  PhotoIcon, 
  UserGroupIcon, 
  CursorArrowRaysIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Demo kreatif verileri
const demoCreatives = [
  {
    id: 'crt1',
    name: 'Yaz Koleksiyonu Görsel 1',
    type: 'image',
    platform: 'meta',
    imageUrl: 'https://via.placeholder.com/300x200',
    impressions: 42500,
    clicks: 1240,
    ctr: 2.92,
    conversions: 28,
    spent: 850,
    revenue: 3500,
    roas: 4.1,
    createdAt: '2023-03-12',
    status: 'active',
    aiScore: 85,
  },
  {
    id: 'crt2',
    name: 'Bahar İndirimi Banner',
    type: 'image',
    platform: 'google',
    imageUrl: 'https://via.placeholder.com/300x200',
    impressions: 35200,
    clicks: 980,
    ctr: 2.78,
    conversions: 15,
    spent: 540,
    revenue: 1850,
    roas: 3.4,
    createdAt: '2023-03-05',
    status: 'active',
    aiScore: 72,
  },
  {
    id: 'crt3',
    name: 'Yeni Sezon Video Reklamı',
    type: 'video',
    platform: 'meta',
    imageUrl: 'https://via.placeholder.com/300x200',
    impressions: 28400,
    clicks: 1350,
    ctr: 4.75,
    conversions: 32,
    spent: 920,
    revenue: 4100,
    roas: 4.5,
    createdAt: '2023-03-18',
    status: 'active',
    aiScore: 92,
  },
  {
    id: 'crt4',
    name: 'İndirim Kampanyası Banner',
    type: 'image',
    platform: 'google',
    imageUrl: 'https://via.placeholder.com/300x200',
    impressions: 18600,
    clicks: 520,
    ctr: 2.8,
    conversions: 7,
    spent: 350,
    revenue: 950,
    roas: 2.7,
    createdAt: '2023-02-28',
    status: 'paused',
    aiScore: 64,
  },
  {
    id: 'crt5',
    name: 'Carousel Ürün Reklamı',
    type: 'carousel',
    platform: 'meta',
    imageUrl: 'https://via.placeholder.com/300x200',
    impressions: 31200,
    clicks: 1180,
    ctr: 3.78,
    conversions: 22,
    spent: 680,
    revenue: 2750,
    roas: 4.0,
    createdAt: '2023-03-10',
    status: 'active',
    aiScore: 78,
  },
];

// Demo hedef kitle verileri
const demoAudiences = [
  {
    id: 'aud1',
    name: '25-34 Kadın',
    platform: 'meta',
    type: 'demographic',
    size: 220000,
    reach: 75000,
    impressions: 125000,
    clicks: 3850,
    ctr: 3.08,
    conversions: 82,
    spent: 1890,
    revenue: 8200,
    roas: 4.3,
    status: 'active',
    aiScore: 88,
  },
  {
    id: 'aud2',
    name: 'Alışveriş İlgi Alanları',
    platform: 'google',
    type: 'interest',
    size: 450000,
    reach: 120000,
    impressions: 210000,
    clicks: 5600,
    ctr: 2.67,
    conversions: 110,
    spent: 3100,
    revenue: 11800,
    roas: 3.8,
    status: 'active',
    aiScore: 76,
  },
  {
    id: 'aud3',
    name: 'Reklamlı Ürünü Görüntüleyenler',
    platform: 'meta',
    type: 'remarketing',
    size: 35000,
    reach: 28000,
    impressions: 65000,
    clicks: 2850,
    ctr: 4.38,
    conversions: 95,
    spent: 1750,
    revenue: 9200,
    roas: 5.3,
    status: 'active',
    aiScore: 94,
  },
  {
    id: 'aud4',
    name: 'Yüksek Değerli Alışveriş',
    platform: 'google',
    type: 'custom',
    size: 180000,
    reach: 45000,
    impressions: 82000,
    clicks: 1950,
    ctr: 2.38,
    conversions: 35,
    spent: 1250,
    revenue: 5100,
    roas: 4.1,
    status: 'active',
    aiScore: 82,
  },
];

// Demo Kreatif performans grafiği
const demoCreativePerformance = [
  { name: 'crt1', ctr: 2.92, cvr: 2.26, roas: 4.1 },
  { name: 'crt2', ctr: 2.78, cvr: 1.53, roas: 3.4 },
  { name: 'crt3', ctr: 4.75, cvr: 2.37, roas: 4.5 },
  { name: 'crt4', ctr: 2.8, cvr: 1.35, roas: 2.7 },
  { name: 'crt5', ctr: 3.78, cvr: 1.86, roas: 4.0 },
];

// Demo Hedef Kitle Yaş/Cinsiyet dağılımı
const demoAudienceDemographics = [
  { name: '18-24', male: 15, female: 22 },
  { name: '25-34', male: 28, female: 35 },
  { name: '35-44', male: 20, female: 25 },
  { name: '45-54', male: 12, female: 18 },
  { name: '55+', male: 8, female: 12 },
];

// Renk paleti
const COLORS = ['#4338CA', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const CreativesAudience = () => {
  const [activeTab, setActiveTab] = useState<'creatives' | 'audience'>('creatives');
  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'google' | 'meta'>('all');
  const [sortBy, setSortBy] = useState<'roas' | 'conversions' | 'ctr'>('roas');

  // Para birimi formatı
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Platform filtresi
  const filterByPlatform = (items: any[]) => {
    if (selectedPlatform === 'all') return items;
    return items.filter(item => item.platform === selectedPlatform);
  };

  // Arama filtresi
  const filterBySearch = (items: any[]) => {
    if (!search) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Sıralama
  const sortItems = (items: any[]) => {
    return [...items].sort((a, b) => b[sortBy] - a[sortBy]);
  };

  // Filtre uygulama
  const filteredCreatives = sortItems(filterBySearch(filterByPlatform(demoCreatives)));
  const filteredAudiences = sortItems(filterBySearch(filterByPlatform(demoAudiences)));

  return (
    <div className="space-y-6">
      {/* Sayfa başlığı */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Kreatifler & Hedef Kitle</h1>
      </div>

      {/* Sekmeler */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('creatives')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'creatives'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <PhotoIcon className="h-5 w-5 inline-block mr-2" />
              Kreatifler
            </button>
            <button
              onClick={() => setActiveTab('audience')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'audience'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
              Hedef Kitle
            </button>
          </nav>
        </div>

        {/* Filtreler */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="input pl-10"
                  placeholder={`${activeTab === 'creatives' ? 'Kreatif' : 'Hedef kitle'} ara...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <select
                  id="platform"
                  className="input"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as any)}
                >
                  <option value="all">Tümü</option>
                  <option value="google">Google Ads</option>
                  <option value="meta">Meta Ads</option>
                </select>
              </div>
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                  Sıralama
                </label>
                <select
                  id="sort"
                  className="input"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="roas">ROAS</option>
                  <option value="conversions">Dönüşüm</option>
                  <option value="ctr">CTR</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-6">
          {activeTab === 'creatives' ? (
            <div className="space-y-8">
              {/* Kreatif performans grafiği */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Kreatif Performans Karşılaştırması</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={demoCreativePerformance}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ctr" name="Tıklama Oranı (%)" fill="#4338CA" />
                      <Bar dataKey="cvr" name="Dönüşüm Oranı (%)" fill="#10B981" />
                      <Bar dataKey="roas" name="ROAS (x)" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Kreatif listesi */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kreatif
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Platform
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gösterim
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CTR
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dönüşüm
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Harcama
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ROAS
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AI Puanı
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCreatives.map((creative) => (
                      <tr key={creative.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded overflow-hidden">
                              <img src={creative.imageUrl} alt={creative.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{creative.name}</div>
                              <div className="text-sm text-gray-500">{creative.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {creative.platform === 'google' ? 'Google Ads' : 'Meta Ads'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{creative.impressions.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{creative.ctr.toFixed(2)}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{creative.conversions}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(creative.spent)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{creative.roas.toFixed(1)}x</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium px-2 py-1 rounded-full text-center text-white ${
                            creative.aiScore >= 80 ? 'bg-green-500' : 
                            creative.aiScore >= 65 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}>
                            {creative.aiScore}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Hedef kitle demografik grafiği */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hedef Kitle Demografik Dağılımı</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={demoAudienceDemographics}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" name="Erkek (%)" fill="#3B82F6" />
                      <Bar dataKey="female" name="Kadın (%)" fill="#EC4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Hedef kitle listesi */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hedef Kitle
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Platform
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kitle Boyutu
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CTR
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dönüşüm
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Harcama
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ROAS
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AI Puanı
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAudiences.map((audience) => (
                      <tr key={audience.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <UserGroupIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{audience.name}</div>
                              <div className="text-sm text-gray-500">{audience.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {audience.platform === 'google' ? 'Google Ads' : 'Meta Ads'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{audience.size.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{audience.ctr.toFixed(2)}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{audience.conversions}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(audience.spent)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{audience.roas.toFixed(1)}x</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium px-2 py-1 rounded-full text-center text-white ${
                            audience.aiScore >= 80 ? 'bg-green-500' : 
                            audience.aiScore >= 65 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}>
                            {audience.aiScore}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativesAudience; 