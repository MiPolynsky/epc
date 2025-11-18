import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">
          Страница не найдена
        </h2>
        <p className="text-gray-600 mb-8">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
        >
          <Home className="w-5 h-5" />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
