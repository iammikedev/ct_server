import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { format } from "date-fns";
import { Button } from "primereact/button";
import { router } from '@inertiajs/react'

const UserTable = ({ users }) => {

    const middleNameBody = (rowData) => {
        return rowData.user_profile.middlen_name ? rowData.user_profile.middle_name : '-';
    }

    const createdAtBody = (str) => {
        const date = new Date(str.created_at);
        return format(date, "MMM dd, yyyy hh:mm a");
    }

    const actionCellBody = (rowData) => {
        return (
            <Button
                icon="pi pi-pen-to-square"
                rounded
                text
                aria-label="View"
                type="button"
                onClick={() => router.get(`/user/${rowData.id}`,)}
            />
        )
    }


    return (
        <DataTable value={users} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
            <Column field="name" className="font-bold" frozen sortable header="Name"></Column>
            <Column field="email" sortable header="Email Address"></Column>
            <Column field="user_profile.first_name" sortable header="First Name"></Column>
            <Column field="user_profile.middle_name" sortable header="Middle Name" body={middleNameBody}></Column>
            <Column field="user_profile.last_name" sortable header="Last Name"></Column>
            <Column field="user_profile.address" sortable header="Address"></Column>
            <Column field="created_at" sortable header="Created At" body={createdAtBody}></Column>
            <Column header="Action" body={actionCellBody}></Column>
        </DataTable>
    );
}

export default UserTable;