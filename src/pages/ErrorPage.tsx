import { MoveLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import CommonButton from "../components/button/CommonButton";

const ErrorPage = () => {
  return (
    <div className="min-h-[calc(100vh-113px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 animate-ping bg-blue-100 rounded-full opacity-75" />
          <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-lg">
            <ShoppingBag className="w-16 h-16 text-blue-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-7xl font-bold text-gray-900 mb-4 animate-fade-in">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          We couldn&apos;t find what you&apos;re looking for. The page you
          requested might have been removed or doesn&apos;t exist.
        </p>

        {/* Back to Home Button */}
        <Link to="/" className="flex justify-center">
          <CommonButton
            buttonText={
              <div className="flex justify-center items-center">
                <MoveLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Home</span>
              </div>
            }
          />
        </Link>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
