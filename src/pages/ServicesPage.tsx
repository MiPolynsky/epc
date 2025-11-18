import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/servicesData';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16" style={{ backgroundColor: '#ffcc00' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-4">
            Наши услуги
          </h1>
          <p className="text-xl text-black text-center max-w-3xl mx-auto">
            Полный спектр экспертных услуг в области строительства и проектирования
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#ffcc00] rounded-lg flex items-center justify-center">
                        <Icon className="w-8 h-8 text-black" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Что входит в услугу:
                        </h3>
                        <ul className="space-y-2">
                          {service.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#ffcc00] mr-2">✓</span>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center text-black hover:text-gray-700 font-medium transition-colors"
                      >
                        Подробнее об услуге
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ffcc00] mb-2">500+</div>
              <p className="text-gray-600">Заключений выдано</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ffcc00] mb-2">10+</div>
              <p className="text-gray-600">Лет на рынке</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ffcc00] mb-2">100%</div>
              <p className="text-gray-600">Качество работы</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
