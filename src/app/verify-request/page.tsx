import { Mail } from 'lucide-react';

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-editorial-ivory p-4">
      <div className="w-full max-w-md">
        <div className="rounded-[3px] border-2 border-editorial-lightGray bg-white p-8 shadow-soft">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="mb-3 text-center font-serif text-2xl font-bold text-editorial-darkGray">
            Check Your Email
          </h1>

          <p className="mb-6 text-center font-serif text-base text-editorial-gray">
            A sign-in link has been sent to your email address.
          </p>

          <div className="space-y-3 rounded-[3px] bg-editorial-lightGray/30 p-4">
            <p className="font-serif text-sm text-editorial-darkGray">
              <strong>What to do next:</strong>
            </p>
            <ol className="list-inside list-decimal space-y-2 font-serif text-sm text-editorial-gray">
              <li>Check your email inbox</li>
              <li>Click the magic link in the email</li>
              <li>You'll be automatically signed in</li>
            </ol>
          </div>

          <p className="mt-6 text-center font-serif text-xs text-editorial-gray">
            The link expires in 24 hours. If you don't see the email, check your spam folder.
          </p>
        </div>

        <p className="mt-6 text-center font-serif text-sm text-editorial-gray">
          <a href="/sign-in" className="font-bold text-primary underline hover:no-underline">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
