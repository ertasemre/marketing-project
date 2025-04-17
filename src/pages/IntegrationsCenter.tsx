import { useState } from 'react';
import {
  CubeIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  LinkIcon,
  PlusCircleIcon,
  TagIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  VideoCameraIcon,
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

// Mock veri
const mockIntegrations: Integration[] = [
  {
    id: 'google_analytics',
    name: 'Google Analytics 4',
    description: 'Web sitesi ziyaretçi analizleri ve davranışları',
    type: 'analytics',
    icon: '/ga4-icon.svg',
    status: 'connected',
    lastSync: '10 dakika önce',
    account: 'MarketingAI Demo Hesabı',
    propertyId: 'UA-12345678-1',
    dataPoints: ['Ziyaretçiler', 'Oturumlar', 'Sayfa Görüntülemeleri', 'Olaylar', 'Dönüşümler'],
    features: [
      'Kullanıcı davranışı analizi',
      'Dönüşüm izleme',
      'Hedef kitle segmentasyonu',
      'Trafik kaynak analizi'
    ]
  },
  {
    id: 'meta_ads',
    name: 'Meta Ads',
    description: 'Facebook ve Instagram reklam kampanyaları ve analizleri',
    type: 'ads',
    icon: '/meta-icon.svg',
    status: 'connected',
    lastSync: '15 dakika önce',
    account: 'MarketingAI Demo Business Manager',
    adAccountId: 'act_1234567890',
    dataPoints: ['Kampanyalar', 'Reklam Setleri', 'Reklamlar', 'Harcama', 'Dönüşümler'],
    features: [
      'Kampanya performans izleme',
      'Reklam seti analizi',
      'Bütçe optimizasyonu',
      'Hedef kitle içe/dışa aktarma'
    ]
  },
  {
    id: 'google_ads',
    name: 'Google Ads',
    description: 'Google arama ve görüntülü reklam kampanyaları',
    type: 'ads',
    icon: '/google-ads-icon.svg',
    status: 'connected',
    lastSync: '20 dakika önce',
    account: 'MarketingAI Demo Google Ads Hesabı',
    adAccountId: '123-456-7890',
    dataPoints: ['Kampanyalar', 'Anahtar Kelimeler', 'Reklamlar', 'Harcama', 'Dönüşümler'],
    features: [
      'Kampanya performans izleme',
      'Anahtar kelime analizi',
      'Bütçe optimizasyonu',
      'Hedef kitle içe/dışa aktarma'
    ]
  },
  {
    id: 'crm',
    name: 'CRM Entegrasyonu',
    description: 'Müşteri veritabanı ve satış verileri',
    type: 'crm',
    icon: '/crm-icon.svg',
    status: 'pending',
    lastSync: '-',
    account: 'MarketingAI Demo CRM',
    dataPoints: ['Müşteriler', 'Satışlar', 'Potansiyel Müşteriler', 'Fırsatlar'],
    features: [
      'Müşteri segmentasyonu',
      'Satış analizi',
      'Müşteri yolculuğu izleme',
      'LTV analizi'
    ]
  },
  {
    id: 'e_commerce',
    name: 'E-Ticaret Platformu',
    description: 'Ürün, envanter ve satış verileri',
    type: 'e-commerce',
    icon: '/ecommerce-icon.svg',
    status: 'error',
    lastSync: '2 gün önce',
    account: 'MarketingAI Demo E-Ticaret',
    dataPoints: ['Ürünler', 'Siparişler', 'Müşteriler', 'Sepet', 'Satışlar'],
    features: [
      'Ürün performans analizi',
      'Sepet terki analizi',
      'Satış trendi',
      'Envanter takibi'
    ],
    error: 'API yetkilendirme hatası. Lütfen yeniden bağlanın.'
  }
];

// Entegrasyon kategorileri
const integrationCategories = [
  { id: 'all', label: 'Tümü', icon: CubeIcon },
  { id: 'analytics', label: 'Analitik', icon: CubeIcon },
  { id: 'ads', label: 'Reklam Platformları', icon: CubeIcon },
  { id: 'crm', label: 'CRM Sistemleri', icon: CubeIcon },
  { id: 'e-commerce', label: 'E-Ticaret', icon: CubeIcon }
];

// Kullanılabilir yeni entegrasyonlar
const availableIntegrations: AvailableIntegration[] = [
  {
    id: 'tiktok_ads',
    name: 'TikTok Ads',
    description: 'TikTok reklam kampanyaları ve performans analizi',
    type: 'ads',
    icon: '/tiktok-icon.svg'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'E-posta pazarlama kampanyaları ve otomasyon',
    type: 'email',
    icon: '/mailchimp-icon.svg'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'E-ticaret platform entegrasyonu',
    type: 'e-commerce',
    icon: '/shopify-icon.svg'
  }
];

// Tip tanımları
type IntegrationType = 'analytics' | 'ads' | 'crm' | 'e-commerce' | 'email';
type IntegrationStatus = 'connected' | 'pending' | 'error' | 'disconnected';

interface Integration {
  id: string;
  name: string;
  description: string;
  type: IntegrationType;
  icon: string;
  status: IntegrationStatus;
  lastSync: string;
  account: string;
  dataPoints: string[];
  features: string[];
  error?: string;
  propertyId?: string;
  adAccountId?: string;
}

interface AvailableIntegration {
  id: string;
  name: string;
  description: string;
  type: IntegrationType;
  icon: string;
}

interface IntegrationCardProps {
  integration: Integration;
  onRefresh: (id: string) => void;
  onDisconnect: (id: string) => void;
  onReconnect: (id: string) => void;
}

interface AvailableIntegrationCardProps {
  integration: AvailableIntegration;
  onConnect: (id: string) => void;
}

interface IntegrationCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  connected: boolean;
  category: 'analytics' | 'ecommerce' | 'marketing' | 'communication' | 'all';
  popular: boolean;
}

