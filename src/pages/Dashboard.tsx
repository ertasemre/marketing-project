import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  BoltIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Demo veriler
const demoMetrics = {
  harcama: {
    tutar: 12450,
    degisim: 8.3,
    artis: true
  },
  roas: {
    oran: 2.85,
    degisim: -1.2,
    artis: false
  },
  ctr: {
    oran: 3.42,
    degisim: 0.8,
    artis: true
  },
  donusumler: {
    sayi: 347,
    degisim: 12.5,
    artis: true
  },
};

const demoLineChartData = [
  { name: '1 Nisan', harcama: 4000, gelir: 10000 },
  { name: '2 Nisan', harcama: 4100, gelir: 9800 },
  { name: '3 Nisan', harcama: 4200, gelir: 11200 },
  { name: '4 Nisan', harcama: 3800, gelir: 9500 },
  { name: '5 Nisan', harcama: 3900, gelir: 12000 },
  { name: '6 Nisan', harcama: 4200, gelir: 12800 },
  { name: '7 Nisan', harcama: 4500, gelir: 14000 },
];

const demoPieChartData = [
  { name: 'Google Ads', value: 7250 },
  { name: 'Meta Ads', value: 4200 },
  { name: 'Criteo', value: 1000 },
];

const demoCampaigns = [
  { 
    id: 'camp1', 
    name: 'Bahar Koleksiyonu', 
    platform: 'google',
    harcama: 3450, 
    donusum: 112,
    cpc: 0.67,
    roas: 4.2,
    durum: 'active',
    performans: 'high'
  },
  { 
    id: 'camp2', 
    name: 'Yaz İndirimleri', 
    platform: 'meta',
    harcama: 2800, 
    donusum: 87,
    cpc: 0.42,
    roas: 3.8,
    durum: 'active',
    performans: 'medium'
  },
  { 
    id: 'camp3', 
    name: 'Yeni Müşteri Kampanyası', 
    platform: 'google',
    harcama: 1950, 
    donusum: 32,
    cpc: 0.85,
    roas: 1.7,
    durum: 'active',
    performans: 'low'
  },
  { 
    id: 'camp4', 
    name: 'Yeniden Hedefleme', 
    platform: 'criteo',
    harcama: 1000, 
    donusum: 45,
    cpc: 0.38,
    roas: 5.2,
    durum: 'active',
    performans: 'high'
  },
  { 
    id: 'camp5', 
    name: 'Marka Bilinirliği', 
    platform: 'meta',
    harcama: 1400, 
    donusum: 23,
    cpc: 0.55,
    roas: 1.2,
    durum: 'paused',
    performans: 'low'
  },
];

// Demo yapay zeka önerileri
const demoAiInsights = [
  {
    id: 'insight1',
    title: 'Mobil Teklif Ayarı',
    description: 'Mobil cihazlardaki dönüşüm oranınız masaüstünden %35 daha yüksek. Mobil teklif ayarınızı artırarak ROAS\'ı iyileştirebilirsiniz.',
    type: 'öneri',
    actionable: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'insight2',
    title: 'Düşük Performanslı Anahtar Kelimeler',
    description: '12 anahtar kelime son 30 günde hiç dönüşüm getirmedi ama 850₺ harcadı. Bu kelimeleri duraklatarak bütçenizi koruyun.',
    type: 'uyarı',
    actionable: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'insight3',
    title: 'Gösterim Payı Kaybı',
    description: 'Gösterim payınız geçen haftaya göre %15 düştü. Bütçe limitinizi artırarak daha fazla müşteriye ulaşabilirsiniz.',
    type: 'uyarı',
    actionable: true,
    createdAt: new Date().toISOString()
  },
];

