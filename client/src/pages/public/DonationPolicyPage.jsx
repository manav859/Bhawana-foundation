export function DonationPolicyPage() {
  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pt-[80px] pb-20">
      
      {/* Header */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1000px] mx-auto text-center mt-10">
        <h1 className="font-display text-[36px] lg:text-[48px] font-bold text-text-dark leading-[1.2]">
          Donation & Refund Policy
        </h1>
        <p className="font-sans text-[16px] text-text-secondary mt-4">
          Last updated: April 1, 2024
        </p>
      </section>

      {/* Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[900px] mx-auto mt-10 bg-white p-8 lg:p-12 rounded-2xl border border-border-light shadow-sm">
        <div className="prose prose-blue max-w-none font-sans text-text-secondary leading-[1.8] text-[15px] lg:text-[16px]">
          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">1. General Policy</h2>
          <p className="mb-6">
            Bhawna Foundation is a non-profit organization registered under the Societies Registration Act. We are deeply grateful for your continuous support through your donations, which enable us to carry out vital projects in education, healthcare, and rural development across Rajasthan.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">2. Tax Deductions</h2>
          <p className="mb-6">
            Donations made to Bhawna Foundation by eligible Indian taxpayers qualify for a deduction under Section 80G of the Income Tax Act, 1961. We will provide a donation receipt containing our 80G registration number to the email address provided during the donation process.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">3. Refund Policy</h2>
          <p className="mb-4">
            We institute a donation refund policy to ensure fair and transparent processing of requests for refund of donations as digital payments are becoming more frequent. We expect that all donors will exercise due care and diligence while making donations. We also recognize that a donation may be made erroneously or donors may change their mind. We will examine request for refund of donation and endeavor to make the refund process efficient. We may also seek proper explanation and reason from the user. Also, it will require further verification of the user and need documents of proof as well as for donation.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Requests for refund must be made within 7 days of making the donation.</li>
            <li>The written request stating reason for requesting refund must be sent to the email id stated below.</li>
            <li>Refund requests must contain the date of donation, donation amount, transaction ID, and donor name.</li>
            <li>Once the tax exemption certificate (80G) has been issued, the donation cannot be refunded.</li>
          </ul>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">4. Processing Requests</h2>
          <p className="mb-6">
            If your request for a refund is approved, the funds will be reversed to the original source of the payment within 10-15 working days. Please note that the timing depends on the banking channels.
          </p>

          <h2 className="font-display text-[22px] font-bold text-text-dark mb-4">5. Contact Us</h2>
          <p>
            For any queries related to your donation, receipts, or refund requests, please reach out to us: <br/>
            <strong>Email:</strong> donations@bhawnafoundation.org <br/>
            <strong>Phone:</strong> +91 98765 43210
          </p>
        </div>
      </section>

    </main>
  );
}
