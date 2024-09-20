import { Loader2 } from "lucide-react";

export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
