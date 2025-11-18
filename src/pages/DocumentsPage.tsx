import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentsPage = () => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate('/contacts');
    setTimeout(() => {
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const downloadableDocuments = [
    {
      name: 'Форма заявки на проведение экспертизы',
      format: 'DOC',
      size: '45 KB'
    },
    {
      name: 'Перечень необходимых документов',
      format: 'PDF',
      size: '120 KB'
    },
    {
      name: 'Образец договора на оказание услуг',
      format: 'PDF',
      size: '250 KB'
    },
    {
      name: 'Прайс-лист на услуги экспертизы',
      format: 'PDF',
      size: '180 KB'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16" style={{ backgroundColor: '#ffcc00' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-4">
            Документы
          </h1>
          <p className="text-xl text-black text-center max-w-3xl mx-auto">
            Нормативные документы, лицензии и аккредитации нашего центра
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Документы для скачивания
          </h2>
          <p className="text-gray-600 mb-8">
            Формы и образцы документов для заказчиков экспертизы
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {downloadableDocuments.map((doc, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#ffcc00] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">
                        {doc.format} • {doc.size}
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#ffcc00] text-black rounded hover:bg-yellow-500 transition-colors">
                    Скачать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Нужна консультация по документам?
          </h2>
          <p className="text-gray-300 mb-6">
            Наши специалисты помогут разобраться с необходимым пакетом документов и ответят на все ваши вопросы
          </p>
          <button
            onClick={handleConsultationClick}
            className="px-6 py-3 bg-[#ffcc00] text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Получить консультацию
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
