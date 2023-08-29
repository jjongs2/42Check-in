import apiController from '@/utils/apiController';
import getISODate from '@/utils/getISODate';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

function getHoursIndex(time: Date): number {
  const hours = time.getHours() + time.getMinutes() / 60;
  return (hours - 8) * 2;
}

export default function Timeline(): ReactElement {
  const calendarRef = useRef(null);
  const router = useRouter();
  const [date, setDate] = useState<string>();
  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();

  function getTimeMask(): number {
    let mask = 0b0;
    for (let i = 0; i < 24; ++i) {
      if (startIndex <= i && i < endIndex) {
        mask |= 1 << i;
      }
    }
    for (let i = 24; i < 30; ++i) {}
    for (let i = 30; i < 32; ++i) {}
    return mask;
  }

  function handleSubmitClick(): void {
    console.log(getTimeMask().toString(2));
  }

  useEffect(() => {
    if (date === undefined) return;
    async function fetchData(): Promise<void> {
      const config = {
        url: `/conference-rooms/place-time/${date}`,
      };
      const { data } = await apiController(config);
      console.log(data);
      // setData(data);
    }
    void fetchData();
    if (calendarRef.current === null) return;
    const calendarEl = calendarRef.current;
    const calendar = new Calendar(calendarEl, {
      events: [
        {
          resourceId: '3',
          start: '2023-08-28T14:00:00+09:00',
          end: '2023-08-28T15:00:00+09:00',
        },
      ],
      eventDisplay: 'background',
      headerToolbar: {
        left: '',
        center: 'title',
        right: 'today prev,next',
      },
      height: 'auto',
      initialDate: date,
      initialView: 'resourceTimelineDay',
      locale: 'ko',
      plugins: [interactionPlugin, resourceTimelinePlugin],
      resources: [
        { id: '1', location: '개포', title: 'Cluster1-1' },
        { id: '2', location: '개포', title: 'Cluster1-2' },
        { id: '3', location: '개포', title: 'Cluster-X' },
        { id: '4', location: '개포', title: 'Cluster3-1' },
        { id: '5', location: '개포', title: 'Cluster3-2' },
        { id: '6', location: '서초', title: 'Cluster7' },
        { id: '7', location: '서초', title: 'Cluster9' },
      ],
      resourceAreaWidth: '150px',
      resourceAreaColumns: [{ field: 'title' }],
      resourceGroupField: 'location',
      select: function ({ start, end }) {
        setStartIndex(getHoursIndex(start));
        setEndIndex(getHoursIndex(end));
      },
      selectable: true,
      selectOverlap: false,
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      slotLabelFormat: {
        hour: 'numeric',
        hour12: false,
      },
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00:00',
      slotMinWidth: 30,
      titleFormat: {
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
      },
    });
    calendar.render();
  }, [date]);

  useEffect(() => {
    const date = router.query.date as string;
    setDate(getISODate(date));
  }, [router]);

  return (
    <div ref={calendarRef} className='mx-4 my-4'>
      <button
        onClick={handleSubmitClick}
        className='sticky mt-4 self-end rounded-[15px] bg-[#6A70FF] px-6 py-3 text-lg font-semibold text-white shadow-xl transition ease-in-out hover:bg-[#6AA6FF]'
      >
        Check-in
      </button>
    </div>
  );
}
