"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupWithFormData } from "@/app/auth/auth";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [state, action] = useActionState(signupWithFormData, undefined);

  // Redirect to login on successful registration
  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Wait 2 seconds to show success message
    }
  }, [state?.success, router]);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Choose a username"
            type="text"
          />
          {state?.errors?.username && (
            <p className="text-sm text-red-500">{state.errors.username}</p>
          )}
        </div>
        
        <div className="mt-4">
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Create a strong password"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>

        <div className="mt-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
          />
          {state?.errors?.confirmPassword && (
            <p className="text-sm text-red-500">{state.errors.confirmPassword}</p>
          )}
        </div>
        
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        
        {state?.success && (
          <p className="text-sm text-green-500">
            Account created successfully! Redirecting to login...
          </p>
        )}
        
        <RegisterButton />
      </div>
    </form>
  );
}

export function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      aria-disabled={pending} 
      type="submit" 
      className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
    >
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}
