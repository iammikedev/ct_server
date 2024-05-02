import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

export default function Index({ auth, establishments }) {
    const [createVisible, setCreateVisible] = useState(false);

    const nameBody = (rowData) => {
        return `${rowData.first_name} ${rowData.last_name}`
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Establishments</h2>}
        >
            <Head title="Establishments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button type="button" label="Create" icon="pi pi-plus" size="small" className="mb-4" onClick={() => setCreateVisible(true)}/>

                    <DataTable value={establishments.data} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                        <Column field="establishment_code" className="font-bold" frozen sortable header="Code"></Column>
                        <Column field="establishment_name" sortable header="Name"></Column>
                        <Column field="email_address" sortable header="Email Address"></Column>
                        <Column field="first_name" sortable body={nameBody} header="Contact Person"></Column>
                        <Column field="address" sortable header="Address"></Column>
                        <Column field="baranggay" sortable header="Baranggay"></Column>
                        <Column field="created_at" sortable header="Created At"></Column>
                    </DataTable>
                </div>
            </div>

            <Dialog header="Header" visible={createVisible} style={{ width: '50vw' }} onHide={() => setCreateVisible(false)}>
                <p className="m-0">
                    
                </p>
            </Dialog>
        </AuthenticatedLayout>
    );
}
