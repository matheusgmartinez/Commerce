import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import MainLayout from '../components/layout/MainLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
