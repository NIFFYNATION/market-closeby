import React from 'react';

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mt-18 sm:mt-38 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-18">
          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy (Nigeria, 2025)</h1>
          <p className="mt-2 opacity-90">Effective date: 01 January 2025 • Last updated: 01 January 2025</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 bg-white">
        {/* Introduction */}
        <h2 className="text-2xl font-bold text-gray-900">Introduction & Applicability</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Market Closeby ("we", "our", "us") provides an online marketplace connecting buyers with sellers and logistics partners. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, mobile site, and related services in Nigeria. It complies with the Nigeria Data Protection Act, 2023 (NDPA) and the Nigeria Data Protection Regulation, 2019 (NDPR), as supervised by the Nigeria Data Protection Commission (NDPC).
        </p>
        <p className="mt-3 text-gray-700">By using our services, you consent to the practices described in this Policy. If you do not agree, please do not use the services.</p>

        {/* Information We Collect */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Information We Collect</h2>
        <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
          <li>Personal information: name, phone number, email, address, date of birth.</li>
          <li>Account details: usernames, preferences, saved addresses, wishlist, order history.</li>
          <li>Location information: city/state selection and approximate location (when you enable location features).</li>
          <li>Transactional data: items purchased, payment method, payment status, refunds.</li>
          <li>Device & usage data: IP address, browser type/version, app and device identifiers, pages viewed, time spent, clicks, referrer.</li>
          <li>Communications: messages with customer support, reviews, ratings, and chats with sellers.</li>
          <li>Cookies & similar technologies: session cookies, analytics cookies, advertising cookies, and localStorage used to remember preferences (e.g., selected city).</li>
        </ul>

        {/* How We Use Information */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">How We Use Your Information</h2>
        <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
          <li>Provide, operate, and improve our marketplace, including search, checkout, and delivery.</li>
          <li>Process orders and payments; communicate order updates and delivery status.</li>
          <li>Personalize content, recommendations, and offers based on your activity.</li>
          <li>Prevent fraud, enforce our Terms of Use, and ensure platform safety.</li>
          <li>Respond to your requests, support tickets, and feedback.</li>
          <li>Comply with legal obligations and valid law-enforcement requests in Nigeria.</li>
        </ul>

        {/* Cookies */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Cookies & Tracking Technologies</h2>
        <p className="mt-3 text-gray-700">We use cookies, pixels, and SDKs to:</p>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li>Keep you signed in and remember preferences (e.g., selected city).</li>
          <li>Measure traffic and performance (analytics).</li>
          <li>Show relevant ads and offers (where applicable).</li>
        </ul>
        <p className="mt-3 text-gray-700">You can control cookies via your browser settings. Disabling certain cookies may affect functionality.</p>

        {/* Data Sharing */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Data Sharing</h2>
        <p className="mt-3 text-gray-700">We may share limited data with:</p>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li>Seller partners to fulfil orders and provide customer support.</li>
          <li>Delivery partners and logistics providers for pickup and delivery.</li>
          <li>Payment gateways and processors to complete transactions (we do not store full card details).</li>
          <li>Customer support tools, analytics providers, and cloud hosting services.</li>
          <li>Government authorities or law enforcement when required by Nigerian law.</li>
        </ul>
        <p className="mt-3 text-gray-700">We do not sell your personal data.</p>

        {/* Data Retention */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Data Retention</h2>
        <p className="mt-3 text-gray-700">We retain personal data for as long as needed to provide services, comply with law, resolve disputes, and enforce agreements. Typical retention periods:</p>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li>Account information: retained while the account is active or until deletion.</li>
          <li>Order & invoice records: up to 8 years to comply with tax and accounting requirements.</li>
          <li>Support communications: up to 24 months for quality and audit.</li>
        </ul>

        {/* Your Rights */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Your Rights (NDPA/NDPR)</h2>
        <p className="mt-3 text-gray-700">Under Nigerian data protection laws, you have the right to:</p>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li>Be informed about how your data is processed.</li>
          <li>Access personal data we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion of data subject to legal limitations.</li>
          <li>Withdraw consent for processing where consent is the basis.</li>
          <li>Lodge a complaint with the Nigeria Data Protection Commission (NDPC).</li>
        </ul>
        <p className="mt-3 text-gray-700">To exercise these rights, email us using the details below. We aim to respond within 15 working days.</p>

        {/* Security */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Security Measures</h2>
        <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
          <li>Encryption in transit (HTTPS) and industry-standard security practices.</li>
          <li>Access controls, role-based permissions, and audit logging.</li>
          <li>Vendor due diligence and contractual safeguards.</li>
          <li>Internal policies and employee training on data handling.</li>
        </ul>

        {/* Children */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Children’s Privacy</h2>
        <p className="mt-3 text-gray-700">Our services are not directed to children under 18. We do not knowingly collect personal data from children. If you are a parent/guardian and believe your child has provided data, contact us to delete it.</p>

        {/* Changes */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Changes to this Policy</h2>
        <p className="mt-3 text-gray-700">We may update this Policy periodically. We will notify you via the website/app or email when changes are material. Please review this page regularly.</p>

        {/* Grievance Officer */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Grievance Officer</h2>
        <p className="mt-3 text-gray-700">In accordance with the NDPA/NDPR and applicable Nigerian regulations, our Grievance Officer details are:</p>
        <div className="mt-3 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-gray-800"><span className="font-semibold">Name:</span> Chidi Okafor</p>
          <p className="text-gray-800"><span className="font-semibold">Email:</span> grievance@domain.com</p>
          <p className="text-gray-800"><span className="font-semibold">Phone:</span> +234 800 000 0000</p>
          <p className="text-gray-800"><span className="font-semibold">Address:</span> 123 Market Street, Victoria Island, Lagos, Nigeria</p>
        </div>

        {/* Contact */}
        <h2 className="mt-10 text-2xl font-bold text-gray-900">Contact Us</h2>
        <p className="mt-3 text-gray-700">For privacy questions, rights requests, or complaints, contact:</p>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li>Email: privacy@domain.com</li>
          <li>Support: support@domain.com • Whatsapp: +234 900 000 0000</li>
          <li>Postal: 123 Market Street, Victoria Island, Lagos, Nigeria</li>
        </ul>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
