import { useState } from 'react';
import {
  ChartBarIcon,
  ArrowPathIcon,
  CalendarIcon,
  AdjustmentsHorizontalIcon,
  TableCellsIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

// Veri yapısı için tip tanımlamaları
type StatItem = {
  değer: string;
  değişim: string;
  artışMı: boolean;
};

type GA4StatsData = {
  ziyaretçiler: StatItem;
  oturumlar: StatItem;
  sayfaGörüntülemeleri: StatItem;
  dönüşümOranı: StatItem;
};

type AdsStatsData = {
  harcama: StatItem;
  izlenimler: StatItem;
  tıklamalar: StatItem;
  dönüşümler: StatItem;
};

type StatsData = {
  ga4: GA4StatsData;
  meta: AdsStatsData;
  google_ads: AdsStatsData;
};

type TableData = {
  başlıklar: string[];
  satırlar: string[][];
};

type TableDataCollection = {
  ga4: TableData;
  meta: TableData;
  google_ads: TableData;
};

// Mock veri
const mockStatsData: StatsData = {
  ga4: {
    ziyaretçiler: {
      değer: '124,351',
      değişim: '+12.3%',
      artışMı: true
    },
    oturumlar: {
      değer: '98,246',
      değişim: '+8.7%',
      artışMı: true
    },
    sayfaGörüntülemeleri: {
      değer: '543,789',
      değişim: '+15.2%',
      artışMı: true
    },
    dönüşümOranı: {
      değer: '3.2%',
      değişim: '-0.5%',
      artışMı: false
    }
  },
  meta: {
    harcama: {
      değer: '15,789 ₺',
      değişim: '+5.3%',
      artışMı: true
    },
    izlenimler: {
      değer: '2.45M',
      değişim: '+18.7%',
      artışMı: true
    },
    tıklamalar: {
      değer: '87,654',
      değişim: '+7.2%',
      artışMı: true
    },
    dönüşümler: {
      değer: '1,254',
      değişim: '-2.1%',
      artışMı: false
    }
  },
  google_ads: {
    harcama: {
      değer: '12,456 ₺',
      değişim: '+8.1%',
      artışMı: true
    },
    izlenimler: {
      değer: '1.78M',
      değişim: '+12.5%',
      artışMı: true
    },
    tıklamalar: {
      değer: '65,432',
      değişim: '+6.3%',
      artışMı: true
    },
    dönüşümler: {
      değer: '978',
      değişim: '+3.5%',
      artışMı: true
    }
  }
};

const mockTableData: TableDataCollection = {
  ga4: {
    başlıklar: ['Sayfa', 'Görüntülenme', 'Ort. Süre', 'Hemen Çıkma Oranı'],
    satırlar: [
      ['Ana Sayfa', '45,678', '02:34', '%32.5'],
      ['Ürünler', '23,456', '03:12', '%28.7'],
      ['Blog', '18,765', '04:23', '%45.2'],
      ['Hakkımızda', '12,345', '01:45', '%52.3'],
      ['İletişim', '8,765', '01:12', '%61.8']
    ]
  },
  meta: {
    başlıklar: ['Kampanya', 'Harcama', 'İzlenim', 'Tıklama', 'CTR', 'CPC'],
    satırlar: [
      ['Yaz Kampanyası', '5,432 ₺', '890,765', '34,567', '%3.88', '0.15 ₺'],
      ['Ürün Tanıtımı', '4,321 ₺', '765,432', '28,901', '%3.78', '0.14 ₺'],
      ['Marka Bilinirliği', '3,456 ₺', '654,321', '21,456', '%3.28', '0.16 ₺'],
      ['Özel Gün', '2,345 ₺', '543,210', '18,765', '%3.45', '0.12 ₺'],
      ['Yeniden Pazarlama', '1,234 ₺', '432,109', '15,678', '%3.63', '0.08 ₺']
    ]
  },
  google_ads: {
    başlıklar: ['Kampanya', 'Harcama', 'İzlenim', 'Tıklama', 'CTR', 'CPC'],
    satırlar: [
      ['Arama Kampanyası', '4,567 ₺', '789,012', '32,109', '%4.07', '0.14 ₺'],
      ['Görüntülü Reklam', '3,456 ₺', '678,901', '25,678', '%3.78', '0.13 ₺'],
      ['Video Kampanyası', '2,345 ₺', '567,890', '18,901', '%3.33', '0.12 ₺'],
      ['Alışveriş Reklamları', '1,234 ₺', '456,789', '15,432', '%3.38', '0.08 ₺'],
      ['Uygulama Kampanyası', '987 ₺', '345,678', '12,987', '%3.76', '0.07 ₺']
    ]
  }
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

// Veri kaynağı seçenekleri
const dataSources = [
  { id: 'ga4', label: 'Google Analytics 4', icon: ChartBarIcon },
  { id: 'meta', label: 'Meta Ads', icon: ChartBarIcon },
  { id: 'google_ads', label: 'Google Ads', icon: ChartBarIcon }
];

// İstatistik kartı bileşeni
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isIncrease: boolean;
}

const StatCard = ({ title, value, change, isIncrease }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-4">
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <div className="flex items-end justify-between mt-2">
        <p className="text-2xl font-semibold">{value}</p>
        <div className={`flex items-center text-sm font-medium ${isIncrease ? 'text-success-600' : 'text-error-600'}`}>
          {isIncrease ? '↑' : '↓'} {change}
        </div>
      </div>
    </div>
  );
};

