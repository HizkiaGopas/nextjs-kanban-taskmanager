import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

// PUT: Memperbarui task berdasarkan ID (Mendukung Next.js versi terbaru)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Mengubah tipe params menjadi Promise
) {
  try {
    await connectDB();
    
    // 1. Wajib di-await terlebih dahulu sesuai aturan Next.js terbaru
    const resolvedParams = await params; 
    const id = resolvedParams.id;
    
    const body = await request.json();

    // 2. Mengubah 'new: true' menjadi 'returnDocument: "after"' untuk menghilangkan Mongoose Warning
    const taskUpdate = await Task.findByIdAndUpdate(id, body, {
      returnDocument: "after", 
      runValidators: true,
    });

    if (!taskUpdate) {
      return NextResponse.json({ error: "Task tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(taskUpdate, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Menghapus task berdasarkan ID (Mendukung Next.js versi terbaru)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Mengubah tipe params menjadi Promise
) {
  try {
    await connectDB();
    
    // Wajib di-await terlebih dahulu sesuai aturan Next.js terbaru
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const taskHapus = await Task.findByIdAndDelete(id);

    if (!taskHapus) {
      return NextResponse.json({ error: "Task tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task berhasil dihapus" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}