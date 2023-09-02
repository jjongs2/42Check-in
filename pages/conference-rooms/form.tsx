import OkModal from '@/components/modal/OkModal';
import apiController from '@/utils/apiController';
import getDurations from '@/utils/getDurations';
import getHoursIndex from '@/utils/getHoursIndex';
import getISODate from '@/utils/getISODate';
import { Calendar } from '@fullcalendar/core';
import type { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

interface TimeMasks {
  gaepo: number[];
  seocho: number[];
}

export const ROOM_INFOS = [
  { id: '0b01000001111111111111111111111111', location: '개포', title: 'Cluster1-1' },
  { id: '0b01000010111111111111111111111111', location: '개포', title: 'Cluster1-2' },
  { id: '0b01000100111111111111111111111111', location: '개포', title: 'Cluster-X' },
  { id: '0b01001000111111111111111111111111', location: '개포', title: 'Cluster3-1' },
  { id: '0b01010000111111111111111111111111', location: '개포', title: 'Cluster3-2' },
  { id: '0b10000001111111111111111111111111', location: '서초', title: 'Cluster7' },
  { id: '0b10000010111111111111111111111111', location: '서초', title: 'Cluster9' },
];

export default function Timeline(): ReactElement {
  const calendarRef = useRef(null);
  const router = useRouter();
  const [date, setDate] = useState<string>();
  const [events, setEvents] = useState<EventInput[]>();
  const [roomId, setRoomId] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();

  function getMask(): number {
    let mask = 0xff000000;
    for (let i = 0; i < 24; ++i) {
      if (startIndex <= i && i < endIndex) {
        mask |= 1 << i;
      }
    }
    return (mask & roomId) >>> 0;
  }

  function handleSubmitClick(): void {
    if (roomId === undefined) return;
    async function fetchData(): Promise<void> {
      const reservationInfo = getMask();
      const config = {
        url: '/conference-rooms/form',
        method: 'post',
        data: { date, reservationInfo },
      };
      await apiController(config);
      setShowModal(true);
    }
    void fetchData();
  }

  useEffect(() => {
    if (date === undefined) return;
    function setEventTimes(timeMasks: TimeMasks): void {
      const eventInputs: EventInput[] = [];
      const masks = [...Object.values(timeMasks.gaepo), ...Object.values(timeMasks.seocho)];
      const roomIds = ROOM_INFOS.map((room) => room.id);
      masks.forEach((mask, index) => {
        const durations = getDurations(mask, date);
        durations.forEach(([start, end]) => {
          const resourceId = roomIds[index];
          eventInputs.push({ resourceId, start, end });
        });
      });
      setEvents(eventInputs);
    }
    async function fetchData(): Promise<void> {
      const config = {
        url: `/conference-rooms/place-time/${date}`,
      };
      const { data } = await apiController(config);
      setEventTimes(data);
    }
    void fetchData();
  }, [date]);

  useEffect(() => {
    if (date === undefined) return;
    if (calendarRef.current === null) return;
    const calendarEl = calendarRef.current;
    const calendar = new Calendar(calendarEl, {
      events,
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
      resources: ROOM_INFOS,
      resourceAreaWidth: '150px',
      resourceAreaColumns: [{ field: 'title' }],
      resourceGroupField: 'location',
      select: function ({ resource, start, end }) {
        setRoomId(Number(resource._resource.id));
        setStartIndex(getHoursIndex(start));
        setEndIndex(getHoursIndex(end));
      },
      selectable: true,
      selectAllow: function ({ start }) {
        return !dayjs(start).isBefore();
      },
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
      validRange: {
        start: getISODate(),
      },
    });
    calendar.render();
  }, [date, events]);

  useEffect(() => {
    const { date } = router.query;
    setDate(getISODate(date as string));
  }, [router]);

  return (
    <div ref={calendarRef} className='mx-4 my-4'>
      <button
        onClick={handleSubmitClick}
        className='sticky mt-4 self-end rounded-[15px] bg-[#6A70FF] px-6 py-3 text-lg font-semibold text-white shadow-xl transition ease-in-out hover:bg-[#6AA6FF]'
      >
        Check-in
      </button>
      {showModal && (
        <OkModal>
          <p>회의실 예약이 완료되었습니다.</p>
        </OkModal>
      )}
    </div>
  );
}
