import { FileText, Clock, Award, Users, TrendingUp, Shield } from 'lucide-react';

const InfoBlocks = () => {
  const blocks = [
    {
      icon: FileText,
      title: 'Что такое негосударственная экспертиза?',
      description: 'Негосударственная экспертиза проектной документации - это независимая оценка соответствия проектной документации требованиям технических регламентов, национальных стандартов и других нормативных документов.'
    },
    {
      icon: Clock,
      title: 'Сроки проведения',
      description: 'Экспертиза проводится в установленные законодательством сроки. Максимальный срок проведения экспертизы не превышает 45 рабочих дней для большинства объектов.'
    },
    {
      icon: Award,
      title: 'Аккредитация и лицензии',
      description: 'Наша организация имеет все необходимые разрешительные документы для проведения негосударственной экспертизы проектной документации и результатов инженерных изысканий.'
    },
    {
      icon: Users,
      title: 'Опытные эксперты',
      description: 'В штате компании работают высококвалифицированные специалисты с многолетним опытом работы в области строительства, проектирования и экспертизы.'
    },
    {
      icon: TrendingUp,
      title: 'Преимущества НГЭ',
      description: 'Негосударственная экспертиза отличается более гибким подходом, оперативностью взаимодействия с заказчиком и возможностью получения консультаций на всех этапах проектирования.'
    },
    {
      icon: Shield,
      title: 'Гарантии качества',
      description: 'Мы несем полную ответственность за качество проведенной экспертизы. Положительное заключение экспертизы является основанием для получения разрешения на строительство.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          О негосударственной экспертизе
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#ffcc00] p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {block.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {block.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfoBlocks;
