import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { format } from "date-fns";
import ScanUserTable from '@/Components/tables/ScanUserTable';

export default function Index({ auth, scans }) {
    const createdAtBody = (str) => {
        const date = new Date(str.created_at);
        return format(date, "MMM dd, yyyy hh:mm a");
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Scan - Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ScanUserTable scans={scans} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}