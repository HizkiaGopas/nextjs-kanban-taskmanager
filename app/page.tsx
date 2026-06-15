"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, AlertCircle, X, Sparkles, CheckCircle2, Clock, ListTodo } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

/* ──────────────────────────── Priority Glow Map ──────────────────────────── */
const priorityGlow: Record<string, string> = {
  high: "shadow-[var(--shadow-glow-red)] hover:shadow-[0_6px_32px_-2px_rgba(239,68,68,0.18),0_2px_8px_-1px_rgba(239,68,68,0.12)] border-red-200/60",
  medium:
    "shadow-[var(--shadow-glow-amber)] hover:shadow-[0_6px_32px_-2px_rgba(245,158,11,0.18),0_2px_8px_-1px_rgba(245,158,11,0.12)] border-amber-200/60",
  low: "shadow-[var(--shadow-glow-emerald)] hover:shadow-[0_6px_32px_-2px_rgba(16,185,129,0.18),0_2px_8px_-1px_rgba(16,185,129,0.12)] border-emerald-200/60",
};

const priorityBadge: Record<string, string> = {
  high: "bg-red-50 text-red-600 border border-red-100",
  medium: "bg-amber-50 text-amber-700 border border-amber-100",
  low: "bg-emerald-50 text-emerald-600 border border-emerald-100",
};

const priorityDot: Record<string, string> = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
};

/* ──────────────────────────── Column Definitions ──────────────────────────── */
const columns: {
  id: "todo" | "in_progress" | "done";
  label: string;
  icon: typeof ListTodo;
  gradient: string;
  badge: string;
  emptyText: string;
}[] = [
  {
    id: "todo",
    label: "To Do",
    icon: ListTodo,
    gradient: "from-slate-400 to-slate-500",
    badge: "bg-slate-100 text-slate-600 border-slate-200/60",
    emptyText: "Belum ada tugas. Mulai produktif!",
  },
  {
    id: "in_progress",
    label: "In Progress",
    icon: Clock,
    gradient: "from-blue-400 to-indigo-500",
    badge: "bg-blue-50 text-blue-600 border-blue-200/60",
    emptyText: "Belum ada tugas yang dikerjakan.",
  },
  {
    id: "done",
    label: "Done",
    icon: CheckCircle2,
    gradient: "from-emerald-400 to-teal-500",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
    emptyText: "Selesaikan tugas untuk merayakan! 🎉",
  },
];

