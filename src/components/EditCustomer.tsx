import { useState } from "react";
import {Button,Dialog,DialogContent,DialogTitle,DialogActions,TextField} from "@mui/material";
import type { Customer, CustomerForm } from "../types";
import { updateCustomer } from "../api/customerapi";

type EditCustomerProps = {
  fetchCustomers: () => void;
  customerRow: Customer;
};

export default function EditCustomer({ fetchCustomers, customerRow }: EditCustomerProps) {
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

    setCustomer({
      firstname: customerRow.firstname,
      lastname: customerRow.lastname,
      email: customerRow.email,
      phone: customerRow.phone,
      streetadress: customerRow.streetadress,
      postcode: customerRow.postcode,
      city: customerRow.city,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
  updateCustomer(customerRow._links.customer.href, customer)
    .then(() => {
      fetchCustomers();
      handleClose();
    })
    .catch(err => console.error(err));
};

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>Edit</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            label="First name"
            value={customer.firstname}
            onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
            fullWidth
            required
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Last name"
            value={customer.lastname}
            onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
            fullWidth
            required
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            fullWidth
            required
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Street address"
            value={customer.streetadress}
            onChange={(e) => setCustomer({ ...customer, streetadress: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            fullWidth
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
