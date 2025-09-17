import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CentersPage } from './pages/CentersPage';
import { CoursesPage } from './pages/CoursesPage';
import { ContactPage } from './pages/ContactPage';
import { PageName } from './types/navigation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  const navigate = (page: PageName, centerId?: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'centers':
        return <CentersPage onNavigate={navigate} />;
      case 'courses':
        return <CoursesPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={navigate} />
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}