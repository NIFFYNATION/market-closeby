import React from "react";
import { Link } from "react-router-dom";

export default function BulkPurchase() {
  return (
    <div className="min-h-screen bg-background text-black">
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 mt-34">
          <div className="flex items-center gap-3">
            <img src="/icons/shop-bold.svg" alt="Bulk" className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-extrabold">Bulk Purchase</h1>
          </div>
          <p className="mt-4 max-w-3xl">
            Buy in volume for your business, team, or special events and enjoy
            competitive pricing, dedicated support, and reliable nationwide
            delivery.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/contact" className="bg-secondary px-5 py-3 rounded-md font-semibold">
              Talk to Sales
            </Link>
            <a href="mailto:help@marketcloseby.com" className="bg-white text-primary px-5 py-3 rounded-md font-semibold">
              Email Us
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold">Why Bulk with Market Closeby?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <img src="/icons/graph.svg" alt="Pricing" className="w-8 h-8" />
              <h3 className="font-bold text-lg">Tiered Discounts</h3>
            </div>
            <p className="mt-3 text-sm">
              Save more as you buy more with transparent volume-based pricing.
              We can quote per SKU or mixed baskets.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <img src="/icons/verified-user.svg" alt="Sourcing" className="w-8 h-8" />
              <h3 className="font-bold text-lg">Verified Sellers</h3>
            </div>
            <p className="mt-3 text-sm">
              We match you with trusted merchants for consistent quality and
              stable supply.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <img src="/icons/shipping-filled.svg" alt="Delivery" className="w-8 h-8" />
              <h3 className="font-bold text-lg">Nationwide Logistics</h3>
            </div>
            <p className="mt-3 text-sm">
              Reliable delivery to offices, warehouses, and event venues across
              Nigeria.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Who It’s For</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Companies, SMEs, NGOs, Schools, and Government agencies.</li>
              <li>Event planners, caterers, and uniform procurement teams.</li>
              <li>Retailers and distributors restocking inventory.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Popular Categories</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Electronics and accessories</li>
              <li>Home & kitchen appliances</li>
              <li>Groceries and consumables</li>
              <li>Fashion, uniforms, and corporate gifts</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Pricing & Quotations</h3>
            <p className="mt-3 text-sm">
              Share your SKU list or requirements. We’ll provide a tailored
              quotation including discounts, delivery timelines, and payment
              terms.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Payment & Invoicing</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Bank transfer, POS, or payment gateway options.</li>
              <li>Official invoice and receipt provided with VAT where applicable.</li>
              <li>Advance payment may be required for custom or large orders.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Delivery & Fulfilment</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Standard and express options depending on location and volume.</li>
              <li>Split deliveries to multiple addresses available on request.</li>
              <li>Tracking and proof-of-delivery shared for each shipment.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg">Returns & Warranty</h3>
            <p className="mt-3 text-sm">
              Returns follow our platform policy and Seller terms. Warranty
              coverage depends on product type and manufacturer support.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-lg">How It Works</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <div className="text-xs font-semibold text-secondary">Step 1</div>
              <div className="mt-1 font-bold">Share Requirements</div>
              <div className="mt-2 text-sm">Send product list, quantities, and delivery locations.</div>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-xs font-semibold text-secondary">Step 2</div>
              <div className="mt-1 font-bold">Get a Quote</div>
              <div className="mt-2 text-sm">Receive transparent pricing and fulfilment plan.</div>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-xs font-semibold text-secondary">Step 3</div>
              <div className="mt-1 font-bold">Confirm & Pay</div>
              <div className="mt-2 text-sm">Approve the order and make payment.</div>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-xs font-semibold text-secondary">Step 4</div>
              <div className="mt-1 font-bold">Track Delivery</div>
              <div className="mt-2 text-sm">Receive updates and proof-of-delivery.</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/contact" className="bg-secondary text-white px-5 py-3 rounded-md font-semibold">
            Request a Quote
          </Link>
          <a href="tel:+2348000000000" className="px-5 py-3 rounded-md font-semibold border border-primary text-primary">
            Call +234 800 000 0000
          </a>
          <a href="mailto:help@marketcloseby.com" className="px-5 py-3 rounded-md font-semibold border border-primary text-primary">
            Email help@marketcloseby.com
          </a>
        </div>
      </section>
    </div>
  );
}

