import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  TagIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  HeartIcon,
  SparklesIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Örnek veri tipleri
type ProductMetric = {
  id: string;
  name: string;
  category: string;
  price: number;
  views: number;
  viewsChange: number;
  conversions: number;
  conversionRate: number;
  conversionRateChange: number;
  favorites: number;
  favoritesChange: number;
  revenue: number;
  revenueChange: number;
  stock: number;
  thumbnail: string;
};

type CategoryMetric = {
  id: string;
  name: string;
  products: number;
  views: number;
  viewsChange: number;
  conversions: number;
  conversionRate: number;
  conversionRateChange: number;
  revenue: number;
  revenueChange: number;
};

type AIInsight = {
  id: string;
  title: string;
  description: string;
  type: 'öneri' | 'trend' | 'uyarı';
  category?: string;
  product?: string;
  actionTaken: boolean;
  date: string;
};

// Örnek veriler - Gerçek uygulamada bu veriler API'den gelecektir
const sampleProducts: ProductMetric[] = [
  {
    id: 'prod1',
    name: 'Premium Deri Cüzdan',
    category: 'Aksesuarlar',
    price: 249.90,
    views: 3245,
    viewsChange: 12.5,
    conversions: 128,
    conversionRate: 3.94,
    conversionRateChange: 0.8,
    favorites: 210,
    favoritesChange: 15.3,
    revenue: 31987.20,
    revenueChange: 18.2,
    stock: 45,
    thumbnail: 'https://picsum.photos/seed/prod1/200/200'
  },
  {
    id: 'prod2',
    name: 'Vintage Denim Ceket',
    category: 'Giyim',
    price: 399.90,
    views: 4120,
    viewsChange: 8.3,
    conversions: 98,
    conversionRate: 2.38,
    conversionRateChange: -1.2,
    favorites: 312,
    favoritesChange: 22.5,
    revenue: 39190.20,
    revenueChange: 5.7,
    stock: 28,
    thumbnail: 'https://picsum.photos/seed/prod2/200/200'
  },
  {
    id: 'prod3',
    name: 'Akıllı Saat Pro X',
    category: 'Elektronik',
    price: 1299.90,
    views: 6530,
    viewsChange: 28.7,
    conversions: 187,
    conversionRate: 2.86,
    conversionRateChange: 4.2,
    favorites: 543,
    favoritesChange: 31.8,
    revenue: 242980.30,
    revenueChange: 35.2,
    stock: 64,
    thumbnail: 'https://picsum.photos/seed/prod3/200/200'
  },
  {
    id: 'prod4',
    name: 'El Yapımı Seramik Kupa',
    category: 'Ev & Yaşam',
    price: 89.90,
    views: 2870,
    viewsChange: -5.2,
    conversions: 235,
    conversionRate: 8.19,
    conversionRateChange: 2.4,
    favorites: 187,
    favoritesChange: -2.8,
    revenue: 21126.50,
    revenueChange: -3.5,
    stock: 112,
    thumbnail: 'https://picsum.photos/seed/prod4/200/200'
  },
  {
    id: 'prod5',
    name: 'Organik Yüz Kremi',
    category: 'Kozmetik',
    price: 149.90,
    views: 3720,
    viewsChange: 18.9,
    conversions: 284,
    conversionRate: 7.63,
    conversionRateChange: 3.1,
    favorites: 298,
    favoritesChange: 12.4,
    revenue: 42571.60,
    revenueChange: 22.8,
    stock: 78,
    thumbnail: 'https://picsum.photos/seed/prod5/200/200'
  },
  {
    id: 'prod6',
    name: 'Kablosuz Kulaklık',
    category: 'Elektronik',
    price: 699.90,
    views: 5480,
    viewsChange: 22.3,
    conversions: 165,
    conversionRate: 3.01,
    conversionRateChange: -0.5,
    favorites: 421,
    favoritesChange: 19.7,
    revenue: 115483.50,
    revenueChange: 21.5,
    stock: 52,
    thumbnail: 'https://picsum.photos/seed/prod6/200/200'
  }
];

