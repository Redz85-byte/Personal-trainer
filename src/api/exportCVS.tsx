import type { Customer } from "../types";

export function exportCustomersToCSV(customers: Customer[]) {
  if (customers.length === 0) return;

  const headers = ["firstname", "lastname", "streetadress", "postcode", "city", "email", "phone"];
  const rows = customers.map(c => [
    c.firstname,
    c.lastname,
    c.streetadress,
    c.postcode,
    c.city,
    c.email,
    c.phone,
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "customers.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
