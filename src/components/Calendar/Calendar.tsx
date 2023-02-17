import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { nanoid } from 'nanoid';
import { useCalendar } from '../../utils/customHooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import {
  BoxList,
  CalendarWrapper,
  CellBox,
  DayNumber,
  FirstLine,
  ColorsList,
  HolidayList,
  TasksList,
  StyledInput,
  ControlButtonBox,
} from './Calendar.styled';
import { TypeHolidays } from '../../services/API';

type Task = {
  id: string;
  text: string;
  color: string;
};

type Day = {
  id: string;
  originalMoment: moment.Moment;
};

export type DaysWithTasks = {
  id: string;
  tasks: Task[];
};

interface ICalendar {
  holidays: TypeHolidays[];
  handlers: {
    exportToImageHandler: () => void;
    exportToJsonHandler: (daysWithTasks: DaysWithTasks[]) => void;
  };
}

export const Calendar = ({
  holidays,
  handlers: { exportToImageHandler, exportToJsonHandler },
}: ICalendar) => {
  const [today, setToday] = useState<moment.Moment>(moment());
  const [monthDays, setMonthDays] = useState<Day[]>([]);
  const [daysWithTasks, setDaysWithTasks] = useState<DaysWithTasks[]>([]);
  const [dragDay, setDragDay] = useState<DaysWithTasks | null>(null);
  const [dragTask, setDragTask] = useState<Task | null>(null);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [isShowColors, setIsShowColors] = useState({ show: false, day: '' });
  const { makeMonthCalendar, isSameDate } = useCalendar();

  useEffect(() => {
    setMonthDays(makeMonthCalendar(today));
    // eslint-disable-next-line
  }, [today]);

  useEffect(() => {
    const templates = monthDays.map(day => ({
      id: day.originalMoment.format('YYYY-MM-DD'),
      tasks: [],
    }));

    setDaysWithTasks(prev => [...prev, ...templates]);
  }, [monthDays]);

  useEffect(() => {
    if (!searchInputValue) {
      return;
    }

    const result: Task[] = [];
    daysWithTasks.forEach(day => {
      day.tasks.forEach(task => {
        if (task.text.includes(searchInputValue)) {
          result.push(task);
        }
      });
    });

    if (result.length) {
      setToday(moment(result[0].id.split('/').shift(), 'YYYY-MM-DD'));
    }

    // eslint-disable-next-line
  }, [searchInputValue]);

  const handleMakeNewTask = (dayID: string, color: string) => {
    const foundDay = daysWithTasks.find(d => d.id === dayID);
    if (!foundDay) {
      const newDay = {
        id: dayID,
        tasks: [{ id: `${dayID}/${nanoid(6)}`, text: '', color }],
      };
      return setDaysWithTasks(prev => [...prev, newDay]);
    }

    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dayID) return d;

        const newTask = { id: `${dayID}/${nanoid(6)}`, text: '', color };
        return { ...d, tasks: [...d.tasks, newTask] };
      });
    });

    setIsShowColors(prev => ({
      show: !prev.show,
      day: '',
    }));
  };

  const handleChangeTask = (text: string, dayID: string, taskID: string) => {
    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dayID) return d;

        const updatedTask = d.tasks.map(t => {
          if (t.id !== taskID) return t;

          return { ...t, text };
        });

        return { ...d, tasks: updatedTask };
      });
    });
  };

  const handleDeleteTask = (dayID: string, taskID: string) => {
    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dayID) return d;

        const filteredTasks = d.tasks.filter(t => t.id !== taskID);
        return { ...d, tasks: filteredTasks };
      });
    });
  };

  function handleDragOver(
    e: React.DragEvent<HTMLInputElement | HTMLLIElement>,
  ): void {
    e.preventDefault();

    const isActionItem =
      (e.target as HTMLInputElement | HTMLLIElement).className === 'event-item';

    if (isActionItem) {
      (e.target as HTMLInputElement | HTMLLIElement).style.boxShadow =
        '0 4px 3px gray';
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLInputElement>): void {
    (e.target as HTMLInputElement).style.boxShadow = 'none';
  }

  function handleDragStart(
    e: React.DragEvent<HTMLInputElement>,
    day: DaysWithTasks | undefined,
    task: Task | undefined,
  ) {
    setDragDay(day || null);
    setDragTask(task || null);
  }

  function handleDragEnd(e: React.DragEvent<HTMLInputElement>): void {
    (e.target as HTMLInputElement).style.boxShadow = 'none';
  }

  function handleDrop(e: React.DragEvent<HTMLInputElement>, task?: Task): void {
    e.preventDefault();

    setDaysWithTasks(prev => {
      return prev.map(d => {
        if (d.id !== dragDay?.id) {
          return d;
        }

        const newSort = [...d.tasks];

        if (task) {
          const targetIndex = d.tasks.indexOf(dragTask as Task);
          const dropIndex = d.tasks.indexOf(task);
          newSort.splice(targetIndex, 1);
          newSort.splice(dropIndex + 1, 0, dragTask as Task);
        }

        return { ...d, tasks: newSort };
      });
    });

    setDragDay(null);
    setDragTask(null);
    (e.target as HTMLInputElement).style.boxShadow = 'none';
  }

  function handleDropOnBoard(
    e: React.DragEvent<HTMLLIElement>,
    day?: DaysWithTasks,
  ): void {
    if (dragDay) {
      day?.tasks.push(dragTask as Task);
      const targetIdx = dragDay?.tasks.indexOf(dragTask as Task);
      dragDay?.tasks.splice(targetIdx, 1);

      setDaysWithTasks(
        daysWithTasks.map(d => {
          if (d.id === day?.id) return day;
          if (d.id === dragDay?.id) return dragDay;
          return d;
        }),
      );
    }

    (e.target as HTMLLIElement).style.boxShadow = 'none';
  }

  const currentMonth = today.format('MMMM YYYY');

  return (
    <>
      <CalendarWrapper>
        <CalendarHeader
          changeMonth={setToday}
          findAction={{
            value: searchInputValue,
            onChange: setSearchInputValue,
          }}
          currentMonthName={currentMonth}
        />

        <BoxList>
          {monthDays?.map(({ id, originalMoment }) => {
            const normalizedDayNumber = originalMoment.format('D');
            const slicedMonthName = originalMoment.format('MMMM').slice(0, 3);
            const formattedDate = originalMoment.format('YYYY-MM-DD');
            const isShowTasks = daysWithTasks.find(d => d.id === formattedDate);
            const day = daysWithTasks.find(day => day.id === id);
            const isFirstDayOfCurrentMonth = normalizedDayNumber === '1';

            return (
              <CellBox
                key={formattedDate}
                isWeekend={
                  originalMoment.day() === 6 || originalMoment.day() === 0
                }
                onDragOver={e => handleDragOver(e)}
                onDrop={e => handleDropOnBoard(e, day)}
              >
                <FirstLine>
                  <DayNumber
                    isCurrentDay={isSameDate(moment(), originalMoment, 'day')}
                    isCurrentMonth={isSameDate(originalMoment, today, 'month')}
                    isFirstDay={isFirstDayOfCurrentMonth}
                  >
                    {normalizedDayNumber}{' '}
                    {isFirstDayOfCurrentMonth && slicedMonthName}
                  </DayNumber>

                  <button
                    onClick={() =>
                      setIsShowColors(prev => ({
                        day: formattedDate,
                        show: !prev.show,
                      }))
                    }
                  >
                    +
                  </button>

                  {isShowColors.show && formattedDate === isShowColors.day && (
                    <ColorsList>
                      <li
                        onClick={() =>
                          handleMakeNewTask(formattedDate, '#8c5e19')
                        }
                      />
                      <li
                        onClick={() =>
                          handleMakeNewTask(formattedDate, '#631553')
                        }
                      />
                      <li
                        onClick={() =>
                          handleMakeNewTask(formattedDate, '#152a63')
                        }
                      />
                      <li
                        onClick={() =>
                          handleMakeNewTask(formattedDate, '#4f3e3e')
                        }
                      />
                    </ColorsList>
                  )}
                </FirstLine>

                <HolidayList>
                  {holidays.map(holiday => {
                    const isShowHoliday = moment(holiday.date).isSame(
                      originalMoment,
                      'day',
                    );
                    if (isShowHoliday) {
                      return (
                        <li key={`${holiday.countryCode}${nanoid(6)}`}>
                          {holiday.name}
                        </li>
                      );
                    }
                    return null;
                  })}
                </HolidayList>

                <TasksList>
                  {isShowTasks?.tasks.map(t => {
                    const task = day?.tasks.find(task => task.id === t.id);

                    return (
                      <li key={t.id}>
                        <StyledInput
                          type={'text'}
                          value={t.text}
                          onChange={e =>
                            handleChangeTask(e.target.value, id, t.id)
                          }
                          color={t.color}
                          className={'event-item'}
                          draggable
                          onDragOver={e => handleDragOver(e)}
                          onDragLeave={e => handleDragLeave(e)}
                          onDragStart={e => handleDragStart(e, day, task)}
                          onDragEnd={e => handleDragEnd(e)}
                          onDrop={e => handleDrop(e, task)}
                        />
                        <button
                          onClick={() => handleDeleteTask(formattedDate, t.id)}
                        >
                          x
                        </button>
                      </li>
                    );
                  })}
                </TasksList>
              </CellBox>
            );
          })}
        </BoxList>
      </CalendarWrapper>

      <ControlButtonBox>
        <button onClick={exportToImageHandler}>
          Save calendar page as a picture
        </button>

        <button onClick={() => exportToJsonHandler(daysWithTasks)}>
          Save calendar data to json
        </button>
      </ControlButtonBox>
    </>
  );
};