const sampleCategories: CategoryMetric[] = [
  {
    id: 'cat1',
    name: 'Elektronik',
    products: 157,
    views: 58420,
    viewsChange: 25.3,
    conversions: 1835,
    conversionRate: 3.14,
    conversionRateChange: 1.8,
    revenue: 1245890.50,
    revenueChange: 28.7
  },
  {
    id: 'cat2',
    name: 'Giyim',
    products: 342,
    views: 87650,
    viewsChange: 12.8,
    conversions: 3245,
    conversionRate: 3.70,
    conversionRateChange: 0.5,
    revenue: 845320.75,
    revenueChange: 15.2
  },
  {
    id: 'cat3',
    name: 'Ev & Yaşam',
    products: 218,
    views: 45230,
    viewsChange: 8.5,
    conversions: 2760,
    conversionRate: 6.10,
    conversionRateChange: 2.2,
    revenue: 532780.40,
    revenueChange: 11.8
  },
  {
    id: 'cat4',
    name: 'Kozmetik',
    products: 124,
    views: 36540,
    viewsChange: 17.2,
    conversions: 2480,
    conversionRate: 6.79,
    conversionRateChange: 3.1,
    revenue: 487650.30,
    revenueChange: 22.5
  },
  {
    id: 'cat5',
    name: 'Aksesuarlar',
    products: 183,
    views: 29870,
    viewsChange: 9.7,
    conversions: 1540,
    conversionRate: 5.16,
    conversionRateChange: 1.3,
    revenue: 368420.25,
    revenueChange: 12.4
  }
];

const sampleAIInsights: AIInsight[] = [
  {
    id: 'insight1',
    title: 'Stok Optimizasyonu',
    description: '"Akıllı Saat Pro X" ürününün satış hızı son haftada %28 arttı. Stok seviyesi mevcut trendle 12 gün içinde tükenecek. Stok artırımı yapmalısınız.',
    type: 'uyarı',
    product: 'Akıllı Saat Pro X',
    actionTaken: false,
    date: '2023-06-01'
  },
  {
    id: 'insight2',
    title: 'Fiyat Optimizasyonu',
    description: '"Organik Yüz Kremi" için dinamik fiyatlandırma önerisi: Hafta sonu talep artışında %5-8 arası fiyat artışı dönüşüm oranını etkilemeden geliri artırabilir.',
    type: 'öneri',
    product: 'Organik Yüz Kremi',
    actionTaken: false,
    date: '2023-06-02'
  },
  {
    id: 'insight3',
    title: 'Kategori Trendi',
    description: '"Elektronik" kategorisindeki ürünler son 30 günde diğer kategorilere göre %35 daha fazla görüntüleme ve %28 daha fazla dönüşüm elde etti. Bu kategori için daha fazla kampanya ve içerik üretmeyi düşünün.',
    type: 'trend',
    category: 'Elektronik',
    actionTaken: false,
    date: '2023-06-03'
  },
  {
    id: 'insight4',
    title: 'Müşteri Etkileşimi',
    description: '"Vintage Denim Ceket" ürünü favorilere ekleniyor ancak satın alma oranı düşük. İndirim kuponu veya sınırlı süre teklifi düşünmenizi öneririz.',
    type: 'öneri',
    product: 'Vintage Denim Ceket',
    actionTaken: false,
    date: '2023-06-04'
  },
  {
    id: 'insight5',
    title: 'Satın Alma Hunisi Optimizasyonu',
    description: '"El Yapımı Seramik Kupa" ürününün sepete eklenme oranı yüksek ama satın alma oranı düşük. Checkout sürecini iyileştirmenizi veya kargo ücretini gözden geçirmenizi öneririz.',
    type: 'uyarı',
    product: 'El Yapımı Seramik Kupa',
    actionTaken: false,
    date: '2023-06-05'
  }
];

// Grafik verileri
const viewsPerCategoryData = sampleCategories.map(cat => ({
  name: cat.name,
  views: cat.views
}));

const conversionsByProductData = sampleProducts.map(prod => ({
  name: prod.name,
  conversions: prod.conversions,
  rate: prod.conversionRate
}));

const revenueTimeSeriesData = [
  { date: '1 Mayıs', Elektronik: 32400, Giyim: 22800, Kozmetik: 18500, Aksesuar: 12300, 'Ev & Yaşam': 16700 },
  { date: '2 Mayıs', Elektronik: 35600, Giyim: 21500, Kozmetik: 19200, Aksesuar: 13400, 'Ev & Yaşam': 15900 },
  { date: '3 Mayıs', Elektronik: 34200, Giyim: 23100, Kozmetik: 18700, Aksesuar: 12800, 'Ev & Yaşam': 16300 },
  { date: '4 Mayıs', Elektronik: 37800, Giyim: 24500, Kozmetik: 20100, Aksesuar: 14200, 'Ev & Yaşam': 17400 },
  { date: '5 Mayıs', Elektronik: 39500, Giyim: 26200, Kozmetik: 21300, Aksesuar: 15100, 'Ev & Yaşam': 18600 },
  { date: '6 Mayıs', Elektronik: 41200, Giyim: 25600, Kozmetik: 22800, Aksesuar: 14600, 'Ev & Yaşam': 19800 },
  { date: '7 Mayıs', Elektronik: 42800, Giyim: 27300, Kozmetik: 23500, Aksesuar: 15700, 'Ev & Yaşam': 20500 }
];

