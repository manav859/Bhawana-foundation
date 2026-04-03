import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireAdminAuth } from '@/features/auth/auth.guard.jsx';
import { AdminLayout } from '@/layouts/AdminLayout.jsx';
import { AuthLayout } from '@/layouts/AuthLayout.jsx';
import { PublicLayout } from '@/layouts/PublicLayout.jsx';
import ScrollToTop from '@/components/common/ScrollToTop.jsx';

// Admin pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage.jsx';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage.jsx';
import { AdminNotFoundPage } from '@/pages/admin/AdminNotFoundPage.jsx';
import { AdminEventsList } from '@/pages/admin/events/AdminEventsList.jsx';
import { AdminEventEditor } from '@/pages/admin/events/AdminEventEditor.jsx';
import { AdminProjectsList } from '@/pages/admin/projects/AdminProjectsList.jsx';
import { AdminProjectEditor } from '@/pages/admin/projects/AdminProjectEditor.jsx';
import { AdminProgramsList } from '@/pages/admin/programs/AdminProgramsList.jsx';
import { AdminProgramEditor } from '@/pages/admin/programs/AdminProgramEditor.jsx';
import { AdminBlogsList } from '@/pages/admin/blogs/AdminBlogsList.jsx';
import { AdminBlogEditor } from '@/pages/admin/blogs/AdminBlogEditor.jsx';
import { AdminGalleryList } from '@/pages/admin/gallery/AdminGalleryList.jsx';
import { AdminGalleryEditor } from '@/pages/admin/gallery/AdminGalleryEditor.jsx';
import { AdminTestimonialsList } from '@/pages/admin/testimonials/AdminTestimonialsList.jsx';
import { AdminTestimonialEditor } from '@/pages/admin/testimonials/AdminTestimonialEditor.jsx';
import { AdminPartnersList } from '@/pages/admin/partners/AdminPartnersList.jsx';
import { AdminPartnerEditor } from '@/pages/admin/partners/AdminPartnerEditor.jsx';
import { AdminSettingsPage } from '@/pages/admin/settings/AdminSettingsPage.jsx';
import { AdminContactsList } from '@/pages/admin/contacts/AdminContactsList.jsx';
import { AdminDonationsList } from '@/pages/admin/donations/AdminDonationsList.jsx';
import { AdminVolunteersList } from '@/pages/admin/volunteers/AdminVolunteersList.jsx';
import { AdminNewsletterList } from '@/pages/admin/newsletter/AdminNewsletterList.jsx';

// Public pages
import { AboutPage } from '@/pages/public/AboutPage.jsx';
import { ProgramsPage } from '@/pages/public/ProgramsPage.jsx';
import { ProgramDetailsPage } from '@/pages/public/ProgramDetailsPage.jsx';
import { ProjectsPage } from '@/pages/public/ProjectsPage.jsx';
import { ProjectDetailsPage } from '@/pages/public/ProjectDetailsPage.jsx';
import { EventsPage } from '@/pages/public/EventsPage.jsx';
import { EventDetailsPage } from '@/pages/public/EventDetailsPage.jsx';
import { GalleryPage } from '@/pages/public/GalleryPage.jsx';
import { TestimonialsPage } from '@/pages/public/TestimonialsPage.jsx';
import { DonationPage } from '@/pages/public/DonationPage.jsx';
import { VolunteerPage } from '@/pages/public/VolunteerPage.jsx';
import { BlogPage } from '@/pages/public/BlogPage.jsx';
import { BlogDetailsPage } from '@/pages/public/BlogDetailsPage.jsx';
import { ContactPage } from '@/pages/public/ContactPage.jsx';
import { HomePage } from '@/pages/public/HomePage.jsx';
import { NotFoundPage } from '@/pages/public/NotFoundPage.jsx';
import { PrivacyPolicyPage } from '@/pages/public/PrivacyPolicyPage.jsx';
import { TermsPage } from '@/pages/public/TermsPage.jsx';
import { DonationPolicyPage } from '@/pages/public/DonationPolicyPage.jsx';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />

          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="donation" element={<DonationPage />} />
          <Route path="donote" element={<DonationPage />} />
          <Route path="volunteer" element={<VolunteerPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="donation-policy" element={<DonationPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ===== AUTH ===== */}
        <Route path="/admin/login" element={<AuthLayout><AdminLoginPage /></AuthLayout>} />

        {/* ===== ADMIN CMS ===== */}
        <Route element={<RequireAdminAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />

            {/* Projects */}
            <Route path="projects" element={<AdminProjectsList />} />
            <Route path="projects/new" element={<AdminProjectEditor />} />
            <Route path="projects/:id/edit" element={<AdminProjectEditor />} />

            {/* Programs */}
            <Route path="programs" element={<AdminProgramsList />} />
            <Route path="programs/new" element={<AdminProgramEditor />} />
            <Route path="programs/:id/edit" element={<AdminProgramEditor />} />

            {/* Events */}
            <Route path="events" element={<AdminEventsList />} />
            <Route path="events/new" element={<AdminEventEditor />} />
            <Route path="events/:id/edit" element={<AdminEventEditor />} />

            {/* Blog Posts */}
            <Route path="blogs" element={<AdminBlogsList />} />
            <Route path="blogs/new" element={<AdminBlogEditor />} />
            <Route path="blogs/:id/edit" element={<AdminBlogEditor />} />

            {/* Gallery */}
            <Route path="gallery" element={<AdminGalleryList />} />
            <Route path="gallery/new" element={<AdminGalleryEditor />} />
            <Route path="gallery/:id/edit" element={<AdminGalleryEditor />} />

            {/* Testimonials */}
            <Route path="testimonials" element={<AdminTestimonialsList />} />
            <Route path="testimonials/new" element={<AdminTestimonialEditor />} />
            <Route path="testimonials/:id/edit" element={<AdminTestimonialEditor />} />

            {/* Partners */}
            <Route path="partners" element={<AdminPartnersList />} />
            <Route path="partners/new" element={<AdminPartnerEditor />} />
            <Route path="partners/:id/edit" element={<AdminPartnerEditor />} />

            {/* Read-only Admin Views */}
            <Route path="donations" element={<AdminDonationsList />} />
            <Route path="volunteers" element={<AdminVolunteersList />} />
            <Route path="contacts" element={<AdminContactsList />} />
            <Route path="newsletter" element={<AdminNewsletterList />} />

            {/* Settings */}
            <Route path="settings" element={<AdminSettingsPage />} />

            <Route path="*" element={<AdminNotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}