// Tablo bileşeni
interface DataTableProps {
  headers: string[];
  rows: string[][];
}

const DataTable = ({ headers, rows }: DataTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

type DataSourceType = 'ga4' | 'meta' | 'google_ads';

const Analytics = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSourceType>('ga4');
  const [isLoading, setIsLoading] = useState(false);

  // Veri yenileme fonksiyonu
  const refreshData = () => {
    setIsLoading(true);
    // Gerçek uygulamada burada API çağrısı yapılır
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Seçilen veri kaynağı için verileri al
  const activeStats = mockStatsData[selectedDataSource];
  const activeTableData = mockTableData[selectedDataSource];

  // Veri kaynağına göre istatistik başlıklarını belirle
  const statTitles = {
    ga4: {
      stat1: 'Ziyaretçiler',
      stat2: 'Oturumlar',
      stat3: 'Sayfa Görüntülemeleri',
      stat4: 'Dönüşüm Oranı'
    },
    meta: {
      stat1: 'Harcama',
      stat2: 'İzlenimler',
      stat3: 'Tıklamalar',
      stat4: 'Dönüşümler'
    },
    google_ads: {
      stat1: 'Harcama',
      stat2: 'İzlenimler',
      stat3: 'Tıklamalar',
      stat4: 'Dönüşümler'
    }
  };

  const titles = statTitles[selectedDataSource];

  // GA4 ve Ads verilerine erişmek için yardımcı fonksiyonlar
  const getGA4Stat = (statName: keyof GA4StatsData) => {
    if (selectedDataSource === 'ga4') {
      return (activeStats as GA4StatsData)[statName];
    }
    return null;
  };

  const getAdsStats = (statName: keyof AdsStatsData) => {
    if (selectedDataSource === 'meta' || selectedDataSource === 'google_ads') {
      return (activeStats as AdsStatsData)[statName];
    }
    return null;
  };

  // Seçilen tarih aralığının etiketini al
  const selectedDateRangeLabel = dateRangeOptions.find(option => option.id === selectedDateRange)?.label || '';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ChartBarIcon className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Analitik Verileri</h1>
        </div>
        
        <div className="flex space-x-3">
          {/* Tarih aralığı seçimi */}
          <div className="relative">
            <button
              onClick={() => setShowDateRangeDropdown(!showDateRangeDropdown)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
              {selectedDateRangeLabel}
              <ChevronDownIcon className="h-4 w-4 ml-2 text-gray-400" />
            </button>
            
            {showDateRangeDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedDateRange(option.id);
                        setShowDateRangeDropdown(false);
                        refreshData();
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedDateRange === option.id
                          ? 'bg-gray-100 text-gray-900'
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
          
          {/* Veri yenileme butonu */}
          <button
            onClick={refreshData}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={isLoading}
          >
            <ArrowPathIcon 
              className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} 
            />
            Yenile
          </button>
          
          {/* Filtreler butonu */}
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Filtreler
          </button>
        </div>
      </div>
      
      {/* Veri kaynağı seçimi */}
      <div className="bg-white rounded-xl shadow-soft-sm p-1 flex space-x-1 overflow-x-auto">
        {dataSources.map((source) => {
          const isActive = selectedDataSource === source.id;
          const Icon = source.icon;
          
          return (
            <button
              key={source.id}
              onClick={() => {
                setSelectedDataSource(source.id as DataSourceType);
                refreshData();
              }}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {source.label}
            </button>
          );
        })}
      </div>
      
      {/* İstatistik kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {selectedDataSource === 'ga4' && (
          <>
            <StatCard
              title={titles.stat1}
              value={getGA4Stat('ziyaretçiler')?.değer || '-'}
              change={getGA4Stat('ziyaretçiler')?.değişim || '-'}
              isIncrease={getGA4Stat('ziyaretçiler')?.artışMı || false}
            />
            <StatCard
              title={titles.stat2}
              value={getGA4Stat('oturumlar')?.değer || '-'}
              change={getGA4Stat('oturumlar')?.değişim || '-'}
              isIncrease={getGA4Stat('oturumlar')?.artışMı || false}
            />
            <StatCard
              title={titles.stat3}
              value={getGA4Stat('sayfaGörüntülemeleri')?.değer || '-'}
              change={getGA4Stat('sayfaGörüntülemeleri')?.değişim || '-'}
              isIncrease={getGA4Stat('sayfaGörüntülemeleri')?.artışMı || false}
            />
            <StatCard
              title={titles.stat4}
              value={getGA4Stat('dönüşümOranı')?.değer || '-'}
              change={getGA4Stat('dönüşümOranı')?.değişim || '-'}
              isIncrease={getGA4Stat('dönüşümOranı')?.artışMı || false}
            />
          </>
        )}
        
        {(selectedDataSource === 'meta' || selectedDataSource === 'google_ads') && (
          <>
            <StatCard
              title={titles.stat1}
              value={getAdsStats('harcama')?.değer || '-'}
              change={getAdsStats('harcama')?.değişim || '-'}
              isIncrease={getAdsStats('harcama')?.artışMı || false}
            />
            <StatCard
              title={titles.stat2}
              value={getAdsStats('izlenimler')?.değer || '-'}
              change={getAdsStats('izlenimler')?.değişim || '-'}
              isIncrease={getAdsStats('izlenimler')?.artışMı || false}
            />
            <StatCard
              title={titles.stat3}
              value={getAdsStats('tıklamalar')?.değer || '-'}
              change={getAdsStats('tıklamalar')?.değişim || '-'}
              isIncrease={getAdsStats('tıklamalar')?.artışMı || false}
            />
            <StatCard
              title={titles.stat4}
              value={getAdsStats('dönüşümler')?.değer || '-'}
              change={getAdsStats('dönüşümler')?.değişim || '-'}
              isIncrease={getAdsStats('dönüşümler')?.artışMı || false}
            />
          </>
        )}
      </div>
      
      {/* Veri tablosu */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detaylı Veriler</h2>
          <div className="flex items-center">
            <TableCellsIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Toplam: {activeTableData.satırlar.length} kayıt</span>
          </div>
        </div>
        
        <DataTable
          headers={activeTableData.başlıklar}
          rows={activeTableData.satırlar}
        />
      </div>
    </div>
  );
};

export default Analytics; 