import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold mb-4">ЭПЦ</div>
            <p className="text-gray-400">
              Экспертно-проектный центр
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Негосударственная экспертиза проектной документации и результатов инженерных изысканий
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/services/project-documentation" className="hover:text-[#ffcc00] transition-colors">
                  Экспертиза проектной документации
                </Link>
              </li>
              <li>
                <Link to="/services/engineering-surveys" className="hover:text-[#ffcc00] transition-colors">
                  Экспертиза инженерных изысканий
                </Link>
              </li>
              <li>
                <Link to="/services/cost-estimates" className="hover:text-[#ffcc00] transition-colors">
                  Экспертиза сметной документации
                </Link>
              </li>
              <li>
                <Link to="/services/expert-support" className="hover:text-[#ffcc00] transition-colors">
                  Экспертное сопровождение
                </Link>
              </li>
              <li>
                <Link to="/services/judicial-expertise" className="hover:text-[#ffcc00] transition-colors">
                  Судебная экспертиза
                </Link>
              </li>
              <li>
                <Link to="/services/design-and-surveys" className="hover:text-[#ffcc00] transition-colors">
                  Проектирование и изыскания
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>+7 913 634 8192</li>
              <li>expert.p.c@mail.ru</li>
              <li>г. Омск, ул. Голика, д. 2, оф. 37</li>
              <li>Пн-Пт: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 ЭПЦ. Все права защищены.</p>
          <Link to="/admin" className="text-gray-600 hover:text-gray-500 text-xs mt-2 inline-block">
            Админ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
