import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
  BoltIcon
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [integrations] = useState<Integration[]>(mockIntegrations);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportFormData, setSupportFormData] = useState({
    name: '',
    email: '',
    phone: '',
    integration: '',
    description: '',
    preferredContact: 'email'
  });
   
  const connectedIntegrations = integrations.filter(
    integration => integration.status === 'connected'
  );
   
  // Filter integrations based on selected category
  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.type === selectedCategory);
   
  const filteredAvailableIntegrations = selectedCategory === 'all'
    ? availableIntegrations
    : availableIntegrations.filter(integration => integration.type === selectedCategory);
   
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
    setShowSupportModal(false);
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

  // Destek kanalını seç
  const selectSupportChannel = (channel: string) => {
    alert(`${channel} kanalı üzerinden en kısa sürede sizinle iletişime geçeceğiz.`);
    setShowSupportModal(false);
  };

  // Handler functions
  const handleConnect = (id: string) => {
    console.log(`Connecting to ${id}`);
    // Implement connection logic here
  };
   
  const handleRefresh = (id: string) => {
    console.log(`Refreshing data for ${id}`);
    // Implement refresh logic here
  };
   
  const handleDisconnect = (id: string) => {
    console.log(`Disconnecting ${id}`);
    // Implement disconnect logic here
  };
   
  const handleReconnect = (id: string) => {
    console.log(`Reconnecting ${id}`);
    // Implement reconnect logic here
  };
   
  // Render connected integrations
  const renderConnectedIntegrations = () => {
    if (filteredIntegrations.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">Bu kategoride bağlı entegrasyon bulunamadı.</p>
        </div>
      );
    }
     
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration: Integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onRefresh={handleRefresh}
            onDisconnect={handleDisconnect}
            onReconnect={handleReconnect}
          />
        ))}
      </div>
    );
  };
   
  // Render available integrations
  const renderAvailableIntegrations = () => {
    if (filteredAvailableIntegrations.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">Bu kategoride kullanılabilir entegrasyon bulunamadı.</p>
        </div>
      );
    }
     
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAvailableIntegrations.map((integration) => (
          <AvailableIntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={handleConnect}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CubeIcon className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Entegrasyon Merkezi</h1>
        </div>
          
        <button
          onClick={() => {}}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Yeni Entegrasyon Ekle
        </button>
      </div>

      {/* Kompakt Entegrasyon Destek Alanı */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-medium text-blue-900 dark:text-blue-300">Entegrasyon Desteği</h2>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Entegrasyonları kurmakta zorluk mu yaşıyorsunuz? Uzman ekibimiz size yardımcı olmak için hazır.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSupportModal(true)}
            className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Destek İste
          </button>
        </div>
      </div>

      {/* Modal for Integration Support */}
      <Transition.Root show={showSupportModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowSupportModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                      <PlusCircleIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                        Entegrasyon Desteği
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Entegrasyonlarla ilgili yardıma mı ihtiyacınız var? Aşağıdaki formu doldurun, ekibimiz size yardımcı olmak için en kısa sürede iletişime geçecektir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSupportFormSubmit} className="mt-6 space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-700">Kişisel Bilgiler</h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Adınız
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={supportFormData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="Adınız Soyadınız"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-posta
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={supportFormData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="ornek@sirket.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={supportFormData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                    </div>

                    {/* Support Request Details */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-sm font-medium text-gray-700">Destek Talebi Detayları</h4>
                      <div>
                        <label htmlFor="integrationType" className="block text-sm font-medium text-gray-700">
                          Entegrasyon Türü
                        </label>
                        <select
                          id="integrationType"
                          name="integrationType"
                          value={supportFormData.integration}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          required
                        >
                          <option value="">Seçiniz</option>
                          {mockIntegrations.map((integration) => (
                            <option key={integration.id} value={integration.type}>
                              {integration.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Sorun Açıklaması
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={supportFormData.description}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Sorun hakkında detaylı bilgi veriniz..."
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Preferences */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-sm font-medium text-gray-700">İletişim Tercihi</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="contactEmail"
                            name="preferredContact"
                            type="radio"
                            checked={supportFormData.preferredContact === 'email'}
                            onChange={() => selectSupportChannel('email')}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="contactEmail" className="ml-3 block text-sm font-medium text-gray-700">
                            E-posta ile iletişim
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="contactPhone"
                            name="preferredContact"
                            type="radio"
                            checked={supportFormData.preferredContact === 'phone'}
                            onChange={() => selectSupportChannel('phone')}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="contactPhone" className="ml-3 block text-sm font-medium text-gray-700">
                            Telefon ile iletişim
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="contactVideo"
                            name="preferredContact"
                            type="radio"
                            checked={supportFormData.preferredContact === 'video'}
                            onChange={() => selectSupportChannel('video')}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="contactVideo" className="ml-3 block text-sm font-medium text-gray-700">
                            Video görüşmesi
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                      >
                        Destek Talebi Oluştur
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setShowSupportModal(false)}
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Kategoriler */}
      <div className="bg-white rounded-xl shadow-soft-sm p-1 flex overflow-x-auto">
        {integrationCategories.map((category) => (
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
            <CubeIcon className="h-6 w-6 text-primary-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{integrations.length}</h3>
            <p className="text-sm text-gray-500">Toplam Entegrasyon</p>
          </div>
        </div>
          
        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-success-50 p-3 rounded-lg">
            <CheckCircleIcon className="h-6 w-6 text-success-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">
              {connectedIntegrations.length}
            </h3>
            <p className="text-sm text-gray-500">Aktif Bağlantı</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-error-50 p-3 rounded-lg">
            <ExclamationTriangleIcon className="h-6 w-6 text-error-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">
              {integrations.filter(i => i.status === 'error').length}
            </h3>
            <p className="text-sm text-gray-500">Bağlantı Hatası</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-primary-50 p-3 rounded-lg">
            <BoltIcon className="h-6 w-6 text-primary-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">
              {availableIntegrations.length}
            </h3>
            <p className="text-sm text-gray-500">Kullanılabilir</p>
          </div>
        </div>
      </div>
       
      {/* Entegrasyonlar Listesi */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mevcut Entegrasyonlar</h2>
         
        {renderConnectedIntegrations()}
         
        {filteredIntegrations.length === 0 && (
          <div className="bg-white rounded-xl shadow-soft p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CubeIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Entegrasyon Bulunamadı</h3>
            <p className="mt-2 text-gray-500">
              Seçilen kategoride entegrasyon bulunmuyor. Başka bir kategori seçin veya yeni bir entegrasyon ekleyin.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100"
            >
              Tüm Entegrasyonları Göster
            </button>
          </div>
        )}
      </div>
       
      {/* Kullanılabilir Entegrasyonlar */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Kullanılabilir Entegrasyonlar</h2>
         
        {renderAvailableIntegrations()}
      </div>
    </div>
  );
};

export default IntegrationsCenter; 