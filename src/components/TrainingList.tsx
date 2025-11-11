import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Training } from "../types";
import { getTrainingsWithCustomer } from "../api/trainingapi";
import dayjs from "dayjs";

function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    useEffect(() => {
        getTrainingsWithCustomer()
            .then((data) => {
                console.log("Fetched trainings:", data);
                setTrainings(data);
            })
            .catch((err) => console.error(err));
    }, []);

    const columns: GridColDef[] = [
        {
            field: "date",
            headerName: "Date",
            width: 180,
            renderCell: (params) => {
                const dateStr = params.row.date;
                return dateStr ? dayjs(dateStr).format("DD.MM.YYYY HH:mm") : "";
            },
        },
        { field: "duration", headerName: "Duration (min)", width: 150 },
        { field: "activity", headerName: "Activity", width: 150 },
        {
            field: "customer",
            headerName: "Customer",
            width: 220,
            renderCell: (params) => {
                const c = params.row.customer;
                return c ? `${c.firstname} ${c.lastname}` : "No customer";
            },
        },
    ];

    return (
        <div style={{ width: "80%", height: 500, margin: "50px auto 0 auto" }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row.id}
                autoPageSize
                rowSelection={false}
            />
        </div>
    );
}

export default TrainingList;

