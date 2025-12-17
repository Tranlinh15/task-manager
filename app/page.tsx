import { SignedIn, SignedOut } from "@clerk/nextjs";
import TaskManager from "@/components/TaskManager";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <Hero />
      </SignedOut>
      <SignedIn>
        <TaskManager />
      </SignedIn>
    </div>
  );
}
