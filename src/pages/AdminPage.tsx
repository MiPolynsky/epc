import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, Calendar, FileText, Trash2, CheckCircle, Archive } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  files_info: Array<{ name: string; size: number }>;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}

export default function AdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user, filter]);

  async function checkAuth() {
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('Auth check:', { user, error });
    setUser(user);
    if (!user) {
      setLoading(false);
    }
  }

  async function loadMessages() {
    setLoading(true);
    console.log('Loading messages with filter:', filter);

    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    console.log('Messages loaded:', { data, error, count: data?.length });

    if (error) {
      console.error('Error loading messages:', error);
      alert('Ошибка загрузки сообщений: ' + error.message);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: 'read' | 'archived') {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
    } else {
      loadMessages();
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm('Удалить это сообщение?')) return;

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
    } else {
      loadMessages();
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Ошибка входа: ' + error.message);
    } else {
      checkAuth();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setMessages([]);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Вход в админ-панель</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Админ-панель</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Выйти
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Все ({messages.length})
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'new'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Новые
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'read'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Прочитанные
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'archived'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Архив
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">Нет сообщений</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  msg.status === 'new' ? 'border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{msg.name}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${msg.phone}`} className="hover:text-blue-600">
                          {msg.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${msg.email}`} className="hover:text-blue-600">
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(msg.created_at).toLocaleString('ru-RU', {
                          timeZone: 'Asia/Omsk',
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {msg.status === 'new' && (
                      <button
                        onClick={() => updateStatus(msg.id, 'read')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Отметить прочитанным"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    {msg.status !== 'archived' && (
                      <button
                        onClick={() => updateStatus(msg.id, 'archived')}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Архивировать"
                      >
                        <Archive className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {msg.message && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Сообщение:</div>
                    <p className="text-gray-900 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                )}

                {msg.files_info && msg.files_info.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Прикрепленные файлы ({msg.files_info.length}):
                    </div>
                    <ul className="list-disc list-inside text-gray-700">
                      {msg.files_info.map((file, idx) => (
                        <li key={idx}>
                          {file.name} ({Math.round(file.size / 1024)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      msg.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : msg.status === 'read'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.status === 'new'
                      ? 'Новое'
                      : msg.status === 'read'
                      ? 'Прочитано'
                      : 'Архив'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
