import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { getTrainingsWithCustomer } from "../api/trainingapi";
import type { Training } from "../types";

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getTrainingsWithCustomer()
      .then((data: Training[]) => {
        const mapped = data.map(t => ({
          title: `${t.activity} (${t.customer ? t.customer.firstname : ""})`,
          start: t.date,
          end: dayjs(t.date).add(t.duration, "minute").toISOString(),
        }));
        setEvents(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Card sx={{ width: "90%", margin: "30px auto", boxShadow: 3 }}>
      <CardContent sx={{ padding: 2 }}>
        <div style={{ height: 600, overflowY: "auto" }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            height="100%" 
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            allDaySlot={false} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
