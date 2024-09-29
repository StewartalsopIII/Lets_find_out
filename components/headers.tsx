"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isSignedIn && user) {
      createOrVerifyUserProfile();
    }
  }, [isSignedIn, user]);

  const createOrVerifyUserProfile = async () => {
    try {
      const response = await fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create or verify user profile');
      }

      const data = await response.json();
      console.log('User profile:', data);
    } catch (error) {
      console.error('Error creating or verifying user profile:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4 justify-end mt-4 mr-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
}