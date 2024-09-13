export const runtime = "edge";

import { Button } from "@/components/ui/button";
import { AlertCircle, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-gray-900 animate-bounce">
            404
          </h1>
          <AlertCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 w-20 h-20 animate-pulse" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Oops! Page not found
        </h2>

        <p className="mt-2 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 animate-fade-in-up">
          <Link href="/" passHref>
            <Button>
              <MoveLeft className="mr-2 h-5 w-5" />
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