/* ──────────────────────────── Main Component ──────────────────────────── */
export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"todo" | "in_progress" | "done">("todo");
  const [showForm, setShowForm] = useState(false);

  // Ambil data dari MongoDB saat halaman dimuat
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    if (res.ok) setTasks(data);
  };

  // Create Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority, dueDate, status }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setShowForm(false);
      fetchTasks(); // Refresh data
    }
  };

  // Update Status (Pindah Kolom)
  const handleMoveTask = async (id: string, newStatus: "todo" | "in_progress" | "done") => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchTasks();
  };

  // Delete Task
  const handleDeleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (res.ok) fetchTasks();
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-ink)] font-sans relative overflow-hidden">
      {/* ── Background Decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-100/10 blur-3xl" />
        <div className="animate-float absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-100/15 to-indigo-100/10 blur-3xl" style={{ animationDelay: "2s" }} />
        <div className="animate-float absolute top-1/2 right-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-100/10 to-teal-50/5 blur-3xl" style={{ animationDelay: "4s" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* ── Header Section ── */}
        <header className="animate-[slide-up_0.5s_ease-out] mb-10">
          {/* Top bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
                  <Sparkles size={20} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  Task <span className="text-gradient-gold">Manager</span>
                </h1>
              </div>
              <p className="mt-1 text-sm text-[var(--color-ink-light)]">
                Workspace minimalis untuk mengelola tugas kuliah dan proyek Anda.
              </p>
            </div>

            {/* Stats & Add button */}
            <div className="flex items-center gap-3">
              {/* Mini stats pill */}
              <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-2 text-xs font-medium text-[var(--color-ink-light)] shadow-[var(--shadow-glass)] backdrop-blur-md">
                <span className="text-emerald-500 font-semibold">{doneTasks}</span>
                <span>/</span>
                <span>{totalTasks}</span>
                <span className="hidden sm:inline">selesai</span>
              </div>

              <button
                id="btn-add-task"
                onClick={() => setShowForm(!showForm)}
                className={`group flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg transition-all duration-300 ${
                  showForm
                    ? "border border-gray-200 bg-white text-[var(--color-ink)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-500/25 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-600/30 hover:-translate-y-0.5"
                }`}
              >
                {showForm ? (
                  <>
                    <X size={16} className="transition-transform group-hover:rotate-90" /> Tutup
                  </>
                ) : (
                  <>
                    <Plus size={16} className="transition-transform group-hover:rotate-90" /> Tambah Task
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ── Add Task Form (Glassmorphism Panel) ── */}
        {showForm && (
          <div className="animate-[scale-in_0.3s_cubic-bezier(0.16,1,0.3,1)] mx-auto mb-10 max-w-3xl rounded-2xl border border-white/60 bg-white/40 p-6 shadow-[var(--shadow-glass)] backdrop-blur-md lg:p-8">
            <div className="mb-5 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-[shimmer_2.5s_ease-in-out_infinite]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink-light)]">
                Buat Tugas Baru
              </h2>
            </div>

            <form id="form-add-task" onSubmit={handleAddTask} className="space-y-5">
              {/* Title Input */}
              <div>
                <input
                  id="input-task-title"
                  type="text"
                  placeholder="Judul Tugas (misal: Tugas Besar Basis Data)"
                  className="w-full border-b-2 border-amber-200/60 bg-transparent pb-2 text-lg font-semibold text-[var(--color-ink)] outline-none placeholder:text-gray-300 transition-colors duration-300 focus:border-amber-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-light)]">
                  Deskripsi
                </label>
                <textarea
                  id="input-task-desc"
                  placeholder="Tambahkan detail rincian tugas..."
                  className="h-24 w-full resize-none rounded-xl border border-white/60 bg-white/50 p-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-amber-300 focus:bg-white/70 focus:shadow-[var(--shadow-card)]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Grid of selectors */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-light)]">
                    Prioritas
                  </label>
                  <select
                    id="select-priority"
                    className="w-full rounded-xl border border-white/60 bg-white/50 p-2.5 text-sm text-[var(--color-ink)] outline-none backdrop-blur-sm transition-all duration-300 focus:border-amber-300 focus:bg-white/70"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-light)]">
                    Tenggat Waktu
                  </label>
                  <input
                    id="input-due-date"
                    type="date"
                    className="w-full rounded-xl border border-white/60 bg-white/50 p-2.5 text-sm text-[var(--color-ink)] outline-none backdrop-blur-sm transition-all duration-300 focus:border-amber-300 focus:bg-white/70"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-light)]">
                    Kolom Awal
                  </label>
                  <select
                    id="select-status"
                    className="w-full rounded-xl border border-white/60 bg-white/50 p-2.5 text-sm text-[var(--color-ink)] outline-none backdrop-blur-sm transition-all duration-300 focus:border-amber-300 focus:bg-white/70"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "todo" | "in_progress" | "done")}
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <button
                  id="btn-submit-task"
                  type="submit"
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-600/25 hover:-translate-y-0.5"
                >
                  <Sparkles size={14} className="transition-transform group-hover:scale-110" />
                  Simpan ke Board
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Kanban Board ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 animate-[fade-in_0.6s_ease-out]">
          {columns.map((col, colIndex) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            const ColIcon = col.icon;

            return (
              <div
                key={col.id}
                className="flex flex-col"
                style={{ animationDelay: `${colIndex * 100}ms` }}
              >
                {/* ── Column Header ── */}
                <div className="mb-4 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${col.gradient} shadow-sm`}>
                      <ColIcon size={14} className="text-white" />
                    </div>
                    <h2 className="text-sm font-bold tracking-tight text-[var(--color-ink)]">{col.label}</h2>
                    <span className={`flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 text-[10px] font-bold ${col.badge}`}>
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                {/* ── Column Body (Glassmorphism Container) ── */}
                <div className="flex-1 rounded-2xl border border-white/60 bg-white/20 p-3 backdrop-blur-sm min-h-[420px] transition-colors duration-300">
                  {colTasks.length === 0 ? (
                    /* Empty State */
                    <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/40">
                        <ColIcon size={20} className="text-gray-300" />
                      </div>
                      <p className="text-xs text-gray-300 max-w-[180px]">{col.emptyText}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {colTasks.map((task, taskIndex) => (
                        /* ── Task Card ── */
                        <div
                          key={task._id}
                          className={`group relative rounded-xl border bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 animate-[slide-up_0.35s_cubic-bezier(0.16,1,0.3,1)_both] ${priorityGlow[task.priority]}`}
                          style={{ animationDelay: `${taskIndex * 60}ms` }}
                        >
                          {/* Priority indicator strip */}
                          <div className={`absolute left-0 top-3 h-6 w-1 rounded-r-full ${priorityDot[task.priority]} transition-all duration-300 group-hover:h-8`} />

                          {/* Card Header */}
                          <div className="flex items-start justify-between gap-2 pl-2">
                            <h3 className="text-sm font-semibold leading-snug text-[var(--color-ink)]">{task.title}</h3>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-gray-300 opacity-0 transition-all duration-200 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                              aria-label="Delete task"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          {/* Description */}
                          {task.description && (
                            <p className="mt-1.5 pl-2 text-xs leading-relaxed text-[var(--color-ink-light)] line-clamp-2">
                              {task.description}
                            </p>
                          )}

                          {/* Meta Badges */}
                          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100/60 pl-2 pt-3">
                            {task.dueDate && (
                              <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-[var(--color-ink-light)]">
                                <Calendar size={10} className="text-gray-400" />
                                {new Date(task.dueDate).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            )}
                            <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${priorityBadge[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>

                          {/* Quick Move Buttons */}
                          <div className="mt-3 flex justify-end gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                            {col.id !== "todo" && (
                              <button
                                onClick={() => handleMoveTask(task._id, "todo")}
                                className="rounded-lg border border-gray-100 bg-white/60 px-2.5 py-1 text-[10px] font-medium text-gray-500 backdrop-blur-sm transition-all duration-200 hover:border-gray-200 hover:bg-white hover:text-gray-700 hover:shadow-sm"
                              >
                                ↩ To Do
                              </button>
                            )}
                            {col.id !== "in_progress" && (
                              <button
                                onClick={() => handleMoveTask(task._id, "in_progress")}
                                className="rounded-lg border border-blue-100 bg-blue-50/50 px-2.5 py-1 text-[10px] font-medium text-blue-500 backdrop-blur-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm"
                              >
                                ⚡ Progress
                              </button>
                            )}
                            {col.id !== "done" && (
                              <button
                                onClick={() => handleMoveTask(task._id, "done")}
                                className="rounded-lg border border-emerald-100 bg-emerald-50/50 px-2.5 py-1 text-[10px] font-medium text-emerald-500 backdrop-blur-sm transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-sm"
                              >
                                ✔ Done
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <footer className="mt-12 pb-6 text-center">
          <p className="text-[11px] text-gray-300 tracking-wide">
            Crafted with <span className="text-amber-400">✦</span> — Next.js × MongoDB × Tailwind
          </p>
        </footer>
      </div>
    </main>
  );
}