const IntegrationCard = ({ integration, onRefresh, onDisconnect, onReconnect }: IntegrationCardProps) => {
  // Destructure only the properties we actually use
  const { id, name, description, status, lastSync, account, dataPoints, error } = integration;
  
  const statusInfo = {
    connected: { 
      label: 'Bağlı', 
      className: 'bg-success-100 text-success-800',
      icon: <CheckCircleIcon className="h-4 w-4 text-success-600 mr-1" />
    },
    pending: { 
      label: 'Beklemede', 
      className: 'bg-warning-100 text-warning-800',
      icon: <ExclamationTriangleIcon className="h-4 w-4 text-warning-600 mr-1" />
    },
    error: { 
      label: 'Hata', 
      className: 'bg-error-100 text-error-800',
      icon: <XCircleIcon className="h-4 w-4 text-error-600 mr-1" />
    },
    disconnected: { 
      label: 'Bağlı Değil', 
      className: 'bg-gray-100 text-gray-800',
      icon: <XCircleIcon className="h-4 w-4 text-gray-500 mr-1" />
    }
  };
  
  const statusData = statusInfo[status] || statusInfo.disconnected;
  
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex">
            <div className="h-12 w-12 rounded-lg bg-gray-100 flex-center">
              {/* Gerçek bir uygulamada icon olarak entegrasyonun logosunu kullanabiliriz */}
              <CubeIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${statusData.className}`}>
                  {statusData.icon}
                  {statusData.label}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          </div>
        </div>
        
        {status === 'connected' && (
          <>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Hesap</p>
                <p className="text-sm font-medium mt-1">{account}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Son Senkronizasyon</p>
                <p className="text-sm font-medium mt-1">{lastSync}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Veri Noktaları</p>
              <div className="flex flex-wrap gap-2">
                {dataPoints.map((dataPoint, index) => (
                  <span key={index} className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                    {dataPoint}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        
        {status === 'error' && (
          <div className="mt-4 bg-error-50 border-l-4 border-error-500 p-3">
            <p className="text-sm text-error-700">{error}</p>
          </div>
        )}
        
        {status === 'pending' && (
          <div className="mt-4 bg-warning-50 border-l-4 border-warning-500 p-3">
            <p className="text-sm text-warning-700">Bağlantı beklemede. Lütfen izin işlemini tamamlayın.</p>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
        <button
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
          onClick={() => status === 'connected' ? window.open('#details', '_blank') : null}
        >
          {status === 'connected' && (
            <>
              Detaylar
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </>
          )}
        </button>
        
        <div className="flex space-x-2">
          {status === 'connected' && (
            <>
              <button
                onClick={() => onRefresh(id)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowPathIcon className="h-3 w-3 mr-1" />
                Yenile
              </button>
              <button
                onClick={() => onDisconnect(id)}
                className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-error-600 hover:bg-error-700"
              >
                <XCircleIcon className="h-3 w-3 mr-1" />
                Bağlantıyı Kes
              </button>
            </>
          )}
          
          {status === 'error' && (
            <button
              onClick={() => onReconnect(id)}
              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <LinkIcon className="h-3 w-3 mr-1" />
              Yeniden Bağlan
            </button>
          )}
          
          {status === 'pending' && (
            <button
              onClick={() => window.open('#authorize', '_blank')}
              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Bağlantıyı Tamamla
            </button>
          )}
          
          {status === 'disconnected' && (
            <button
              onClick={() => onReconnect(id)}
              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <LinkIcon className="h-3 w-3 mr-1" />
              Bağlan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AvailableIntegrationCard = ({ integration, onConnect }: AvailableIntegrationCardProps) => {
  const { id, name, description } = integration;
  
  return (
    <div className="bg-white rounded-xl shadow-soft p-5">
      <div className="flex">
        <div className="h-12 w-12 rounded-lg bg-gray-100 flex-center">
          {/* Gerçek bir uygulamada icon olarak entegrasyonun logosunu kullanabiliriz */}
          <CubeIcon className="h-6 w-6 text-gray-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          
          <div className="mt-4">
            <button
              onClick={() => onConnect(id)}
              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <LinkIcon className="h-3 w-3 mr-1" />
              Bağlan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegrationsCenter = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'analytics' | 'ecommerce' | 'marketing' | 'communication'>('all');
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportFormData, setSupportFormData] = useState({
    name: '',
    email: '',
    phone: '',
    integration: '',
    description: '',
    preferredContact: 'email'
  });

  // Örnek entegrasyonlar
  const integrations: IntegrationCard[] = [
    {
      id: 'ga4',
      title: 'Google Analytics 4',
      description: 'Web sitesi ve uygulama analitik verilerini takip edin',
      icon: ChartBarIcon,
      connected: true,
      category: 'analytics',
      popular: true
    },
    {
      id: 'gtm',
      title: 'Google Tag Manager',
      description: 'Tüm etiketlerinizi tek bir yerden yönetin',
      icon: TagIcon,
      connected: true,
      category: 'analytics',
      popular: true
    },
    {
      id: 'fb-pixel',
      title: 'Facebook Pixel',
      description: 'Facebook reklamlarınızın performansını ölçün',
      icon: ChartBarIcon,
      connected: false,
      category: 'marketing',
      popular: true
    },
    {
      id: 'shopify',
      title: 'Shopify',
      description: 'E-ticaret mağazanızı entegre edin',
      icon: ShoppingCartIcon,
      connected: false,
      category: 'ecommerce',
      popular: true
    },
    {
      id: 'woo',
      title: 'WooCommerce',
      description: 'WordPress e-ticaret platformunu entegre edin',
      icon: ShoppingCartIcon,
      connected: false,
      category: 'ecommerce',
      popular: false
    },
    {
      id: 'mailchimp',
      title: 'Mailchimp',
      description: 'E-posta pazarlama kampanyalarınızı yönetin',
      icon: EnvelopeIcon,
      connected: true,
      category: 'marketing',
      popular: false
    },
    {
      id: 'intercom',
      title: 'Intercom',
      description: 'Müşteri mesajlaşma platformunu entegre edin',
      icon: ChatBubbleLeftRightIcon,
      connected: false,
      category: 'communication',
      popular: false
    },
    {
      id: 'twilio',
      title: 'Twilio',
      description: 'SMS ve telefon entegrasyonlarını yönetin',
      icon: DevicePhoneMobileIcon,
      connected: false,
      category: 'communication',
      popular: false
    }
  ];

  // Filtrelenmiş entegrasyonlar
  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeCategory);

  // Form verilerini güncelle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSupportFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Destek formu gönderimi
  const handleSupportFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada API'ye form verileri gönderilebilir
    alert('Destek talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz!');
    setShowSupportForm(false);
    setSupportFormData({
      name: '',
      email: '',
      phone: '',
      integration: '',
      description: '',
      preferredContact: 'email'
    });
  };

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Entegrasyonlar</h1>
        
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Entegrasyon Ekle
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <ArrowPathIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Yenile
          </button>
        </div>
      </div>

      {/* Entegrasyon Destek Alanı */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-medium text-blue-900 dark:text-blue-300">Entegrasyon Desteği</h2>
            <p className="mt-2 text-blue-700 dark:text-blue-400">
              Entegrasyonları kurmakta zorluk mu yaşıyorsunuz? Endişelenmeyin, uzman ekibimiz size yardımcı olmak için hazır.
              Hem teknik destek hem de adım adım rehberlik sunuyoruz.
            </p>
            
            {!showSupportForm ? (
              <button
                onClick={() => setShowSupportForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Destek İste
              </button>
            ) : (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-5 border border-blue-100 dark:border-blue-800">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Destek Formu</h3>
                <form onSubmit={handleSupportFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Adınız Soyadınız*
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={supportFormData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        E-posta Adresiniz*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={supportFormData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Telefon Numaranız
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={supportFormData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="integration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Entegrasyon Tipi*
                      </label>
                      <select
                        name="integration"
                        id="integration"
                        required
                        value={supportFormData.integration}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Entegrasyon seçin</option>
                        {integrations.map(integration => (
                          <option key={integration.id} value={integration.id}>{integration.title}</option>
                        ))}
                        <option value="other">Diğer</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Yaşadığınız Sorun veya İhtiyacınız*
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      required
                      value={supportFormData.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Entegrasyon sürecinde karşılaştığınız sorunları veya ihtiyaçlarınızı detaylı bir şekilde anlatın..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tercih Ettiğiniz İletişim Yöntemi
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="contact-email"
                          name="preferredContact"
                          type="radio"
                          checked={supportFormData.preferredContact === 'email'}
                          value="email"
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="contact-email" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          E-posta ile
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="contact-phone"
                          name="preferredContact"
                          type="radio"
                          checked={supportFormData.preferredContact === 'phone'}
                          value="phone"
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="contact-phone" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Telefon ile
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="contact-video"
                          name="preferredContact"
                          type="radio"
                          checked={supportFormData.preferredContact === 'video'}
                          value="video"
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="contact-video" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Video görüşmesi
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowSupportForm(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Destek Talebi Gönder
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-500 dark:text-blue-400">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <p className="ml-2 text-sm text-blue-700 dark:text-blue-400">
                  Telefon Desteği
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-500 dark:text-blue-400">
                  <VideoCameraIcon className="h-5 w-5" />
                </div>
                <p className="ml-2 text-sm text-blue-700 dark:text-blue-400">
                  Video Görüşmesi
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-500 dark:text-blue-400">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <p className="ml-2 text-sm text-blue-700 dark:text-blue-400">
                  Planlı Oturumlar
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-500 dark:text-blue-400">
                  <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                </div>
                <p className="ml-2 text-sm text-blue-700 dark:text-blue-400">
                  Canlı Sohbet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kategoriler */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeCategory === 'all'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setActiveCategory('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeCategory === 'analytics'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Analitik
          </button>
          <button
            onClick={() => setActiveCategory('ecommerce')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeCategory === 'ecommerce'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            E-Ticaret
          </button>
          <button
            onClick={() => setActiveCategory('marketing')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeCategory === 'marketing'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Pazarlama
          </button>
          <button
            onClick={() => setActiveCategory('communication')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeCategory === 'communication'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            İletişim
          </button>
        </nav>
      </div>

      {/* Entegrasyonlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <integration.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{integration.title}</h3>
                    {integration.popular && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                        Popüler
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{integration.description}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                {integration.connected ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Bağlı
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Bağlı Değil
                  </span>
                )}
                
                <button 
                  className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                    integration.connected
                      ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                      : 'text-primary-700 bg-primary-100 hover:bg-primary-200 dark:text-primary-300 dark:bg-primary-900/30 dark:hover:bg-primary-900/50'
                  }`}
                >
                  {integration.connected ? 'Yönet' : 'Bağlan'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Entegrasyon Yardım Bölümü */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Entegrasyon Yardımı</h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
              <p>
                Entegrasyonları kurmak için yardıma mı ihtiyacınız var? Detaylı rehberlerimize göz atın veya destek ekibimizle iletişime geçin.
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-200">Google Analytics 4 Entegrasyon Rehberi</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-200">Facebook Pixel Kurulum Kılavuzu</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-200">E-Ticaret Platformu Bağlantı Adımları</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsCenter; 