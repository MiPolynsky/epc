import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/servicesData';

const ServicesOverview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#ffcc00] group"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-[#ffcc00] p-3 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black ml-4 md:hidden">
                    {service.title}
                  </h3>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black hidden md:block">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 hidden md:block">
                  {service.description}
                </p>
                <div className="flex items-center text-black text-sm font-medium">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-[#ffcc00] text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Все услуги
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
