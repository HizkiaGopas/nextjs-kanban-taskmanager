import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

// GET: Mengambil semua data task dari MongoDB
export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 }); // Urutkan dari yang terbaru
    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Menambahkan task baru ke MongoDB
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validasi minimal
    if (!body.title) {
      return NextResponse.json({ error: "Judul tugas wajib diisi" }, { status: 400 });
    }

    const taskBaru = await Task.create({
      title: body.title,
      description: body.description,
      status: body.status || "todo",
      priority: body.priority || "medium",
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    });

    return NextResponse.json(taskBaru, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}