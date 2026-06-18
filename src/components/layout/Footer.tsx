export const Footer = () => {
    return (
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-[var(--muted)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-sm">© 2026 joborg. All rights reserved.</p>
  
          <div className="flex items-center gap-4 text-sm">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    );
  };