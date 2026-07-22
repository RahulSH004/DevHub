// call the requireAdmin function in the server component to check if the user is an admin and protect evverthing in this layout

import { requireAdmin } from "@/app/lib/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await requireAdmin();
    return <>{children}</>;
}