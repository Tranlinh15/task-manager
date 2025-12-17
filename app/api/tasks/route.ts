import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "deadline";

    // Tìm hoặc tạo user
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email:
            user.emailAddresses[0]?.emailAddress ||
            `user-${user.id}@taskflow.com`,
          name:
            `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
        },
      });
    }

    const where: any = {
      userId: dbUser.id,
    };

    if (status && status !== "all") {
      where.status = status;
    }

    if (priority && priority !== "all") {
      where.priority = priority;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy: any = {};
    if (sortBy === "deadline") {
      orderBy.deadline = "asc";
    } else if (sortBy === "createdAt") {
      orderBy.createdAt = "desc";
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy,
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, status, priority, deadline } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Tìm hoặc tạo user
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email:
            user.emailAddresses[0]?.emailAddress ||
            `user-${user.id}@taskflow.com`,
          name:
            `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
        },
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || "",
        status: status || "PENDING",
        priority: priority || "MEDIUM",
        deadline: deadline ? new Date(deadline) : null,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
