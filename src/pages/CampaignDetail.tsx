import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ChartBarIcon, BoltIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Demo kampanya verisi - gerçek uygulamada bir API'dan alınacak
const demoCampaign = {
  id: 'camp1',
  name: 'Bahar Koleksiyonu',
  platform: 'google',
  status: 'active',
  startDate: '2023-03-15',
  budget: 5000,
  spent: 3450,
  impressions: 125000,
  clicks: 5150,
  conversions: 112,
  revenue: 14490,
  roas: 4.2,
  ctr: 4.12,
  cpc: 0.67,
  conversionRate: 2.17,
  cpa: 30.80,
};

// Demo zaman serisi verisi
const demoTimeData = [
  { date: '1 Nisan', impressions: 15000, clicks: 620, conversions: 15, spent: 420, revenue: 1800 },
  { date: '2 Nisan', impressions: 16500, clicks: 680, conversions: 18, spent: 450, revenue: 2200 },
  { date: '3 Nisan', impressions: 14800, clicks: 590, conversions: 14, spent: 400, revenue: 1600 },
  { date: '4 Nisan', impressions: 18200, clicks: 750, conversions: 20, spent: 510, revenue: 2500 },
  { date: '5 Nisan', impressions: 19500, clicks: 810, conversions: 22, spent: 540, revenue: 2800 },
  { date: '6 Nisan', impressions: 20100, clicks: 840, conversions: 24, spent: 560, revenue: 3100 },
  { date: '7 Nisan', impressions: 20900, clicks: 860, conversions: 25, spent: 570, revenue: 3200 },
];

// Demo cihaz dağılımı
const demoDeviceData = [
  { name: 'Masaüstü', value: 1890 },
  { name: 'Mobil', value: 1150 },
  { name: 'Tablet', value: 410 },
];

// Demo hedef kitle verileri
const demoAudienceData = [
  { name: '18-24', male: 240, female: 310 },
  { name: '25-34', male: 450, female: 590 },
  { name: '35-44', male: 380, female: 420 },
  { name: '45-54', male: 280, female: 250 },
  { name: '55+', male: 210, female: 140 },
];

// Demo AI içgörüleri
const demoAiInsight = {
  title: 'Kampanya Optimizasyon Önerileri',
  description: 'Mobil cihazlarda dönüşüm oranınız masaüstünden %32 daha yüksek. Ancak bütçenizin sadece %33\'ü mobil reklamlara harcanıyor. Mobil teklif ayarlarınızı +30% artırırsanız, genel kampanya ROAS\'ınızı %15 kadar iyileştirebilirsiniz.',
  recommendations: [
    'Mobil teklif ayarlarını +30% artırın',
    '25-34 yaş aralığını hedefleyen reklamları güçlendirin',
    'Düşük performanslı reklamları duraklatın veya optimize edin'
  ]
};

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState<'impressions' | 'clicks' | 'conversions' | 'spent' | 'revenue'>('conversions');
  
  // Veri yükleme simülasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Para birimi formatı
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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
      {/* Başlık ve geri butonu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{demoCampaign.name}</h1>
          <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Aktif
          </span>
        </div>
        <div>
          <button className="btn btn-primary">Kampanyayı Düzenle</button>
        </div>
      </div>

      {/* Genel Metrikler */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Kampanya Özeti</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Harcama</div>
            <div className="mt-1 text-2xl font-semibold">{formatCurrency(demoCampaign.spent)}</div>
            <div className="mt-1 text-sm text-gray-500">
              Bütçe: {formatCurrency(demoCampaign.budget)}
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Dönüşümler</div>
            <div className="mt-1 text-2xl font-semibold">{demoCampaign.conversions}</div>
            <div className="mt-1 text-sm text-gray-500">
              Dönüşüm Oranı: {demoCampaign.conversionRate}%
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">ROAS</div>
            <div className="mt-1 text-2xl font-semibold">{demoCampaign.roas.toFixed(1)}x</div>
            <div className="mt-1 text-sm text-gray-500">
              Gelir: {formatCurrency(demoCampaign.revenue)}
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">CPC / CPA</div>
            <div className="mt-1 text-2xl font-semibold">{formatCurrency(demoCampaign.cpc)}</div>
            <div className="mt-1 text-sm text-gray-500">
              CPA: {formatCurrency(demoCampaign.cpa)}
            </div>
          </div>
        </div>
      </div>

      {/* Zaman serisi grafiği */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Performans Trendi</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveMetric('impressions')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeMetric === 'impressions' 
                  ? 'bg-primary-light text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Gösterimler
            </button>
            <button
              onClick={() => setActiveMetric('clicks')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeMetric === 'clicks' 
                  ? 'bg-primary-light text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Tıklamalar
            </button>
            <button
              onClick={() => setActiveMetric('conversions')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeMetric === 'conversions' 
                  ? 'bg-primary-light text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Dönüşümler
            </button>
            <button
              onClick={() => setActiveMetric('spent')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeMetric === 'spent' 
                  ? 'bg-primary-light text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Harcama
            </button>
            <button
              onClick={() => setActiveMetric('revenue')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeMetric === 'revenue' 
                  ? 'bg-primary-light text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Gelir
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={demoTimeData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'spent' || name === 'revenue') {
                    return formatCurrency(Number(value));
                  }
                  return value;
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={activeMetric} 
                stroke="#4338CA" 
                activeDot={{ r: 8 }}
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Claude AI İçgörü Bölümü */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <BoltIcon className="h-6 w-6 text-primary mr-2" />
            Claude AI İçgörüsü
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Kampanyanızı iyileştirmek için özel içgörüler
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6 bg-blue-50">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-lg font-medium text-primary">{demoAiInsight.title}</h3>
              <div className="mt-2 text-gray-700">
                <p>{demoAiInsight.description}</p>
              </div>
              <div className="mt-3">
                <h4 className="text-md font-medium text-gray-900">Önerilen Eylemler:</h4>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  {demoAiInsight.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <button className="btn btn-primary">Önerileri Uygula</button>
                <button className="ml-3 btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Daha Fazla Analiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kırılım Tablosu */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Kampanya Kırılımları</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Performans detaylarını farklı boyutlarda görüntüleyin
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-3 text-sm font-medium text-primary border-b-2 border-primary">
              Cihazlar
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
              Demografik
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
              Konum
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
              Saatler
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cihaz
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harcama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tıklama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dönüşüm
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROAS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Masaüstü</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(1890)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">2845</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">3.9%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">58</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">3.8x</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Mobil</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(1150)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">1725</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">4.4%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">42</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">5.1x</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Tablet</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(410)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">580</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">3.8%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">12</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">3.4x</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail; 