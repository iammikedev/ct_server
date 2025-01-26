import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { format } from "date-fns";

export default function Index({ auth, users }) {

    const middleNameBody = (rowData) => {
        return rowData.user_profile.middlen_name ? rowData.user_profile.middle_name : '-';
    }

    const createdAtBody = (str) => {
        const date = new Date(str.created_at);
        return format(date, "MMM dd, yyyy hh:mm a");
    }

    return (
        <AuthenticatedLayout user={auth.user}>

            <Head title="Establishments" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable value={users} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                        <Column field="name" className="font-bold" frozen sortable header="Name"></Column>
                        <Column field="email" sortable header="Email Address"></Column>
                        <Column field="user_profile.first_name" sortable header="First Name"></Column>
                        <Column field="user_profile.middle_name" sortable header="Middle Name" body={middleNameBody}></Column>
                        <Column field="user_profile.last_name" sortable header="Last Name"></Column>
                        <Column field="user_profile.address" sortable header="Address"></Column>
                        <Column field="created_at" sortable header="Created At" body={createdAtBody}></Column>
                    </DataTable>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}