import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { format } from "date-fns";

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

                    <DataTable value={scans} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                        <Column field="host.name" className="font-bold" frozen sortable header="Host"></Column>
                        <Column field="user.name" frozen sortable header="Scanned User"></Column>
                        <Column field="created_at" sortable header="Scanned At" body={createdAtBody}></Column>
                    </DataTable>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}