import React from "react";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background text-black">
      <section className="bg-primary text-white mt-42">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold">Terms & Conditions</h1>
          <p className="mt-3 text-sm md:text-base opacity-90">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
          <p className="mt-4 max-w-3xl">
            Welcome to Market Closeby. These Terms govern your access to and use
            of our marketplace platform and services in Nigeria. By using our
            website, creating an account, or transacting, you agree to these
            Terms.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/contact" className="bg-secondary px-5 py-3 rounded-md font-semibold">
              Contact Support
            </Link>
            <Link to="/privacy-policy" className="bg-white text-primary px-5 py-3 rounded-md font-semibold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-xl">Acceptance & Eligibility</h2>
            <p className="mt-3 text-sm">
              You must be at least 18 years old or the age of majority under
              Nigerian law to create an account or transact. Use of our services
              constitutes acceptance of these Terms.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-xl">Marketplace Roles</h2>
            <p className="mt-3 text-sm">
              We operate a marketplace connecting Buyers and Sellers. Unless we
              expressly state otherwise, we are not the seller of listed items
              and are not responsible for product quality beyond Seller-provided
              warranties and statutory obligations.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-xl">Account & Security</h2>
            <p className="mt-3 text-sm">
              Keep your login credentials secure. You are responsible for
              activity under your account. Notify us immediately of suspected
              unauthorized access.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Listings & Prohibited Items</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>No counterfeit, stolen, or illegal goods.</li>
              <li>Restricted goods require valid licenses where applicable.</li>
              <li>Listings must be accurate, truthful, and comply with Nigerian laws.</li>
              <li>We may remove or suspend listings that violate policies.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Pricing, Payments & Fees</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Prices are set by Sellers. Taxes/VAT may apply.</li>
              <li>We may charge platform fees or commissions disclosed at checkout.</li>
              <li>Payments may be processed via approved gateways or cash-on-delivery where available.</li>
              <li>Chargebacks and fraud are investigated under NDPA/NDPR compliant processes.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Orders, Delivery & Risk</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Orders are confirmed when payment is authorized or validated.</li>
              <li>Delivery timelines are estimates; delays may occur due to logistics.</li>
              <li>Risk of loss transfers upon delivery to Buyer’s address or pickup.</li>
              <li>Inspect packages upon delivery and report issues within specified windows.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Returns & Refunds</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Eligibility depends on product type and Seller policy.</li>
              <li>Items must be in original condition unless defective.</li>
              <li>Refunds are processed to original payment method where possible.</li>
              <li>Abuse of return policy may lead to account action.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Ratings & Reviews</h3>
            <p className="mt-3 text-sm">
              Feedback must be honest and fair. No defamatory, obscene, or
              malicious content. We may moderate content to protect users.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Intellectual Property</h3>
            <p className="mt-3 text-sm">
              All trademarks, logos, and content on the platform are protected.
              Do not copy or misuse Seller or platform IP.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Data Protection & Privacy (Nigeria)</h3>
            <p className="mt-3 text-sm">
              We process personal data in line with the Nigeria Data Protection
              Act 2023 (NDPA) and the Nigeria Data Protection Regulation 2019
              (NDPR). See our <Link to="/privacy-policy" className="text-secondary font-semibold">Privacy Policy</Link> for details on
              lawful bases, rights, and retention.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Warranties & Liability</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Services are provided “as is” with reasonable skill and care.</li>
              <li>We do not guarantee uninterrupted access or error-free operation.</li>
              <li>To the fullest extent permitted by law, our liability is limited
                to direct losses arising from proven negligence, excluding
                indirect or consequential damages.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Indemnity & Compliance</h3>
            <p className="mt-3 text-sm">
              You agree to indemnify the platform against claims arising from
              your breach of these Terms, violation of law, or infringement of
              third-party rights. You must comply with applicable Nigerian laws,
              including consumer protection, e-commerce, tax, and data
              protection regulations.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Suspension & Termination</h3>
            <p className="mt-3 text-sm">
              We may suspend or terminate accounts for policy violations,
              fraud, abuse, or unlawful activity. Some obligations survive
              termination (e.g., payment and IP clauses).
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Dispute Resolution</h3>
            <p className="mt-3 text-sm">
              Parties should first attempt amicable resolution via customer
              support. If unresolved, disputes may be referred to mediation or
              arbitration under Nigerian law. Governing law and jurisdiction is
              Nigeria. Venue: Lagos.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Changes to Terms</h3>
            <p className="mt-3 text-sm">
              We may update these Terms to reflect operational, legal, or
              regulatory changes. Material updates will be communicated via
              platform notices or email.
            </p>
            <div className="mt-4">
              <Link to="/contact" className="text-secondary font-semibold">Ask a question</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-lg">Contact</h3>
          <p className="mt-3 text-sm">
            Email: <span className="font-semibold">help@marketcloseby.com</span> · Phone: <span className="font-semibold">+234 800 000 0000</span>
          </p>
        </div>
      </section>
    </div>
  );
}

