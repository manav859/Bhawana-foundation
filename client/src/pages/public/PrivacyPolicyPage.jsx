export function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pt-[80px] pb-20">
      
      {/* Header */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1000px] mx-auto text-center mt-10">
        <h1 className="font-display text-[36px] lg:text-[48px] font-bold text-text-dark leading-[1.2]">
          Privacy Policy
        </h1>
        <p className="font-sans text-[16px] text-text-secondary mt-4">
          Last updated: April 1, 2024
        </p>
      </section>

      {/* Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[900px] mx-auto mt-10 bg-white p-8 lg:p-12 rounded-2xl border border-border-light shadow-sm">
        <div className="prose prose-blue max-w-none font-sans text-text-secondary leading-[1.8] text-[15px] lg:text-[16px]">
          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">1. Introduction</h2>
          <p className="mb-6">
            Welcome to Bhawna Foundation ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">2. The Data We Collect About You</h2>
          <p className="mb-4">
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, title.</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data:</strong> includes bank account and payment card details (processed securely by our payment gateways).</li>
            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of donations you have made to us.</li>
          </ul>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">3. How We Use Your Personal Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>To process your donations.</li>
            <li>To manage our relationship with you, including sending you receipts.</li>
            <li>To communicate with you about our programs and events, if you have opted in.</li>
            <li>To comply with a legal or regulatory obligation.</li>
          </ul>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">4. Data Security</h2>
          <p className="mb-6">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">5. Contact Details</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <br/>
            <strong>Email:</strong> privacy@bhawnafoundation.org <br/>
            <strong>Address:</strong> 123 Foundation Way, Jaipur, Rajasthan, India
          </p>
        </div>
      </section>

    </main>
  );
}
