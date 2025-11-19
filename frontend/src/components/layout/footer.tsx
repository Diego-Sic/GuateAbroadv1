import Link from 'next/link';

const footerLinks = {
  platform: [
    { href: '/forum', label: 'Forum' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/auth/register', label: 'Get Started' },
  ],
  resources: [
    { href: '#', label: 'Scholarship Guide' },
    { href: '#', label: 'Test Prep' },
    { href: '#', label: 'Essay Tips' },
  ],
  company: [
    { href: '#about', label: 'About Us' },
    { href: '#', label: 'Contact' },
    { href: '#', label: 'Privacy Policy' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold text-primary">
              GuateAbroad
            </Link>
            <p className="text-sm text-muted-foreground">
              Helping Guatemalan students achieve their dreams of studying in
              the United States.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GuateAbroad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
