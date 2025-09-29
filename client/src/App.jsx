import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Admin Components
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNews from "./pages/admin/AdminNews";
import AdminNewsList from "./pages/admin/news/AdminNewsList";
import AdminNewsForm from "./pages/admin/news/AdminNewsForm";
import AdminContactsList from "./pages/admin/contacts/AdminContactsList";
import AdminGalleryList from "./pages/admin/gallery/AdminGalleryList";
import AdminGalleryForm from "./pages/admin/gallery/AdminGalleryForm";
import AdminVideoList from "./pages/admin/videos/AdminVideoList";
import AdminVideoForm from "./pages/admin/videos/AdminVideoForm";
import AdminFacultyList from "./pages/admin/faculty/AdminFacultyList";
import AdminFacultyForm from "./pages/admin/faculty/AdminFacultyForm";
import AdminExaminationsList from "./pages/admin/examinations/AdminExaminationsList";
import AdminExaminationsForm from "./pages/admin/examinations/AdminExaminationsForm";
import AdminAdmissionsList from "./pages/admin/admissions/AdminAdmissionsList";
import AdminAdmissionsForm from "./pages/admin/admissions/AdminAdmissionsForm";
import AdminRollNumbers from "./pages/admin/admissions/AdminRollNumbers";
import AdminActivitiesList from "./pages/admin/activities/AdminActivitiesList";
import AdminActivitiesForm from "./pages/admin/activities/AdminActivitiesForm";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Faculty from "./pages/Faculty";
import TimeTable from "./pages/TimeTable";
import Activities from "./pages/Activities";
import Examination from "./pages/Examination";
import Alumni from "./pages/Alumni";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AdminAuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute>
                  <AdminNewsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news/new"
              element={
                <ProtectedRoute>
                  <AdminNewsForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminNewsForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGalleryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery/new"
              element={
                <ProtectedRoute>
                  <AdminGalleryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminGalleryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/videos"
              element={
                <ProtectedRoute>
                  <AdminVideoList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/videos/new"
              element={
                <ProtectedRoute>
                  <AdminVideoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/videos/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminVideoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faculty"
              element={
                <ProtectedRoute>
                  <AdminFacultyList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faculty/new"
              element={
                <ProtectedRoute>
                  <AdminFacultyForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faculty/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminFacultyForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/examinations"
              element={
                <ProtectedRoute>
                  <AdminExaminationsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/examinations/new"
              element={
                <ProtectedRoute>
                  <AdminExaminationsForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/examinations/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminExaminationsForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admissions"
              element={
                <ProtectedRoute>
                  <AdminAdmissionsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admissions/new"
              element={
                <ProtectedRoute>
                  <AdminAdmissionsForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admissions/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminAdmissionsForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/roll-numbers"
              element={
                <ProtectedRoute>
                  <AdminRollNumbers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activities"
              element={
                <ProtectedRoute>
                  <AdminActivitiesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activities/new"
              element={
                <ProtectedRoute>
                  <AdminActivitiesForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activities/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminActivitiesForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contacts"
              element={
                <ProtectedRoute>
                  <AdminContactsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="p-6">Settings (Coming Soon)</div>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                  <Footer />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <About />
                  <Footer />
                </>
              }
            />

            <Route
              path="/admissions"
              element={
                <>
                  <Header />
                  <Admissions />
                  <Footer />
                </>
              }
            />

            <Route
              path="/faculty"
              element={
                <>
                  <Header />
                  <Faculty />
                  <Footer />
                </>
              }
            />

            <Route
              path="/timetable"
              element={
                <>
                  <Header />
                  <TimeTable />
                  <Footer />
                </>
              }
            />

            <Route
              path="/activities"
              element={
                <>
                  <Header />
                  <Activities />
                  <Footer />
                </>
              }
            />

            <Route
              path="/examination"
              element={
                <>
                  <Header />
                  <Examination />
                  <Footer />
                </>
              }
            />

            <Route
              path="/alumni"
              element={
                <>
                  <Header />
                  <Alumni />
                  <Footer />
                </>
              }
            />

            <Route
              path="/news"
              element={
                <>
                  <Header />
                  <News />
                  <Footer />
                </>
              }
            />

            <Route
              path="/news/:id"
              element={
                <>
                  <Header />
                  <NewsDetail />
                  <Footer />
                </>
              }
            />

            <Route
              path="/contact"
              element={
                <>
                  <Header />
                  <Contact />
                  <Footer />
                </>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                style: {
                  background: "#10b981",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                },
              },
            }}
          />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
