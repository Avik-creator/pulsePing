"use client";

import { Zap } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductSignIn() {
  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Zap size={48} className="mx-auto mb-4 text-gray-900" />
          <CardTitle className="text-2xl font-semibold">PulsePing</CardTitle>
          <CardDescription>
            Jumpstart your project with instant user engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Free and open-source
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
