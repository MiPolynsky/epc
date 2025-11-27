import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Phone, Mail } from 'lucide-react';
import { services } from '../data/servicesData';

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Услуга не найдена</h1>
          <Link to="/services" className="text-blue-600 hover:underline">
            Вернуться к списку услуг
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16" style={{ backgroundColor: '#ffcc00' }}>
        <div className="container mx-auto px-4">
          <Link
            to="/services"
            className="inline-flex items-center text-black hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад к услугам
          </Link>
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                <Icon className="w-10 h-10 text-black" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-black">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Описание услуги</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {service.fullDescription || service.description}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Что входит в услугу:</h3>
              <div className="space-y-4">
                {service.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#ffcc00] mr-3 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Процесс работы</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Подача заявки</h3>
                    <p className="text-gray-600">
                      Вы подаете заявку с необходимым пакетом документов
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Заключение договора</h3>
                    <p className="text-gray-600">
                      Мы заключаем договор и согласовываем сроки выполнения работ
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Проведение экспертизы</h3>
                    <p className="text-gray-600">
                      Наши эксперты проводят всестороннюю проверку документации
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Выдача заключения</h3>
                    <p className="text-gray-600">
                      Вы получаете официальное заключение экспертизы
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Заказать услугу</h3>
              <p className="text-gray-600 mb-6">
                Свяжитесь с нами для получения консультации и расчета стоимости
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+79136348192"
                  className="flex items-center text-gray-700 hover:text-[#ffcc00] transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +7 913 634 8192
                </a>
                <a
                  href="mailto:info@epc-expert.ru"
                  className="flex items-center text-gray-700 hover:text-[#ffcc00] transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  info@epc-expert.ru
                </a>
              </div>

              <Link
                to="/contacts"
                className="block w-full mt-6 px-6 py-3 bg-[#ffcc00] text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors text-center"
              >
                Оставить заявку
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Преимущества работы с нами</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-[#ffcc00] mr-2">✓</span>
                  <span>Более 10 лет на рынке</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ffcc00] mr-2">✓</span>
                  <span>500+ выполненных проектов</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ffcc00] mr-2">✓</span>
                  <span>Квалифицированные эксперты</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ffcc00] mr-2">✓</span>
                  <span>Соблюдение сроков</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ffcc00] mr-2">✓</span>
                  <span>Конкурентные цены</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
