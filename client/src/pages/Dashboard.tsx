import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Edit2, Plus, CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const utils = trpc.useUtils();
  const { data: tasks = [], isLoading } = trpc.task.list.useQuery();

  const createMutation = trpc.task.create.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      setFormData({ title: "", description: "" });
      setIsCreateOpen(false);
      toast.success("Tarefa criada com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  const updateMutation = trpc.task.update.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      setEditingId(null);
      setFormData({ title: "", description: "" });
      toast.success("Tarefa atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar tarefa: ${error.message}`);
    },
  });

  const deleteMutation = trpc.task.delete.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      toast.success("Tarefa deletada com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao deletar tarefa: ${error.message}`);
    },
  });

  const toggleCompleteMutation = trpc.task.update.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      toast.success("Tarefa atualizada!");
    },
  });

  const handleCreateOrUpdate = async () => {
    if (!formData.title.trim()) {
      toast.error("Título da tarefa é obrigatório");
      return;
    }

    if (editingId) {
      await updateMutation.mutateAsync({
        id: editingId,
        title: formData.title,
        description: formData.description,
      });
    } else {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
      });
    }
  };

  const handleEdit = (task: any) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description || "",
    });
    setIsCreateOpen(true);
  };

  const handleDelete = (taskId: number) => {
    if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
      deleteMutation.mutate({ id: taskId });
    }
  };

  const handleToggleComplete = (task: any) => {
    toggleCompleteMutation.mutate({
      id: task.id,
      completed: task.completed === 0 ? 1 : 0,
      completedAt: task.completed === 0 ? new Date() : undefined,
    });
  };

  const completedCount = tasks.filter((t: any) => t.completed === 1).length;
  const completionPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task-It</h1>
          <p className="text-gray-600">Bem-vindo, {user?.name || "Usuário"}!</p>
        </div>

        {/* Progress Card */}
        {tasks.length > 0 && (
          <Card className="mb-6 p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Seu Progresso</h2>
              <span className="text-2xl font-bold text-indigo-600">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedCount} de {tasks.length} tarefas concluídas
            </p>
          </Card>
        )}

        {/* Create Task Button */}
        <div className="mb-6">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", description: "" });
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Editar Tarefa" : "Nova Tarefa"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <Input
                    placeholder="Ex: Fazer lição de casa"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição (opcional)
                  </label>
                  <Textarea
                    placeholder="Adicione detalhes sobre a tarefa..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateOrUpdate}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    {editingId ? "Atualizar" : "Criar"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : tasks.length === 0 ? (
            <Card className="p-8 text-center bg-white">
              <p className="text-gray-500 text-lg">
                Nenhuma tarefa criada ainda. Crie sua primeira tarefa!
              </p>
            </Card>
          ) : (
            tasks.map((task: any) => (
              <Card
                key={task.id}
                className={`p-4 transition-all duration-200 ${
                  task.completed === 1
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className="mt-1 flex-shrink-0 transition-colors"
                  >
                    {task.completed === 1 ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 hover:text-indigo-400" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-base ${
                        task.completed === 1
                          ? "text-gray-400 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p
                        className={`text-sm mt-1 ${
                          task.completed === 1
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Deletar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
