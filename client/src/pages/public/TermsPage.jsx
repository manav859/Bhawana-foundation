export function TermsPage() {
  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pt-[80px] pb-20">
      
      {/* Header */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1000px] mx-auto text-center mt-10">
        <h1 className="font-display text-[36px] lg:text-[48px] font-bold text-text-dark leading-[1.2]">
          Terms of Service
        </h1>
        <p className="font-sans text-[16px] text-text-secondary mt-4">
          Last updated: April 1, 2024
        </p>
      </section>

      {/* Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[900px] mx-auto mt-10 bg-white p-8 lg:p-12 rounded-2xl border border-border-light shadow-sm">
        <div className="prose prose-blue max-w-none font-sans text-text-secondary leading-[1.8] text-[15px] lg:text-[16px]">
          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">1. Agreement to Terms</h2>
          <p className="mb-6">
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Bhawna Foundation ("Company", "we", "us", or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">2. Intellectual Property Rights</h2>
          <p className="mb-6">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">3. User Representations</h2>
          <p className="mb-4">
            By using the Site, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>All registration or donation information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">4. Prohibited Activities</h2>
          <p className="mb-6">
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">5. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <br/>
            <strong>Email:</strong> legal@bhawnafoundation.org
          </p>
        </div>
      </section>

    </main>
  );
}
