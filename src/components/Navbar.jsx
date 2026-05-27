import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-primary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-50 p-2 rounded-lg group-hover:bg-primary-100 transition-colors">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                She Can <span className="text-primary-600">Foundation</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
            >
              Contact
            </a>
            <Link
              to="/admin/login"
              className="text-sm font-medium bg-primary-50 text-primary-700 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
