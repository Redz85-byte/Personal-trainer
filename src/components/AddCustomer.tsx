import { useState } from "react";
import { AddCustomer } from "../api/customerapi";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { CustomerForm } from "../types";

type AddCustomerProps = {
  fetchCustomers: () => void;
}

export default function AddCustomerComponent({ fetchCustomers }: AddCustomerProps) {

  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState<CustomerForm>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetadress: "",
    postcode: "",
    city: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCustomer({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      streetadress: "",
      postcode: "",
      city: "",
    });
  };

  const handleSave = () => {
    if (!customer.firstname || !customer.lastname || !customer.email) {
      alert("Fill all fields");
      return;
    }

    AddCustomer(customer)
      .then(() => {
        fetchCustomers();
        handleClose();
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add customer
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add customer</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            label="First name"
            value={customer.firstname}
            onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
            fullWidth
            required
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Last name"
            value={customer.lastname}
            onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
            fullWidth
            required
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={e => setCustomer({ ...customer, email: e.target.value })}
            fullWidth
            required
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            onChange={e => setCustomer({ ...customer, phone: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Street address"
            value={customer.streetadress}
            onChange={e => setCustomer({ ...customer, streetadress: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={e => setCustomer({ ...customer, city: e.target.value })}
            fullWidth
            variant="standard"
          />

          <Button onClick={handleSave} style={{ marginTop: "1rem" }}>
            Save
          </Button>
        </DialogContent>
        <Button onClick={handleClose} style={{ marginTop: "1rem" }}>
            Cancel</Button>
      </Dialog>
    </>
  );
}
