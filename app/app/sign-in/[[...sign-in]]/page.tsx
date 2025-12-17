import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your tasks and projects
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "btn-primary",
              card: "card",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-600",
            },
          }}
        />
      </div>
    </div>
  );
}
