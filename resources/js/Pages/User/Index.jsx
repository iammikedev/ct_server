import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UserTable from "@/Components/tables/UserTable";

export default function Index({ auth, users }) {
    return (
        <AuthenticatedLayout user={auth.user}>

            <Head title="Establishments" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <UserTable users={users} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}