// Renk paleti
const COLORS = ['#4338CA', '#3B82F6', '#10B981', '#F59E0B'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<'gun' | 'hafta' | 'ay'>('hafta');

  // Veri yükleme simülasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Tarih aralığı formatı
  const getDateRangeText = () => {
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long' });
    
    let startDate;
    switch (range) {
      case 'gun':
        return formatter.format(today);
      case 'hafta':
        startDate = new Date();
        startDate.setDate(today.getDate() - 7);
        return `${formatter.format(startDate)} - ${formatter.format(today)}`;
      case 'ay':
        startDate = new Date();
        startDate.setDate(today.getDate() - 30);
        return `${formatter.format(startDate)} - ${formatter.format(today)}`;
    }
  };

  // Para birimi formatı
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Yüzde formatı
  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık ve tarih aralığı seçimi */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Tarih Aralığı: {getDateRangeText()}</span>
          <div className="relative z-10 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              onClick={() => setRange('gun')}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border text-sm font-medium ${
                range === 'gun'
                  ? 'bg-primary-light text-white border-primary-light'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Bugün
            </button>
            <button
              type="button"
              onClick={() => setRange('hafta')}
              className={`relative inline-flex items-center px-4 py-2 border-t border-b text-sm font-medium ${
                range === 'hafta'
                  ? 'bg-primary-light text-white border-primary-light'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              7 Gün
            </button>
            <button
              type="button"
              onClick={() => setRange('ay')}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border text-sm font-medium ${
                range === 'ay'
                  ? 'bg-primary-light text-white border-primary-light'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              30 Gün
            </button>
          </div>
        </div>
      </div>

      {/* Özet metrik kartları */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Toplam Harcama kartı */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam Harcama</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(demoMetrics.harcama.tutar)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      demoMetrics.harcama.artis ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {demoMetrics.harcama.artis ? (
                        <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                      )}
                      <span className="ml-1">{demoMetrics.harcama.degisim}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* ROAS kartı */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">ROAS</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {demoMetrics.roas.oran.toFixed(2)}x
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      demoMetrics.roas.artis ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {demoMetrics.roas.artis ? (
                        <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                      )}
                      <span className="ml-1">{Math.abs(demoMetrics.roas.degisim)}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* CTR kartı */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BoltIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Tıklama Oranı (CTR)</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {demoMetrics.ctr.oran}%
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      demoMetrics.ctr.artis ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {demoMetrics.ctr.artis ? (
                        <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                      )}
                      <span className="ml-1">{demoMetrics.ctr.degisim}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Dönüşümler kartı */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Dönüşümler</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {demoMetrics.donusumler.sayi}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      demoMetrics.donusumler.artis ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {demoMetrics.donusumler.artis ? (
                        <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                      )}
                      <span className="ml-1">{demoMetrics.donusumler.degisim}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Harcama/Gelir çizgi grafiği */}
        <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Harcama ve Gelir Trendi</h3>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={demoLineChartData}
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
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="harcama" stroke="#4338CA" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="gelir" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Platform bazlı harcama pasta grafiği */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Platform Dağılımı</h3>
            <div className="mt-4 h-80 flex flex-col">
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demoPieChartData}
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {demoPieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2">
                <div className="grid grid-cols-1 gap-2">
                  {demoPieChartData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span
                          className="w-3 h-3 inline-block mr-1 rounded-sm"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Önerileri Bölümü */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <BoltIcon className="h-6 w-6 text-primary mr-2" />
            AI Öneriyor
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Yapay zeka analizi sonucu oluşturulan öneriler
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demoAiInsights.map((insight) => (
              <div key={insight.id} className="bg-blue-50 border-l-4 border-primary-light p-4 rounded-r-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {insight.type === 'öneri' ? (
                      <BoltIcon className="h-5 w-5 text-primary" />
                    ) : (
                      <QuestionMarkCircleIcon className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-primary">{insight.title}</h3>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{insight.description}</p>
                    </div>
                    {insight.actionable && (
                      <div className="mt-3">
                        <button type="button" className="btn btn-primary py-1 text-xs">
                          Uygula
                        </button>
                        <button type="button" className="ml-2 text-xs text-gray-500 hover:text-gray-700">
                          Daha sonra hatırlat
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kampanyalar Tablosu */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Aktif Kampanyalar</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Performans bazlı sıralanmış kampanyalarınız
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kampanya
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harcama
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dönüşüm
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPC
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROAS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performans
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {demoCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/campaigns/${campaign.id}`} className="flex items-center">
                      <div className="text-sm font-medium text-primary hover:text-primary-dark">
                        {campaign.name}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">
                        {campaign.platform === 'google' ? 'Google Ads' :
                         campaign.platform === 'meta' ? 'Meta Ads' : 'Criteo'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(campaign.harcama)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.donusum}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(campaign.cpc)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.roas.toFixed(1)}x</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      campaign.performans === 'high'
                        ? 'bg-green-100 text-green-800'
                        : campaign.performans === 'medium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {campaign.performans === 'high'
                        ? 'Yüksek'
                        : campaign.performans === 'medium'
                        ? 'Orta'
                        : 'Düşük'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 