import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { format } from "date-fns";

const ScanUserTable = ({ scans, excludedFields }) => {

    const createdAtBody = (str) => {
        const date = new Date(str.created_at);
        return format(date, "MMM dd, yyyy hh:mm a");
    }

    const columns = [
        {
            field: "host.name",
            header: "Host",
        },
        {
            field: "user.name",
            header: "Scanned User"
        },
        {
            field: "created_at",
            header: "Scanned At"
        }
    ];

    return (
        <DataTable value={scans} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
            {columns.map((column, index) => {
                if (Array.isArray(excludedFields) && excludedFields.includes(column.field)) {
                    return null;
                }

                return <Column key={index} field={column.field} sortable header={column.header} body={column.field == 'created_at' ? createdAtBody : null}></Column>
            }
            )}
        </DataTable>
    )
}

export default ScanUserTable;