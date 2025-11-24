import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { CheckCircle2, Zap, BarChart3 } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const loginUrl = getLoginUrl();

  if (isAuthenticated) {
    return <Link href="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-900">Task-It</span>
        </div>
        <Button
          onClick={() => window.location.href = loginUrl}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Entrar
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Organize suas tarefas de forma{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            simples e eficaz
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Task-It é um aplicativo minimalista para gerenciar suas tarefas diárias.
          Crie, acompanhe e conquiste seus objetivos com uma interface limpa e livre de distrações.
        </p>
        <Button
          onClick={() => window.location.href = loginUrl}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6"
        >
          Começar Agora
        </Button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher Task-It?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Rápido e Minimalista
              </h3>
              <p className="text-gray-600">
                Interface limpa e intuitiva, sem distrações. Crie e conclua tarefas em segundos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <BarChart3 className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Acompanhe seu Progresso
              </h3>
              <p className="text-gray-600">
                Veja seu progresso em tempo real com barras de progresso e sequências de dias.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sinta a Conquista
              </h3>
              <p className="text-gray-600">
                Marque tarefas como concluídas e sinta a satisfação de completar seus objetivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como funciona?
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Crie suas tarefas
                </h3>
                <p className="text-gray-600">
                  Adicione tarefas rapidamente com um título e descrição opcional.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Acompanhe seu progresso
                </h3>
                <p className="text-gray-600">
                  Visualize quantas tarefas você concluiu e mantenha-se motivado.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Conquiste seus objetivos
                </h3>
                <p className="text-gray-600">
                  Marque tarefas como concluídas e sinta a satisfação de alcançar suas metas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para organizar suas tarefas?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Comece agora e veja como Task-It pode transformar sua produtividade.
          </p>
          <Button
            onClick={() => window.location.href = loginUrl}
            size="lg"
            className="bg-white hover:bg-gray-100 text-indigo-600 text-lg px-8 py-6 font-semibold"
          >
            Começar Gratuitamente
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p>&copy; 2024 Task-It. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Projeto Integrador - Senac EAD</p>
        </div>
      </footer>
    </div>
  );
}
