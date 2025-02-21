import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { format } from "date-fns";

const ScanUserTable = ({ scans }) => {

    const createdAtBody = (str) => {
        const date = new Date(str.created_at);
        return format(date, "MMM dd, yyyy hh:mm a");
    }

    return (
        <DataTable value={scans} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
            <Column field="host.name" className="font-bold" frozen sortable header="Host"></Column>
            <Column field="user.name" frozen sortable header="Scanned User"></Column>
            <Column field="created_at" sortable header="Scanned At" body={createdAtBody}></Column>
        </DataTable>
    )
}

export default ScanUserTable;