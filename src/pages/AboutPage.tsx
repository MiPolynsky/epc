import { Building2, Users, Award, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white">
      <section className="py-16" style={{ backgroundColor: '#ffcc00' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-center text-black mb-4">
            ООО "Экспертно-проектный центр"
          </h1>
          <p className="text-lg md:text-xl text-center text-black max-w-3xl mx-auto font-light">
            надежный партнер в области негосударственной экспертизы проектной документации
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Наша компания</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Экспертно-проектный центр является аккредитованной организацией по проведению негосударственной экспертизы проектной документации и результатов инженерных изысканий. С 2015 года мы предоставляем профессиональные экспертные услуги для объектов капитального строительства различного назначения.
              </p>
              <p>
                Наша команда состоит из высококвалифицированных специалистов с большим опытом работы в строительной отрасли. Мы обладаем всеми необходимыми аттестациями и лицензиями для проведения экспертизы на территории Российской Федерации.
              </p>
              <p>
                За годы работы мы выполнили более 500 экспертиз, охватывающих жилые, общественные, промышленные и специальные объекты. Наши клиенты - это застройщики, проектные организации, государственные и частные компании, которые доверяют нам проверку качества и безопасности своих проектов.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Опыт</h3>
              <p className="text-gray-600">
                Более 10 лет на рынке негосударственной экспертизы
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Профессионализм</h3>
              <p className="text-gray-600">
                Команда аттестованных экспертов с профильным образованием
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Аккредитация</h3>
              <p className="text-gray-600">
                Полный пакет документов и аттестаций для проведения экспертизы
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Качество</h3>
              <p className="text-gray-600">
                Детальная проверка документации с учетом всех требований
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Наши ценности</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold mb-2">Профессионализм</h3>
                <p className="text-gray-700">
                  Мы постоянно повышаем квалификацию наших специалистов и следим за изменениями в законодательстве и нормативных документах.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold mb-2">Независимость</h3>
                <p className="text-gray-700">
                  Мы проводим объективную и беспристрастную экспертизу, руководствуясь исключительно требованиями законодательства и технических регламентов.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold mb-2">Ответственность</h3>
                <p className="text-gray-700">
                  Мы несем полную ответственность за качество выполняемых работ и имеем страховку профессиональной ответственности.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold mb-2">Клиентоориентированность</h3>
                <p className="text-gray-700">
                  Мы стремимся к долгосрочному сотрудничеству и всегда готовы предложить оптимальные решения для наших клиентов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Наши достижения</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-5xl font-bold text-black mb-2">500+</div>
                <p className="text-gray-600">Выполненных экспертиз</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-2">10+</div>
                <p className="text-gray-600">Лет на рынке</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-2">100%</div>
                <p className="text-gray-600">Удовлетворенность клиентов</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
