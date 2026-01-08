'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function PrivacyPolicyDialog() {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-primary hover:underline transition-colors inline">
          Privacy Policy
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Privacy Policy
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto"
          >
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Information We Collect</strong>
                      </p>
                      <p>
                        ReLoop collects personal information including name, email address, phone number, and shipping address when you create an account. We also collect transaction data, browsing history, and device information to improve our services and user experience.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>How We Use Your Information</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Process and fulfill marketplace transactions</li>
                        <li>Communicate about orders, listings, and account updates</li>
                        <li>Improve platform functionality and user experience</li>
                        <li>Prevent fraud and ensure platform security</li>
                        <li>Send promotional content (with your consent)</li>
                        <li>Analyze usage patterns and trends</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Information Sharing</strong>
                      </p>
                      <p>
                        We do not sell your personal information to third parties. Information may be shared with service providers who assist in platform operations (payment processors, shipping partners), law enforcement when required by law, or in connection with business transfers or acquisitions.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Data Security</strong>
                      </p>
                      <p>
                        ReLoop employs industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Cookies and Tracking</strong>
                      </p>
                      <p>
                        We use cookies and similar technologies to enhance user experience, remember preferences, and analyze platform usage. You can control cookie settings through your browser, though some features may not function properly if cookies are disabled.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Your Rights and Choices</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Access, update, or delete your personal information</li>
                        <li>Opt-out of promotional communications</li>
                        <li>Request data portability</li>
                        <li>Object to certain data processing activities</li>
                        <li>Withdraw consent at any time</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Data Retention</strong>
                      </p>
                      <p>
                        We retain your personal information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain information for legal compliance, dispute resolution, and enforcing our agreements.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Children&apos;s Privacy</strong>
                      </p>
                      <p>
                        ReLoop is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If we discover we have collected information from a child, we will delete it promptly.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>International Data Transfers</strong>
                      </p>
                      <p>
                        Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Changes to This Policy</strong>
                      </p>
                      <p>
                        We may update this privacy policy periodically. We will notify you of significant changes via email or platform notification. Your continued use of ReLoop after changes constitutes acceptance of the updated policy.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Contact Us</strong>
                      </p>
                      <p>
                        For questions or concerns about this privacy policy or our data practices, please contact us at privacy@reloop.com or through our support page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t px-6 py-4 sm:items-center">
          {!hasReadToBottom && (
            <span className="text-muted-foreground grow text-xs max-sm:text-center">
              Read all policy before accepting.
            </span>
          )}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" disabled={!hasReadToBottom}>
              I understand
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
