import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl w-full">

        {/* 404 */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="text-7xl md:text-8xl font-semibold text-blue-600 tracking-tight">
            4
          </span>

          <div className="relative flex items-center justify-center">
            <span className="text-7xl md:text-8xl font-semibold text-blue-600 tracking-tight">
              0
            </span>

            <FiSearch
              className="absolute text-blue-500"
              size={38}
            />
          </div>

          <span className="text-7xl md:text-8xl font-semibold text-blue-600 tracking-tight">
            4
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h1>

        <p className="text-gray-500 text-base mb-8">
          The page you are trying to access does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}