"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
// import { useSession } from "@/lib/auth-client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function WelcomePage() {


    const router = useRouter();
    const { data, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !data) {
            router.push("/");
        }
    }, [isPending, data, router]);

    if (isPending) {
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };


    const user = data?.user;

    return (
        <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    {user?.image && (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-20 h-20 rounded-full mx-auto mb-4 border"
                        />
                    )}

                    <CardTitle className="text-3xl">
                        Welcome 👋
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Name
                            </p>
                            <p className="text-lg font-semibold">
                                {user?.name || "Not Available"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Email
                            </p>
                            <p className="text-lg font-semibold break-all">
                                {user?.email || "Not Available"}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full cursor-pointer"
                    >
                        Logout
                    </Button>

                </CardContent>
            </Card>
        </main>
    );
}