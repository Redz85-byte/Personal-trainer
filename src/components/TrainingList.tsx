import { useEffect, useState } from "react";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import type { Training } from "../types";
import { deleteTraining, getTrainingsWithCustomer } from "../api/trainingapi";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import AddTrainingComponent from "./AddTraining"; 
import DeleteIcon from '@mui/icons-material/Delete';


function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const fetchTrainings = () => {
        getTrainingsWithCustomer()
            .then((data) => {
                console.log("Fetched trainings:", data);
                setTrainings(data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            deleteTraining(url)
                .then(() => fetchTrainings())
                .catch((err) => console.error(err));
        }
    };

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
        {
            headerName: "Action",
            sortable: false,
            filterable: false,
            field: '_links.self.href',
            renderCell: (params: GridRenderCellParams) =>
              <IconButton
        color="error"
        size="small"
        onClick={() => handleDelete(params.row._links.self.href)}
      >
        <DeleteIcon />
      </IconButton>
        },

    ];

    return (
        <div style={{ width: "80%", height: 500, margin: "50px auto 0 auto" }}>
            
            <AddTrainingComponent 
          customerLink="https://myserver.personaltrainer.api/api/customers/123" 
          fetchTrainings={fetchTrainings} 
        />
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

