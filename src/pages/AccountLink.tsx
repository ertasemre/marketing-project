import { useState } from 'react';

type ConnectedAccount = {
  id: string;
  platform: 'google' | 'meta' | 'criteo';
  accountName: string;
  status: 'active' | 'expired' | 'error';
  connectedAt: string;
  lastSync?: string;
};

const AccountLink = () => {
  // Demo bağlı hesaplar
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([
    {
      id: '1',
      platform: 'google',
      accountName: 'Demo Google Ads',
      status: 'active',
      connectedAt: '2023-01-15T10:30:00Z',
      lastSync: '2023-04-14T08:45:00Z',
    },
    {
      id: '2',
      platform: 'meta',
      accountName: 'Demo Meta Ads',
      status: 'active',
      connectedAt: '2023-02-20T14:15:00Z',
      lastSync: '2023-04-13T16:20:00Z',
    }
  ]);
  
  const [loading, setLoading] = useState<{
    google: boolean;
    meta: boolean;
    criteo: boolean;
  }>({
    google: false,
    meta: false,
    criteo: false
  });

  // Platform bağlama işlevleri (gerçekte OAuth bağlantıları olacak)
  const handleConnectGoogle = async () => {
    setLoading(prev => ({ ...prev, google: true }));
    
    try {
      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Hesap zaten bağlı mı kontrol et
      const isConnected = connectedAccounts.some(account => account.platform === 'google');
      
      if (!isConnected) {
        // Yeni hesap ekle
        const newAccount: ConnectedAccount = {
          id: (connectedAccounts.length + 1).toString(),
          platform: 'google',
          accountName: 'Yeni Google Ads Hesabı',
          status: 'active',
          connectedAt: new Date().toISOString(),
          lastSync: new Date().toISOString(),
        };
        
        setConnectedAccounts(prev => [...prev, newAccount]);
      }
    } catch (error) {
      console.error('Google hesabı bağlanırken hata:', error);
    } finally {
      setLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleConnectMeta = async () => {
    setLoading(prev => ({ ...prev, meta: true }));
    
    try {
      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Hesap zaten bağlı mı kontrol et
      const isConnected = connectedAccounts.some(account => account.platform === 'meta');
      
      if (!isConnected) {
        // Yeni hesap ekle
        const newAccount: ConnectedAccount = {
          id: (connectedAccounts.length + 1).toString(),
          platform: 'meta',
          accountName: 'Yeni Meta Ads Hesabı',
          status: 'active',
          connectedAt: new Date().toISOString(),
          lastSync: new Date().toISOString(),
        };
        
        setConnectedAccounts(prev => [...prev, newAccount]);
      }
    } catch (error) {
      console.error('Meta hesabı bağlanırken hata:', error);
    } finally {
      setLoading(prev => ({ ...prev, meta: false }));
    }
  };

  const handleConnectCriteo = async () => {
    setLoading(prev => ({ ...prev, criteo: true }));
    
    try {
      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Hesap zaten bağlı mı kontrol et
      const isConnected = connectedAccounts.some(account => account.platform === 'criteo');
      
      if (!isConnected) {
        // Yeni hesap ekle
        const newAccount: ConnectedAccount = {
          id: (connectedAccounts.length + 1).toString(),
          platform: 'criteo',
          accountName: 'Yeni Criteo Hesabı',
          status: 'active',
          connectedAt: new Date().toISOString(),
          lastSync: new Date().toISOString(),
        };
        
        setConnectedAccounts(prev => [...prev, newAccount]);
      }
    } catch (error) {
      console.error('Criteo hesabı bağlanırken hata:', error);
    } finally {
      setLoading(prev => ({ ...prev, criteo: false }));
    }
  };

  const handleDisconnectAccount = (accountId: string) => {
    setConnectedAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  // Tarih formatını düzenlemek için yardımcı işlev
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Platform simgesini almak için yardımcı işlev
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
          </svg>
        );
      case 'meta':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case 'criteo':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hesap Bağlama</h1>
        <p className="mt-1 text-sm text-gray-500">
          Reklam platformu hesaplarınızı bağlayın ve analiz başlatın.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Google Ads bağlantı kartı */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                {getPlatformIcon('google')}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Google Ads</h3>
              <p className="text-sm text-gray-500">
                {connectedAccounts.some(account => account.platform === 'google') 
                  ? 'Bağlı'
                  : 'Kampanyalarınızı analiz edin'}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleConnectGoogle}
              disabled={loading.google}
              className="w-full btn btn-primary"
            >
              {loading.google 
                ? 'Bağlanıyor...' 
                : connectedAccounts.some(account => account.platform === 'google')
                  ? 'Yeniden Bağlan'
                  : 'Bağlan'}
            </button>
          </div>
        </div>

        {/* Meta Ads bağlantı kartı */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                {getPlatformIcon('meta')}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Meta Ads</h3>
              <p className="text-sm text-gray-500">
                {connectedAccounts.some(account => account.platform === 'meta') 
                  ? 'Bağlı'
                  : 'Facebook/Instagram kampanyalarınızı analiz edin'}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleConnectMeta}
              disabled={loading.meta}
              className="w-full btn btn-primary"
            >
              {loading.meta 
                ? 'Bağlanıyor...' 
                : connectedAccounts.some(account => account.platform === 'meta')
                  ? 'Yeniden Bağlan'
                  : 'Bağlan'}
            </button>
          </div>
        </div>

        {/* Criteo bağlantı kartı */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                {getPlatformIcon('criteo')}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Criteo</h3>
              <p className="text-sm text-gray-500">
                {connectedAccounts.some(account => account.platform === 'criteo') 
                  ? 'Bağlı'
                  : 'Yeniden hedefleme kampanyalarınızı analiz edin'}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleConnectCriteo}
              disabled={loading.criteo}
              className="w-full btn btn-primary"
            >
              {loading.criteo 
                ? 'Bağlanıyor...' 
                : connectedAccounts.some(account => account.platform === 'criteo')
                  ? 'Yeniden Bağlan'
                  : 'Bağlan'}
            </button>
          </div>
        </div>
      </div>

      {/* Bağlı hesaplar listesi */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Bağlı Hesaplar</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Platformlarınızdan veri alabilmek için aktif bağlantılarınız
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hesap Adı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bağlantı Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Son Senkronizasyon
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {connectedAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      Henüz bağlı hesap bulunmuyor.
                    </td>
                  </tr>
                ) : (
                  connectedAccounts.map((account) => (
                    <tr key={account.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 text-gray-700">
                            {getPlatformIcon(account.platform)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {account.platform === 'google' ? 'Google Ads' : 
                               account.platform === 'meta' ? 'Meta Ads' : 'Criteo'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{account.accountName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          account.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : account.status === 'expired'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {account.status === 'active'
                            ? 'Aktif'
                            : account.status === 'expired'
                            ? 'Süresi Dolmuş'
                            : 'Hata'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(account.connectedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.lastSync ? formatDate(account.lastSync) : 'Hiç senkronize edilmedi'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleDisconnectAccount(account.id)}
                          className="text-red-600 hover:text-red-900 ml-4"
                        >
                          Bağlantıyı Kes
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLink; 