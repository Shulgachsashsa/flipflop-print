import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">FlipFlop Print</div>
            <span className="ml-2 text-sm text-secondary hidden sm:block">Оптовая типография</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection("catalog")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Каталог
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              О нас
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Отзывы
            </button>
          </nav>

          {/* Empty space for balance */}
          <div className="flex items-center">
            {/* Space for potential future elements */}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-gray-700 hover:text-primary font-medium transition-colors w-full text-left py-2"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection("catalog")}
                className="block text-gray-700 hover:text-primary font-medium transition-colors w-full text-left py-2"
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-gray-700 hover:text-primary font-medium transition-colors w-full text-left py-2"
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="block text-gray-700 hover:text-primary font-medium transition-colors w-full text-left py-2"
              >
                Отзывы
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
