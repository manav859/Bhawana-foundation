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
import { DetailScaffoldPage } from '@/pages/public/DetailScaffoldPage.jsx';
import { HomeScaffoldPage } from '@/pages/public/HomeScaffoldPage.jsx';
import { NotFoundPage } from '@/pages/public/NotFoundPage.jsx';
import { PolicyScaffoldPage } from '@/pages/public/PolicyScaffoldPage.jsx';
import { StandardScaffoldPage } from '@/pages/public/StandardScaffoldPage.jsx';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomeScaffoldPage />} />
          <Route path="about" element={<StandardScaffoldPage title="About Bhawna Foundation" description="Story, mission, leadership, and impact sections will be implemented on top of this public route shell." bullets={['Responsive content blocks are ready.', 'The route already matches the design map.', 'Future CMS content can slot into this page without changing navigation.']} />} />
          <Route path="programs" element={<StandardScaffoldPage title="Programs" description="Program listing shell for education, healthcare, women empowerment, and community development content." bullets={['List page route is wired.', 'Program service methods already exist.', 'Cards and detail linking can be added in the next page phase.']} />} />
          <Route path="programs/:slug" element={<DetailScaffoldPage title="Program details" entityLabel="Program" />} />
          <Route path="projects" element={<StandardScaffoldPage title="Projects" description="Project archive shell prepared for featured stories, impact metrics, and category filtering." bullets={['Archive route is stable.', 'Project detail links are supported.', 'Service layer and API namespace are ready.']} />} />
          <Route path="projects/:slug" element={<DetailScaffoldPage title="Project details" entityLabel="Project" />} />
          <Route path="events" element={<StandardScaffoldPage title="Events" description="Events archive shell ready for upcoming and past event experiences with later registration features." bullets={['List route is scaffolded.', 'Tabs and filters can be layered in later.', 'Event registration belongs to a later feature phase.']} />} />
          <Route path="events/:slug" element={<DetailScaffoldPage title="Event details" entityLabel="Event" />} />
          <Route path="gallery" element={<StandardScaffoldPage title="Gallery" description="Gallery archive shell prepared for albums, featured imagery, and responsive masonry or grid layouts." bullets={['Public media route is stable.', 'Upload ready backend structure already exists.', 'SEO and alt text handling can layer on later.']} />} />
          <Route path="donate" element={<StandardScaffoldPage title="Donate" description="Donation route shell for later pledge forms, payment integration, and impact storytelling." bullets={['URL is stable from phase 1.', 'Donation APIs are reserved on the backend.', 'Form flow will be implemented in a dedicated feature phase.']} />} />
          <Route path="volunteer" element={<StandardScaffoldPage title="Volunteer" description="Volunteer route shell ready for later application forms and engagement workflows." bullets={['Submission collection is planned on the backend.', 'Admin review route already exists.', 'Validation and persistence are reserved for a later phase.']} />} />
          <Route path="blog" element={<StandardScaffoldPage title="Blog" description="Blog archive shell for articles, category filtering, and story driven content presentation." bullets={['Posts API service is scaffolded.', 'Detail routes are already connected.', 'SEO ready content patterns can be added later.']} />} />
          <Route path="blog/:slug" element={<DetailScaffoldPage title="Blog details" entityLabel="Blog post" />} />
          <Route path="contact" element={<StandardScaffoldPage title="Contact" description="Contact route shell ready for the later map, inquiry form, and organization contact details." bullets={['The page layout shell is stable.', 'Submission routes are reserved on the backend.', 'Validation and anti spam middleware are already planned.']} />} />
          <Route path="privacy-policy" element={<PolicyScaffoldPage title="Privacy Policy" description="Reserved route for privacy and data handling content." />} />
          <Route path="terms" element={<PolicyScaffoldPage title="Terms and Conditions" description="Reserved route for site terms, usage rules, and legal notices." />} />
          <Route path="donation-policy" element={<PolicyScaffoldPage title="Donation Policy" description="Reserved route for donation related policy content and refund guidance." />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/login" element={<AuthLayout><AdminLoginPage /></AuthLayout>} />

        <Route element={<RequireAdminAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="events" element={<AdminModulePage title="Manage Events" resource="events" description="Admin shell for browsing, filtering, and managing event records." />} />
            <Route path="events/new" element={<AdminEditorPage title="Create Event" resource="events" mode="create" />} />
            <Route path="events/:id/edit" element={<AdminEditorPage title="Edit Event" resource="events" mode="edit" />} />
            <Route path="projects" element={<AdminModulePage title="Manage Projects" resource="projects" description="Admin shell for project archive management and future editorial workflows." />} />
            <Route path="projects/new" element={<AdminEditorPage title="Create Project" resource="projects" mode="create" />} />
            <Route path="projects/:id/edit" element={<AdminEditorPage title="Edit Project" resource="projects" mode="edit" />} />
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