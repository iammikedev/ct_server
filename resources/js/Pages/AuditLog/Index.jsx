import { Head } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { format } from "date-fns";

export default function Index({ auth, logs }) {
    const title = 'Audit Log';
    const beforeBody = (rowData) => {
        const row = JSON.stringify(rowData.old_values);
        if (row === '[]') return '-';
        return row;
    }

    const afterBody = (rowData) => {
        const row = JSON.stringify(rowData.new_values);
        if (row === '[]') return '-';
        return row;
    }

    const eventBody = (str) => {
        return formatLetter(str.event);
    }

    const timeBody = (str) => {
        const date = new Date(str.created_at);
        return format(date, "MMM dd, yyyy hh:mm a");
    }


    const formatLetter = (str) => {
        if (!str) return '';
        return str.toString().charAt(0).toUpperCase() + str.toString().slice(1);
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <div className="py-12">
                <div className="md:w-full xl:max-w-screen-2xl mx-auto px-6">
                    <h3 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">{title}</h3>
                    <DataTable value={logs} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                        <Column field="created_at" sortable header="Time" body={timeBody}></Column>
                        <Column field="event" sortable header="Event" body={eventBody}></Column>
                        <Column field="tags" sortable header="Type"></Column>
                        <Column field="user.email" sortable header="Account"></Column>
                        <Column field="ip_address" sortable header="IP Address"></Column>
                        <Column field="old_values" sortable header="Before" body={beforeBody}></Column>
                        <Column field="new_values" sortable header="After" body={afterBody}></Column>
                    </DataTable>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