// Renk paleti
const COLORS = ['#4338CA', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const ECommerceInsights = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [sortBy, setSortBy] = useState('revenue');
  const [activeTab, setActiveTab] = useState('products');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Veri yükleme simülasyonu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [period]);
  
  // Para birimi formatı
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Yüzde formatı
  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };
  
  // Filtrelenmiş ürünler
  const filteredProducts = sampleProducts
    .filter(product => categoryFilter === 'all' || product.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      if (sortBy === 'conversions') return b.conversions - a.conversions;
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'favorites') return b.favorites - a.favorites;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Başlık ve Filtreler */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">E-Ticaret İçgörüleri</h1>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
          >
            <option value="all">Tüm Kategoriler</option>
            {sampleCategories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
          >
            <option value="revenue">Gelire Göre</option>
            <option value="conversions">Dönüşüme Göre</option>
            <option value="views">Görüntülenmeye Göre</option>
            <option value="favorites">Favorilere Göre</option>
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

      {/* Özet Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Toplam Görüntülenme */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Görüntülenme</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">257,710</p>
            </div>
            <div className="rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <EyeIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
            <span>+15.8%</span>
            <span className="ml-1">son {period} günde</span>
          </div>
        </div>

        {/* Dönüşüm Oranı */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dönüşüm Oranı</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">4.75%</p>
            </div>
            <div className="rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <ChartBarIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
            <span>+1.2%</span>
            <span className="ml-1">son {period} günde</span>
          </div>
        </div>

        {/* Toplam Satış */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Satış</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">11,860</p>
            </div>
            <div className="rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <ShoppingCartIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
            <span>+18.3%</span>
            <span className="ml-1">son {period} günde</span>
          </div>
        </div>

        {/* Toplam Gelir */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Gelir</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">₺3.48M</p>
            </div>
            <div className="rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <ShoppingBagIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
            <span>+21.5%</span>
            <span className="ml-1">son {period} günde</span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
        <div className="flex items-center mb-4">
          <SparklesIcon className="h-6 w-6 text-primary-500 dark:text-primary-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI İçgörüleri</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleAIInsights.map((insight) => (
            <div 
              key={insight.id} 
              className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'öneri' 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                  : insight.type === 'trend'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="flex justify-between mb-2">
                <h3 className={`font-medium ${
                  insight.type === 'öneri' 
                    ? 'text-primary-700 dark:text-primary-400' 
                    : insight.type === 'trend'
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-yellow-700 dark:text-yellow-400'
                }`}>{insight.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  insight.type === 'öneri' 
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300' 
                    : insight.type === 'trend'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                }`}>
                  {insight.type === 'öneri' ? 'Öneri' : insight.type === 'trend' ? 'Trend' : 'Uyarı'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{insight.description}</p>
              
              {(insight.product || insight.category) && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {insight.product && <span className="mr-2">Ürün: {insight.product}</span>}
                  {insight.category && <span>Kategori: {insight.category}</span>}
                </div>
              )}
              
              <div className="flex justify-between mt-2">
                <button className={`text-xs font-medium px-3 py-1 rounded-md ${
                  insight.type === 'öneri' 
                    ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                    : insight.type === 'trend'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}>
                  Uygula
                </button>
                <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Sonra Hatırlat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Menü */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            En Çok Satan Ürünler
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'favorites'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            En Çok Favorilenen
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Kategori Analizi
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Satış Analitiği
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
          {/* Ürünler Tablosu */}
          {activeTab === 'products' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ürün</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategori</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fiyat</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Görüntülenme</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dönüşüm Oranı</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Satış</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gelir</th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stok</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md object-cover" src={product.thumbnail} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">ID: {product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.category}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatCurrency(product.price)}</td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{product.views.toLocaleString()}</div>
                          <div className={`text-xs ${product.viewsChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {product.viewsChange >= 0 ? '+' : ''}{product.viewsChange}%
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{formatPercent(product.conversionRate)}</div>
                          <div className={`text-xs ${product.conversionRateChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {product.conversionRateChange >= 0 ? '+' : ''}{product.conversionRateChange}%
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.conversions}</td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(product.revenue)}</div>
                          <div className={`text-xs ${product.revenueChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {product.revenueChange >= 0 ? '+' : ''}{product.revenueChange}%
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.stock > 50 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : product.stock > 20
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {product.stock} adet
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* En Çok Favorilenen Ürünler */}
          {activeTab === 'favorites' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">En Çok Favorilenen Ürünler</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredProducts
                    .sort((a, b) => b.favorites - a.favorites)
                    .slice(0, 6)
                    .map((product) => (
                      <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                          <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm">
                              <HeartIcon className="h-3.5 w-3.5 text-red-500 mr-1" /> 
                              {product.favorites}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-1">{product.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
                            <div className="flex items-center text-sm">
                              <span className="text-gray-500 dark:text-gray-400 mr-1">Dönüşüm:</span>
                              <span className={`font-medium ${
                                product.conversionRate > 5 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : product.conversionRate > 2.5
                                    ? 'text-yellow-600 dark:text-yellow-400'
                                    : 'text-red-600 dark:text-red-400'
                              }`}>{formatPercent(product.conversionRate)}</span>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Favori artış oranı:</span>
                            <span className={`ml-1 font-medium ${
                              product.favoritesChange >= 0 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {product.favoritesChange >= 0 ? '+' : ''}{product.favoritesChange}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Favoriler ve Dönüşüm İlişkisi</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredProducts
                        .sort((a, b) => b.favorites - a.favorites)
                        .slice(0, 8)}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="favorites" name="Favoriler" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="conversions" name="Dönüşümler" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Kategori Analizi */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/50">
                        <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategori</th>
                        <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ürün Sayısı</th>
                        <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Görüntülenme</th>
                        <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dönüşüm Oranı</th>
                        <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Toplam Gelir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {sampleCategories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</div>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{category.products}</td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{category.views.toLocaleString()}</div>
                            <div className={`text-xs ${category.viewsChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {category.viewsChange >= 0 ? '+' : ''}{category.viewsChange}%
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{formatPercent(category.conversionRate)}</div>
                            <div className={`text-xs ${category.conversionRateChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {category.conversionRateChange >= 0 ? '+' : ''}{category.conversionRateChange}%
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(category.revenue)}</div>
                            <div className={`text-xs ${category.revenueChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {category.revenueChange >= 0 ? '+' : ''}{category.revenueChange}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Kategori Görüntülenmeleri</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={viewsPerCategoryData}
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
                        <Bar dataKey="views" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Kategori Gelir Dağılımı</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sampleCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="revenue"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sampleCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Satış Analitiği */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Kategori Bazlı Günlük Gelir</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueTimeSeriesData}
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
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line type="monotone" dataKey="Elektronik" stroke="#4338CA" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Giyim" stroke="#3B82F6" />
                      <Line type="monotone" dataKey="Kozmetik" stroke="#10B981" />
                      <Line type="monotone" dataKey="Aksesuar" stroke="#F59E0B" />
                      <Line type="monotone" dataKey="Ev & Yaşam" stroke="#EF4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Ürün Dönüşüm Oranları</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={conversionsByProductData.slice(0, 8)}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rate" name="Dönüşüm Oranı (%)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Satın Alma Hunisi</h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <QuestionMarkCircleIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Bu bölüm, müşteri yolculuğunu takip etmenize ve dönüşüm huni daralmalarını tespit etmenize yardımcı olur.
                        En çok kayıp yaşanan noktaları belirleyerek, müşteri deneyimini iyileştirebilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative h-80 flex flex-col items-center">
                  <div className="w-4/5 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-t-lg flex items-center justify-center border border-primary-200 dark:border-primary-800 text-center px-4">
                    <div>
                      <div className="text-lg font-medium text-primary-800 dark:text-primary-300">Ürün Görüntüleme</div>
                      <div className="text-sm text-primary-600 dark:text-primary-400">257,710</div>
                    </div>
                  </div>
                  <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[20px] border-primary-100 dark:border-primary-900/30 z-10"></div>
                  
                  <div className="w-3/4 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-800 text-center px-4 -mt-3">
                    <div>
                      <div className="text-lg font-medium text-blue-800 dark:text-blue-300">Sepete Ekleme</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">52,345 (20.3%)</div>
                    </div>
                  </div>
                  <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[15px] border-blue-100 dark:border-blue-900/30 z-10"></div>
                  
                  <div className="w-2/3 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center border border-teal-200 dark:border-teal-800 text-center px-4 -mt-3">
                    <div>
                      <div className="text-lg font-medium text-teal-800 dark:text-teal-300">Ödeme Sayfası</div>
                      <div className="text-sm text-teal-600 dark:text-teal-400">23,830 (45.5%)</div>
                    </div>
                  </div>
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[12px] border-teal-100 dark:border-teal-900/30 z-10"></div>
                  
                  <div className="w-1/2 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center border border-green-200 dark:border-green-800 text-center px-4 -mt-3">
                    <div>
                      <div className="text-lg font-medium text-green-800 dark:text-green-300">Satın Alma</div>
                      <div className="text-sm text-green-600 dark:text-green-400">11,860 (49.8%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ECommerceInsights; 