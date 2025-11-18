import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaNum1(num1);
    setCaptchaNum2(num2);
    setCaptchaAnswer('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const correctAnswer = captchaNum1 + captchaNum2;
    if (parseInt(captchaAnswer) !== correctAnswer) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      generateCaptcha();
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      generateCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16" style={{ backgroundColor: '#ffcc00' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-4">
            Контакты
          </h1>
          <p className="text-xl text-center text-black max-w-2xl mx-auto">
            Свяжитесь с нами удобным для вас способом
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Контактная информация
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-[#ffcc00] p-4 rounded-lg mr-6">
                  <Phone className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Телефон</h3>
                  <a href="tel:+79136348192" className="text-xl text-gray-700 hover:text-[#ffcc00] transition-colors">
                    +7 913 634 8192
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Звоните в рабочее время</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#ffcc00] p-4 rounded-lg mr-6">
                  <Mail className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:expert.p.c@mail.ru" className="text-xl text-gray-700 hover:text-[#ffcc00] transition-colors">
                    expert.p.c@mail.ru
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Ответим в течение 24 часов</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#ffcc00] p-4 rounded-lg mr-6">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Адрес</h3>
                  <p className="text-xl text-gray-700">
                    г. Омск, ул. Голика, д. 2, оф. 37
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#ffcc00] p-4 rounded-lg mr-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Режим работы</h3>
                  <p className="text-xl text-gray-700">Пн-Пт: 7:00 - 16:00 (МСК)</p>
                  <p className="text-sm text-gray-600 mt-1">Суббота и воскресенье - выходной</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Реквизиты компании
              </h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Полное название:</span> Общество с ограниченной ответственностью "ЭПЦ"</p>
                <p><span className="font-semibold">ИНН:</span> 5503253624</p>
                <p><span className="font-semibold">КПП:</span> 550301001</p>
                <p><span className="font-semibold">ОГРН:</span> 1145543044558</p>
                <p><span className="font-semibold">Юридический адрес:</span> 644024, Омская обл., г. Омск, ул. Голика, д. 2, оф. 37</p>
                <p><span className="font-semibold">Директор:</span> Семахин Михаил Александрович</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Напишите нам
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Имя <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ead615] focus:border-transparent transition-all resize-none"
                  placeholder="Опишите ваш вопрос..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  Неверный ответ на вопрос. Попробуйте еще раз.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Решите пример <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 px-6 py-4 rounded-lg text-xl font-bold text-gray-800">
                    {captchaNum1} + {captchaNum2} = ?
                  </div>
                  <input
                    type="text"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    required
                    className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all text-center text-xl font-semibold"
                    placeholder="?"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ffcc00] text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactsPage;
