import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireAdminAuth } from '@/features/auth/auth.guard.jsx';
import { AdminLayout } from '@/layouts/AdminLayout.jsx';
import { AuthLayout } from '@/layouts/AuthLayout.jsx';
import { PublicLayout } from '@/layouts/PublicLayout.jsx';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage.jsx';
import { AdminEditorPage } from '@/pages/admin/AdminEditorPage.jsx';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage.jsx';
import { AdminModulePage } from '@/pages/admin/AdminModulePage.jsx';
import { AdminNotFoundPage } from '@/pages/admin/AdminNotFoundPage.jsx';
import { AdminEventsList } from '@/pages/admin/events/AdminEventsList.jsx';
import { AdminEventEditor } from '@/pages/admin/events/AdminEventEditor.jsx';
import { AdminProjectsList } from '@/pages/admin/projects/AdminProjectsList.jsx';
import { AdminProjectEditor } from '@/pages/admin/projects/AdminProjectEditor.jsx';
import { AboutPage } from '@/pages/public/AboutPage.jsx';
import { ProgramsPage } from '@/pages/public/ProgramsPage.jsx';
import { ProgramDetailsPage } from '@/pages/public/ProgramDetailsPage.jsx';
import { ProjectsPage } from '@/pages/public/ProjectsPage.jsx';
import { ProjectDetailsPage } from '@/pages/public/ProjectDetailsPage.jsx';
import { EventsPage } from '@/pages/public/EventsPage.jsx';
import { EventDetailsPage } from '@/pages/public/EventDetailsPage.jsx';
import { GalleryPage } from '@/pages/public/GalleryPage.jsx';
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
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="programs/:slug" element={<ProgramDetailsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
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

        <Route path="/admin/login" element={<AuthLayout><AdminLoginPage /></AuthLayout>} />

        <Route element={<RequireAdminAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="events" element={<AdminEventsList />} />
            <Route path="events/new" element={<AdminEventEditor />} />
            <Route path="events/:id/edit" element={<AdminEventEditor />} />
            <Route path="projects" element={<AdminProjectsList />} />
            <Route path="projects/new" element={<AdminProjectEditor />} />
            <Route path="projects/:id/edit" element={<AdminProjectEditor />} />
            <Route path="programs" element={<AdminModulePage title="Manage Programs" resource="programs" description="Admin shell for program categories, descriptions, media, and later impact metrics." />} />
            <Route path="blogs" element={<AdminModulePage title="Manage Blogs" resource="posts" description="Admin shell for content publishing, draft workflows, and later SEO management." />} />
            <Route path="gallery" element={<AdminModulePage title="Manage Gallery" resource="gallery" description="Admin shell for gallery assets, albums, captions, and future upload workflows." />} />
            <Route path="testimonials" element={<AdminModulePage title="Manage Testimonials" resource="testimonials" description="Admin shell for beneficiary, volunteer, and partner testimonial moderation." />} />
            <Route path="partners" element={<AdminModulePage title="Manage Partners" resource="partners" description="Admin shell for partner logo, URL, and order management." />} />
            <Route path="donations" element={<AdminModulePage title="Donation Intents" resource="donations" description="Admin shell for later review of donation submissions and payment reconciliation." />} />
            <Route path="volunteers" element={<AdminModulePage title="Volunteer Applications" resource="volunteers" description="Admin shell for volunteer applications, statuses, and follow up workflows." />} />
            <Route path="contacts" element={<AdminModulePage title="Contact Submissions" resource="contacts" description="Admin shell for contact inquiries and response handling." />} />
            <Route path="newsletter" element={<AdminModulePage title="Newsletter Subscribers" resource="newsletter" description="Admin shell for subscriber management and later export tools." />} />
            <Route path="settings" element={<AdminModulePage title="Website Settings" resource="settings" description="Admin shell for organization profile, contact details, SEO defaults, and global settings." />} />
            <Route path="*" element={<AdminNotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}