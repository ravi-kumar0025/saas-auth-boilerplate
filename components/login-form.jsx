"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, } from "@/components/ui/field";

export default function LoginForm({ className, ...props }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { data, isPending } = useSession();

    const handleGoogleAuth = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/welcome",
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await signIn.email({
            email,
            password,
        });
        if (result.error) {
            console.log("LOGIN ERROR:", result.error);
            alert(result.error.message);
            return;
        }
        window.location.href = "/welcome";
    };

    useEffect(() => {
        if (!isPending && data) {
            router.push("/welcome");
        }
    }, [isPending, data, router]);

    return (
        <div
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Welcome Back
                    </CardTitle>

                    <CardDescription>
                        Login with Google or Email
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin}>
                        <FieldGroup>
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleGoogleAuth}
                                    className="cursor-pointer w-full"
                                >
                                    Login with Google
                                </Button>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email
                                </FieldLabel>

                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>

                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Login
                                </Button>

                                <FieldDescription className="text-center">
                                    New users will automatically get an
                                    account created.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}