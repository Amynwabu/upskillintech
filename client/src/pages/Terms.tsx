import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700 leading-7">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using upskillintech.com ("Website") and our services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not access or use our Website or Services.
            </p>
            <p className="mt-4">
              UpskillinTech reserves the right to modify these Terms at any time. Your continued use of the Website following any changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p>
              We grant you a non-exclusive, non-transferable, limited right to access and use the Website and Services for your personal, educational, or business purposes, subject to these Terms.
            </p>
            <p className="mt-4">You agree not to:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Reproduce, duplicate, or copy content for commercial purposes</li>
              <li>Modify or alter the Website or Services</li>
              <li>Use automated tools to download or access content without permission</li>
              <li>Reverse engineer or attempt to derive source code</li>
              <li>Remove or obscure any proprietary notices or labels</li>
              <li>Use the Website for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p>
              To access certain features of our Services, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials and are liable for all activities under your account.
            </p>
            <p className="mt-4">
              You agree to provide accurate, current, and complete information when creating your account. You must notify us immediately of any unauthorized access or use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property Rights</h2>
            <p>
              All content on the Website, including text, graphics, logos, images, audio, video, and software, is the property of UpskillinTech or its content suppliers and is protected by UK and international copyright laws.
            </p>
            <p className="mt-4">
              You retain ownership of any content you submit to our Services. However, by submitting content, you grant UpskillinTech a worldwide, royalty-free, perpetual license to use, copy, modify, and distribute your content for our business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment and Billing</h2>
            <p>
              For paid Services, you agree to pay the fees stated at the time of purchase. All prices are exclusive of VAT, which will be added where applicable.
            </p>
            <p className="mt-4">Payment terms:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Invoices are issued for fees incurred</li>
              <li>Payment is due within 30 days of invoice date unless otherwise agreed</li>
              <li>Late payments may incur additional charges</li>
              <li>Subscriptions renew automatically unless cancelled</li>
              <li>Cancellation requests must be made 7 days before renewal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Policy</h2>
            <p>
              We offer a 14-day refund period for most Services as required by UK Consumer Rights legislation, provided the Service has not been substantially used.
            </p>
            <p className="mt-4">
              To request a refund, contact support@upskillintech.com within 14 days of purchase with your order details. Approved refunds will be processed to your original payment method within 5-10 business days.
            </p>
            <p className="mt-4">
              Certain Services may have different refund terms. Custom or personalized services are non-refundable once delivery has commenced.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              The Website and Services are provided on an "AS IS" and "AS AVAILABLE" basis without any warranties, express or implied.
            </p>
            <p className="mt-4">
              UpskillinTech disclaims all warranties, including but not limited to:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
              <li>Accuracy, reliability, or completeness of content</li>
            </ul>
            <p className="mt-4">
              We do not warrant that the Website will be error-free, uninterrupted, or secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, UpskillinTech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, loss of data, or business interruption, arising from your use of the Website or Services.
            </p>
            <p className="mt-4">
              Our total liability for any claims arising from these Terms shall not exceed the amount paid by you for the Services that are the subject of the claim, or £100, whichever is greater.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless UpskillinTech, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Your use of the Website or Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any applicable law or regulation</li>
              <li>Your infringement of third-party rights</li>
              <li>Content you submit or transmit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Prohibited Conduct</h2>
            <p>
              You agree not to engage in any of the following prohibited conduct:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Harassing, threatening, or abusing other users</li>
              <li>Posting spam, unsolicited promotions, or advertisements</li>
              <li>Attempting to gain unauthorized access to the Website</li>
              <li>Uploading malware, viruses, or harmful code</li>
              <li>Impersonating other users or UpskillinTech staff</li>
              <li>Engaging in any unlawful or fraudulent activity</li>
              <li>Violating any third-party intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Suspension and Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to the Services at any time, with or without cause, and with or without notice. Reasons for suspension or termination may include:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Violation of these Terms</li>
              <li>Engaging in prohibited conduct</li>
              <li>Non-payment of fees</li>
              <li>Suspected fraudulent or illegal activity</li>
            </ul>
            <p className="mt-4">
              Upon termination, your rights to use the Services immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Third-Party Services</h2>
            <p>
              The Website may contain links to third-party websites and services. We are not responsible for the content, policies, or practices of third-party services. Your use of third-party services is subject to their terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of laws principles.
            </p>
            <p className="mt-4">
              You agree to submit to the exclusive jurisdiction of the courts located in England and Wales for any legal proceedings arising from these Terms or the Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Dispute Resolution</h2>
            <p>
              Before initiating legal proceedings, we encourage you to contact us at support@upskillintech.com to attempt to resolve any disputes. We will attempt to resolve complaints within 30 days of receipt.
            </p>
            <p className="mt-4">
              If informal resolution fails, disputes may be escalated to mediation or arbitration before proceeding to litigation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect, and the invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and UpskillinTech regarding the use of the Website and Services, and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <p><strong>UpskillinTech</strong></p>
              <p>Email: support@upskillintech.com</p>
              <p>Website: upskillintech.com</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
