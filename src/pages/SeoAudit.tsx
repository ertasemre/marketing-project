import { useState } from 'react';
import {
  MagnifyingGlassCircleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  UserIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// Tip tanımlamaları
type AuditStatus = 'passed' | 'failed' | 'warning' | 'info';
type AuditCategory = 'performance' | 'seo' | 'accessibility' | 'best-practices' | 'meta';

interface AuditItem {
  id: string;
  title: string;
  description: string;
  status: AuditStatus;
  category: AuditCategory;
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
}

interface CategoryScore {
  category: AuditCategory;
  score: number;
  total: number;
  passed: number;
}

interface AuditResult {
  url: string;
  timestamp: string;
  totalScore: number;
  categoryScores: CategoryScore[];
  items: AuditItem[];
}

// Mock veri
const mockAuditResult: AuditResult = {
  url: 'https://example.com',
  timestamp: new Date().toISOString(),
  totalScore: 72,
  categoryScores: [
    { category: 'performance', score: 68, total: 10, passed: 6 },
    { category: 'seo', score: 85, total: 12, passed: 10 },
    { category: 'accessibility', score: 79, total: 8, passed: 6 },
    { category: 'best-practices', score: 65, total: 7, passed: 4 },
    { category: 'meta', score: 62, total: 5, passed: 3 },
  ],
  items: [
    {
      id: 'meta-1',
      title: 'Title Tag Optimizasyonu',
      description: 'Title tag uzunluğu ve içeriği arama motorları için optimize edilmemiş.',
      status: 'warning',
      category: 'meta',
      impact: 'high',
      recommendation: 'Title tag 50-60 karakter arasında olmalı ve ana anahtar kelimenizi içermeli.'
    },
    {
      id: 'meta-2',
      title: 'Meta Description',
      description: 'Meta description uzunluğu optimum değil veya önemli anahtar kelimeler eksik.',
      status: 'failed',
      category: 'meta',
      impact: 'medium',
      recommendation: 'Meta description 120-155 karakter arasında olmalı ve içeriği doğru yansıtmalı.'
    },
    {
      id: 'meta-3',
      title: 'Canonical Tag',
      description: 'Sayfada canonical tag bulunuyor.',
      status: 'passed',
      category: 'meta',
      impact: 'medium',
      recommendation: 'İyi iş! Canonical tag doğru şekilde uygulanmış.'
    },
    {
      id: 'seo-1',
      title: 'H1 Tag Kullanımı',
      description: 'H1 tag mevcut ve doğru şekilde kullanılmış.',
      status: 'passed',
      category: 'seo',
      impact: 'high',
      recommendation: 'Mevcut H1 tag doğru kullanılmış.'
    },
    {
      id: 'seo-2',
      title: 'Resim Alt Attribute',
      description: 'Bazı resimler alt attribute içermiyor.',
      status: 'failed',
      category: 'seo',
      impact: 'medium',
      recommendation: 'Tüm resimler için açıklayıcı alt attribute ekleyin.'
    },
    {
      id: 'seo-3',
      title: 'URL Yapısı',
      description: 'URL yapısı SEO dostu.',
      status: 'passed',
      category: 'seo',
      impact: 'medium',
      recommendation: 'Mevcut URL yapısı uygun.'
    },
    {
      id: 'seo-4',
      title: 'Sitemap.xml',
      description: 'Sitemap.xml mevcut ve doğru formatta.',
      status: 'passed',
      category: 'seo',
      impact: 'medium',
      recommendation: 'Sitemap.xml doğru yapılandırılmış.'
    },
    {
      id: 'performance-1',
      title: 'Sayfa Yükleme Hızı',
      description: 'Sayfa yüklenme hızı düşük. İlk içerik gösterimi 3.2 saniye.',
      status: 'failed',
      category: 'performance',
      impact: 'high',
      recommendation: 'Resimleri optimize edin ve kullanılmayan JavaScript kodlarını kaldırın.'
    },
    {
      id: 'performance-2',
      title: 'Resim Optimizasyonu',
      description: 'Resimler optimize edilmemiş.',
      status: 'failed',
      category: 'performance',
      impact: 'high',
      recommendation: 'Resimleri WebP formatına dönüştürün ve boyutları küçültün.'
    },
    {
      id: 'performance-3',
      title: 'CSS Minify',
      description: 'CSS dosyaları sıkıştırılmış.',
      status: 'passed',
      category: 'performance',
      impact: 'medium',
      recommendation: 'İyi iş! CSS dosyaları optimize edilmiş.'
    },
    {
      id: 'accessibility-1',
      title: 'Renk Kontrastı',
      description: 'Bazı metin öğeleri kontrastı WCAG standartlarına uygun değil.',
      status: 'warning',
      category: 'accessibility',
      impact: 'medium',
      recommendation: 'Metin ve arka plan arasındaki kontrast oranını artırın.'
    },
    {
      id: 'accessibility-2',
      title: 'Klavye Erişilebilirliği',
      description: 'Bazı etkileşimli öğeler klavye ile erişilebilir değil.',
      status: 'failed',
      category: 'accessibility',
      impact: 'high',
      recommendation: 'Tüm buton ve linklerin klavye ile erişilebilir olduğundan emin olun.'
    },
    {
      id: 'best-practices-1',
      title: 'HTTPS Kullanımı',
      description: 'Site HTTPS protokolü kullanıyor.',
      status: 'passed',
      category: 'best-practices',
      impact: 'high',
      recommendation: 'İyi iş! Site güvenli HTTPS protokolü kullanıyor.'
    },
    {
      id: 'best-practices-2',
      title: 'robots.txt',
      description: 'robots.txt dosyası mevcut ve doğru yapılandırılmış.',
      status: 'passed',
      category: 'best-practices',
      impact: 'medium',
      recommendation: 'robots.txt doğru yapılandırılmış.'
    }
  ]
};

// SEO Audit sayfası
const SeoAudit = () => {
  const [loading, setLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [auditResults, setAuditResults] = useState<AuditResult | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // SEO analizi yapacak fonksiyon
  const runSeoAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) return;
    
    setLoading(true);
    // Gerçek bir uygulamada API çağrısı burada yapılır
    setTimeout(() => {
      setAuditResults(mockAuditResult);
      setLoading(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MagnifyingGlassCircleIcon className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">SEO Audit</h1>
        </div>
      </div>
      
      {/* Web site URL girişi ve denetim başlatma formu */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <form onSubmit={runSeoAudit} className="space-y-4">
          <div>
            <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-1">
              Web Sitesi URL'si
            </label>
            <div className="flex space-x-4">
              <input
                type="url"
                id="website-url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                required
                className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Analiz Ediliyor...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassCircleIcon className="-ml-1 mr-2 h-4 w-4" />
                    SEO Analizi Yap
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Web sitenizin SEO sorunlarını ve iyileştirme önerilerini görmek için detaylı analiz yapın.
            </p>
          </div>
        </form>
      </div>
      
      {/* Analiz sonuçları burada gösterilecek */}
      {auditResults && <AuditResultsSection auditResults={auditResults} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
    </div>
  );
};

// Skor kartı bileşeni
const ScoreCard = ({ score, label, icon: Icon, color }: { score: number; label: string; icon: any; color: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-4">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div className="ml-4">
          <div className="flex items-baseline">
            <h3 className="text-xl font-semibold">{score}%</h3>
            <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full bg-${color}-500`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
};

// Analiz sonuçları bileşeni
interface AuditResultsSectionProps {
  auditResults: AuditResult;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const AuditResultsSection = ({ auditResults, activeCategory, setActiveCategory }: AuditResultsSectionProps) => {
  // Kategori simgelerini tanımla
  const categoryIcons: Record<string, React.ComponentType<any>> = {
    'performance': PresentationChartLineIcon,
    'seo': MagnifyingGlassCircleIcon,
    'accessibility': UserIcon,
    'best-practices': CheckCircleIcon,
    'meta': DocumentTextIcon,
  };
  
  // Durum simgelerini ve renklerini tanımla
  const statusConfig = {
    'passed': { icon: CheckCircleIcon, color: 'success', text: 'Geçti' },
    'failed': { icon: XCircleIcon, color: 'error', text: 'Başarısız' },
    'warning': { icon: ExclamationTriangleIcon, color: 'warning', text: 'Uyarı' },
    'info': { icon: InformationCircleIcon, color: 'info', text: 'Bilgi' }
  };
  
  // Etki seviyesi gösterimleri
  const impactLabels = {
    'high': { text: 'Yüksek Etki', color: 'text-error-600' },
    'medium': { text: 'Orta Etki', color: 'text-warning-600' },
    'low': { text: 'Düşük Etki', color: 'text-info-600' }
  };
  
  // Filtrelenmiş öğeleri al
  const filteredItems = auditResults.items.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );
  
  return (
    <div className="space-y-6">
      {/* Skor kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <ScoreCard 
          score={auditResults.totalScore} 
          label="Genel Skor" 
          icon={ChartBarIcon} 
          color="primary" 
        />
        
        {auditResults.categoryScores.map(categoryScore => (
          <ScoreCard 
            key={categoryScore.category}
            score={categoryScore.score}
            label={getCategoryLabel(categoryScore.category)}
            icon={categoryIcons[categoryScore.category] || DocumentTextIcon}
            color={getCategoryColor(categoryScore.category)}
          />
        ))}
      </div>
      
      {/* Kategori sekmeleri */}
      <div className="bg-white rounded-xl shadow-soft-sm p-1 flex space-x-1 overflow-x-auto">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <DocumentTextIcon className="h-4 w-4 mr-2" />
          Tümü
        </button>
        
        {auditResults.categoryScores.map(category => {
          const IconComponent = categoryIcons[category.category] || DocumentTextIcon;
          return (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                activeCategory === category.category
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {getCategoryLabel(category.category)}
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {category.passed}/{category.total}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Sonuç öğeleri */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const status = statusConfig[item.status];
          const impact = impactLabels[item.impact];
          const StatusIcon = status.icon;
          
          return (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl shadow-soft overflow-hidden border-l-4 border-${status.color}-500`}
            >
              <div className="p-5">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-1 rounded-full bg-${status.color}-100`}>
                    <StatusIcon className={`h-5 w-5 text-${status.color}-600`} />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${impact.color}`}>
                        {impact.text}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700">Öneriler:</h4>
                      <p className="mt-1 text-sm text-gray-600">{item.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-soft p-8 text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Sonuç Bulunamadı</h3>
            <p className="mt-1 text-gray-500">Bu kategoride herhangi bir sonuç bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Kategori isimlendirme fonksiyonu
const getCategoryLabel = (category: AuditCategory): string => {
  const labels = {
    'performance': 'Performans',
    'seo': 'SEO',
    'accessibility': 'Erişilebilirlik',
    'best-practices': 'En İyi Uygulamalar',
    'meta': 'Meta Veriler'
  };
  
  return labels[category] || category;
};

// Kategori renk kodları
const getCategoryColor = (category: AuditCategory): string => {
  const colors = {
    'performance': 'success',
    'seo': 'primary',
    'accessibility': 'info',
    'best-practices': 'secondary',
    'meta': 'warning'
  };
  
  return colors[category] || 'gray';
};

export default SeoAudit; 