import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { AuthLayout } from './components/AuthLayout';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
import { BookingForm } from './components/BookingForm';
import { BookingHistory } from './components/BookingHistory';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthLayout />}>
            <Route
              path="/"
              element={<Navigate to="/booking" replace />}
            />
            <Route
              path="/booking"
              element={
                <>
                  <Navbar />
                  <BookingForm />
                </>
              }
            />
            <Route
              path="/history"
              element={
                <>
                  <Navbar />
                  <BookingHistory />
                </>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;