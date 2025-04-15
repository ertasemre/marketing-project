import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRightIcon, CheckIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Reklam Hesaplarını Tek Yerden Yönetin',
    description: 'Tüm reklam hesaplarınızı tek bir platformdan yönetin, zaman kazanın.'
  },
  {
    title: 'Yapay Zeka Destekli Kreatif Üretimi',
    description: 'Yapay zeka ile hedef kitlenize uygun reklamlar oluşturun ve test edin.'
  },
  {
    title: 'Detaylı Performans Analizleri',
    description: 'Kampanyalarınızın performansını gerçek zamanlı olarak takip edin ve optimize edin.'
  },
  {
    title: 'Otomatik Bütçe Optimizasyonu',
    description: 'Bütçenizin en verimli şekilde harcanmasını sağlayan akıllı algoritmalar.'
  }
];

const testimonials = [
  {
    quote: "MarketingAI sayesinde reklam kampanyalarımızın ROI'si %40 arttı. Artık daha az eforla daha fazla sonuç alıyoruz.",
    author: "Mehmet Yılmaz",
    role: "Pazarlama Müdürü, TechCo"
  },
  {
    quote: "Yapay zeka destekli kreatif üretimi sayesinde hedef kitlemize daha doğru içeriklerle ulaşabiliyoruz.",
    author: "Ayşe Kaya",
    role: "Dijital Pazarlama Uzmanı, E-Ticaret A.Ş."
  }
];

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text">MarketingAI</span>
              </a>
            </div>
            
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="sr-only">Menüyü aç</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-10">
              <a href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Özellikler
              </a>
              <a href="#testimonials" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Referanslar
              </a>
              <a href="#pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Fiyatlandırma
              </a>
            </nav>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Giriş Yap
              </Link>
              <Link
                to="/signup"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Ücretsiz Başla
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? 'fixed inset-0 z-50 overflow-hidden' : 'hidden'
          }`}
          aria-labelledby="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsMenuOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 id="mobile-menu" className="text-lg font-medium text-gray-900">
                      Menü
                    </h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="sr-only">Menüyü kapat</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  <div className="space-y-6">
                    <a
                      href="#features"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Özellikler
                    </a>
                    <a
                      href="#testimonials"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Referanslar
                    </a>
                    <a
                      href="#pricing"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Fiyatlandırma
                    </a>
                    
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-700 bg-primary-50 hover:bg-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        to="/signup"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Ücretsiz Başla
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
              <div className="sm:text-center lg:text-left px-4 sm:px-8 xl:pr-16">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block">Dijital reklamlarınızı</span>
                  <span className="block text-primary-600">yapay zeka ile yönetin</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  MarketingAI ile reklam kampanyalarınızı daha akıllı, daha etkili ve daha verimli hale getirin. Yapay zeka destekli araçlarımızla dijital pazarlama stratejinizi bir üst seviyeye taşıyın.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Ücretsiz Başla
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                    >
                      <span>Demo İzle</span>
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Marketing dashboard on computer"
          />
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Özellikler</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Pazarlama stratejinizi yeniden keşfedin
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Reklamlarınızı yapay zeka ile optimize edin, performansı artırın ve daha iyi sonuçlar elde edin.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-soft">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 bg-white overflow-hidden md:py-20 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="text-center">
              <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Müşteri Yorumları</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Müşterilerimiz ne diyor?
              </p>
            </div>
            <div className="mt-20">
              <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl px-8 py-10 shadow-soft-lg">
                    <p className="text-xl text-gray-900 italic">"{testimonial.quote}"</p>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 font-medium text-lg">
                            {testimonial.author.split(' ').map(name => name[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-medium text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Fiyatlandırma</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              İşletmenize uygun planı seçin
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Tüm planlar 14 günlük ücretsiz deneme süresi içerir.
            </p>
          </div>

          <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Başlangıç</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">₺399</span>
                  <span className="ml-1 text-xl font-semibold">/ay</span>
                </p>
                <p className="mt-6 text-gray-500">Küçük işletmeler için ideal başlangıç çözümü.</p>

                <ul role="list" className="mt-6 space-y-6">
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">5 reklam hesabı bağlantısı</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Aylık 50 AI kreatif oluşturma</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Temel analitik raporları</span>
                  </li>
                </ul>
              </div>

              <a
                href="#"
                className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-primary-700 bg-primary-50 hover:bg-primary-100"
              >
                14 gün ücretsiz deneyin
              </a>
            </div>

            <div className="relative flex flex-col rounded-2xl border border-primary-500 bg-white p-8 shadow-soft-lg">
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary-500 text-white">
                  En popüler
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">İşletme</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">₺999</span>
                  <span className="ml-1 text-xl font-semibold">/ay</span>
                </p>
                <p className="mt-6 text-gray-500">Büyüyen işletmeler için tam kapsamlı çözüm.</p>

                <ul role="list" className="mt-6 space-y-6">
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">15 reklam hesabı bağlantısı</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Aylık 200 AI kreatif oluşturma</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Gelişmiş analitik ve raporlama</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Otomatik bütçe optimizasyonu</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Öncelikli destek</span>
                  </li>
                </ul>
              </div>

              <a
                href="#"
                className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                14 gün ücretsiz deneyin
              </a>
            </div>

            <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Kurumsal</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">₺2999</span>
                  <span className="ml-1 text-xl font-semibold">/ay</span>
                </p>
                <p className="mt-6 text-gray-500">Büyük işletmeler ve ajanslar için özel çözüm.</p>

                <ul role="list" className="mt-6 space-y-6">
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Sınırsız reklam hesabı bağlantısı</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Sınırsız AI kreatif oluşturma</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Özel API entegrasyonları</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Özel analitik çözümleri</span>
                  </li>
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-success-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">Özel müşteri yöneticisi</span>
                  </li>
                </ul>
              </div>

              <a
                href="#"
                className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-primary-700 bg-primary-50 hover:bg-primary-100"
              >
                Bizimle iletişime geçin
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-primary-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Dijital pazarlamada devrim</span>
            <span className="block">Bugün MarketingAI'ye katılın</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-100">
            14 gün ücretsiz deneme, kurulum gerekmez, kredi kartı gerekmez.
          </p>
          <Link
            to="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 sm:w-auto"
          >
            Hemen başlayın
            <ArrowRightIcon className="ml-3 h-5 w-5 text-primary-500" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Hakkımızda
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Destek
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                İletişim
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Gizlilik Politikası
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Kullanım Şartları
              </a>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-500">&copy; 2023 MarketingAI. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 