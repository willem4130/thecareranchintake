'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Loader2 } from 'lucide-react';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const error = searchParams?.get('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn('resend', {
        email,
        callbackUrl: '/questionnaire/1',
        redirect: false,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
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
              We've sent a magic link to <strong>{email}</strong>
            </p>

            <p className="text-center font-serif text-sm text-editorial-gray">
              Click the link in your email to sign in. The link expires in 24 hours.
            </p>
          </div>

          <p className="mt-6 text-center font-serif text-sm text-editorial-gray">
            Didn't receive an email?{' '}
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-bold text-primary underline hover:no-underline"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-editorial-ivory p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-serif text-4xl font-bold text-editorial-darkGray">
            The Care Ranch
          </h1>
          <p className="font-serif text-lg text-editorial-gray">Leadership Retreat Intake</p>
        </div>

        <div className="rounded-[3px] border-2 border-editorial-lightGray bg-white p-8 shadow-soft">
          <h2 className="mb-6 font-serif text-2xl font-bold text-editorial-darkGray">Sign In</h2>

          {error && (
            <div className="mb-4 rounded-[3px] border-2 border-red-300 bg-red-50 p-3">
              <p className="font-serif text-sm text-red-600">
                {error === 'OAuthAccountNotLinked'
                  ? 'This email is already associated with another sign-in method.'
                  : 'An error occurred. Please try again.'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-serif text-sm font-bold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="font-serif"
              />
              <p className="font-serif text-xs italic text-editorial-gray">
                We'll send you a magic link to sign in securely
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              size="lg"
              className="w-full gap-2 bg-primary font-serif text-lg font-bold hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending Magic Link...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Send Magic Link
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 rounded-[3px] border-2 border-editorial-lightGray bg-white p-4">
          <p className="font-serif text-sm text-editorial-gray">
            <strong className="text-editorial-darkGray">Why a magic link?</strong>
            <br />
            Magic links are a secure, password-free way to sign in. Simply click the link we email
            you, and you're in—no password to remember or enter.
          </p>
        </div>
      </div>
    </div>
  );
}
