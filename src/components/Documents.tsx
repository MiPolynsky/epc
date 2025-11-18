import { FileText, Download } from 'lucide-react';

const Documents = () => {
  const documents = [
    {
      title: 'Свидетельство об аккредитации',
      category: 'Разрешительные документы',
      date: '2024'
    },
    {
      title: 'Положение о проведении экспертизы',
      category: 'Нормативные документы',
      date: '2024'
    },
    {
      title: 'Перечень экспертов',
      category: 'Информационные материалы',
      date: '2024'
    },
    {
      title: 'Типовой договор на проведение экспертизы',
      category: 'Документы для заказчиков',
      date: '2024'
    },
    {
      title: 'Прайс-лист на услуги',
      category: 'Коммерческие предложения',
      date: '2024'
    },
    {
      title: 'Методические рекомендации',
      category: 'Информационные материалы',
      date: '2024'
    }
  ];

  return (
    <section id="documents" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Документы
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600">{doc.category}</p>
                      <p className="text-xs text-gray-500 mt-1">{doc.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Скачать</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
