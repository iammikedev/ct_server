import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { format } from "date-fns";
import ScanUserTable from '@/Components/tables/ScanUserTable';

export default function Index({ auth, scans }) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Scan - Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ScanUserTable scans={scans.data} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}