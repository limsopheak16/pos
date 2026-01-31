"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithFormData } from "@/app/auth/auth";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action] = useActionState(loginWithFormData, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email address"
            type="email"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <LoginButton />
        <div className="flex justify-center">
          <Link className="text-sm underline" href="#">
            Forgot your password?
          </Link>
        </div>
      </div>
    </form>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}
