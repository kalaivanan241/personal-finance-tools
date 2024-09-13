export const runtime = "edge";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black-100 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-grey-900 mb-2 animate-fade-in-down">
          Coming Soon...
        </h1>
        <p className="text-xl text-grey-800 mb-8 animate-fade-in-up">
          We are thrilled to announce that our innovative personal finance tool
          app is on its way! Designed to empower you on your financial journey,
          our app will equip you with essential tools to help you make informed
          investment decisions and manage your finances effortlessly.
        </p>
      </div>
    </div>
  );
}
