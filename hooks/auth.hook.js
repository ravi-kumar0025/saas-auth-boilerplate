"use client";

import { useSession } from "@/lib/auth-client";

export default function useAuth() {
    const { data: session, isPending } = useSession();

    return {
        session,
        user: session?.user,
        isAuthenticated: !!session,
        isPending,
    };
}