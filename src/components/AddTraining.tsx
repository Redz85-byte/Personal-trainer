import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { addTraining } from "../api/trainingapi";
import type { NewTraining } from "../types";

type AddTrainingProps = {
    customerLink: string;
    fetchTrainings: () => void;
}

export default function AddTrainingComponent({ customerLink, fetchTrainings }: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [activity, setActivity] = useState("");
    const [duration, setDuration] = useState<number | "">("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setDate(dayjs());
        setActivity("");
        setDuration("");
    };

    const handleSave = () => {
        if (!activity || !duration) {
            alert("Fill all fields");
            return;
        }

        const newTraining: NewTraining = {
            date: date.toISOString(),
            activity,
            duration: Number(duration),
            customer: customerLink,
        };

        addTraining(newTraining)
            .then(() => {
                fetchTrainings();
                handleClose();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date & Time"
                            value={date}
                            onChange={(newValue: Dayjs | null) => setDate(newValue ?? dayjs())}
                        />
                    </LocalizationProvider>

                    <TextField
                        margin="dense"
                        label="Activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        fullWidth
                        required
                        variant="standard"
                    />

                    <TextField
                        margin="dense"
                        label="Duration (minutes)"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value === "" ? "" : Number(e.target.value))}
                        fullWidth
                        required
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
