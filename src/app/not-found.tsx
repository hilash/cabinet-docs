import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page is not part of the public Cabinet docs export.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to docs
        </Link>
      </div>
    </main>
  );
}
