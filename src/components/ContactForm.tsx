import { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, Paperclip, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [files, setFiles] = useState<File[]>([]);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
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
      const messageData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        files_info: files.map(f => ({ name: f.name, size: f.size })),
      };

      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([messageData]);

      if (dbError) {
        throw dbError;
      }

      const emailResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(messageData),
        }
      );

      if (!emailResponse.ok) {
        console.error('Email sending failed, but message saved to database');
      }

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setFiles([]);
      generateCaptcha();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitStatus('error');
      generateCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Контактная информация</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#ffcc00] p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Телефон</p>
                    <a href="tel:+79136348192" className="text-lg font-semibold text-gray-900 hover:text-[#ffcc00]">
                      +7 913 634 8192
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#ffcc00] p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <a href="mailto:expert.p.c@mail.ru" className="text-lg font-semibold text-gray-900 hover:text-[#ffcc00]">
                      expert.p.c@mail.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#ffcc00] p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Адрес</p>
                    <p className="text-lg font-semibold text-gray-900">
                      г. Омск, ул. Голика, д. 2, оф. 37
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent transition-all"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div className="mb-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ead615] focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ead615] focus:border-transparent transition-all resize-none"
                placeholder="Опишите ваш вопрос или проект..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Прикрепить файлы
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#ead615] transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Paperclip className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Нажмите для выбора файлов или перетащите их сюда
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX, XLS, XLSX, DWG, JPG, PNG
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  Для расчета стоимости Вы можете прикрепить раздел ПД с технико-экономическими показателями,
                  или указать в комментарии назначение здания, общую площадь и площадь застройки
                </p>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                Неверный ответ на вопрос. Попробуйте еще раз.
              </div>
            )}

            <div className="mb-6">
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
              className="w-full bg-[#ffcc00] text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                'Отправка...'
              ) : (
                <>
                  Отправить заявку
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
