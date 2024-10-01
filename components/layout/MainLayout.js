// components/layout/MainLayout.js
import Header from '../Header';
import Footer from '../Footer';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
