import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Button from '../Button';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Content } from './styles';
import {
  MdOutlineArrowBack,
  MdOutlineArrowForward,
  MdOutlineBrightness4,
  MdOutlineLightMode,
  MdOutlineNightsStay
} from 'react-icons/md';
import { useToast } from '../../context/ToastContext';
import { CellClickedEvent } from 'ag-grid-community';
import { intervals } from './intervals';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
import { formatDate } from '../../utils/convertDates';

interface Schedule {
  room_code: string;

  interval: number;

  day_0: string;

  day_1: string;

  day_2: string;

  day_3: string;

  day_4: string;

  day_5: string;

  day_6: string;
}

interface TableProps {
  data: Schedule[];
  room_code: string;
  editable: boolean;
}

const Tables: React.FC<TableProps> = ({
  data,
  selectable,
  room_code,
  editable,
  onTableChange,
  error,
  week_date,
  stateDay,
  state
}) => {
  const { addToast } = useToast();

  const [schedules, setSchedules] = useState<RoomProps>({});

  async function getRoomSchedules() {
    const weekDate = `${formatDate(dayStart)} à ${formatDate(dayEnd)}`;
    const schedules = await api.get(`/schedules/${room_code}`, {
      params: {
        weekDate
      }
    });

    setSchedules(schedules.data);
  }

  useEffect(() => {
    getRoomSchedules();
  }, []);

  const rowDataMorning = [
    { interval: 0 },
    { interval: 1 },
    { interval: 2 },
    { interval: 3 },
    { interval: 4 },
    { interval: 5 }
  ];

  const rowDataAfternoon = [
    { interval: 6 },
    { interval: 7 },
    { interval: 8 },
    { interval: 9 },
    { interval: 10 },
    { interval: 11 }
  ];

  const rowDataNight = [
    { interval: 12 },
    { interval: 13 },
    { interval: 14 },
    { interval: 15 }
  ];

  const [dayStart, setDayStart] = useState(() =>
    stateDay
      ? startOfWeek(new Date(stateDay), { weekStartsOn: 1 })
      : startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [dayEnd, setDayEnd] = useState(() =>
    stateDay
      ? endOfWeek(new Date(stateDay), { weekStartsOn: 1 })
      : endOfWeek(new Date(), { weekStartsOn: 1 })
  );

  async function nextWeek() {
    if (hours.length > 0) {
      addToast({
        type: 'error',
        title: 'Reserva limitada a semana!',
        description: `Os horários solicitados devem ser da mesma semana, caso deseje mudar a semana, desmarque os horários selecionados`
      });
    } else {
      setDayStart(addDays(dayStart, 7));
      setDayEnd(addDays(dayEnd, 7));
    }
  }

  useEffect(() => {
    getRoomSchedules();
  }, [dayStart, dayEnd]);

  function prevWeek() {
    if (hours.length > 0) {
      addToast({
        type: 'error',
        title: 'Reserva limitada a semana!',
        description: `Os horários solicitados devem ser da mesma semana, caso deseje mudar a semana, desmarque os horários selecionados`
      });
    } else {
      setDayStart(addDays(dayStart, -7));
      setDayEnd(addDays(dayEnd, -7));
    }
  }

  function filteredData(arrayIntervals) {
    const filteredSchedules = schedules.filter((d) => {
      return arrayIntervals.includes(d.interval);
    });

    return filteredSchedules;
  }

  const gridRefMorning = useRef(); // Optional - for accessing Grid's API
  const gridRefAfternoon = useRef(); // Optional - for accessing Grid's API
  const gridRefNight = useRef(); // Optional - for accessing Grid's API

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'interval',
      headerName: 'Dia/Horário',
      width: 180,
      valueGetter: (params) => {
        return intervals[params.data.interval];
      },
      cellStyle: function (params) {
        return { fontWeight: 'bold' };
      }
    },
    {
      field: 'day_0',
      headerName: 'Segunda',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_1',
      headerName: 'Terça',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_2',
      headerName: 'Quarta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_3',
      headerName: 'Quinta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_4',
      headerName: 'Sexta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_5',
      headerName: 'Sábado',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_6',
      headerName: 'Domingo',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    }
  ]);

  const [columnDefs2, setColumnDefs2] = useState([
    {
      field: 'interval',
      headerName: 'Dia/Horário',
      width: 180,
      valueGetter: (params) => {
        return intervals[params.data.interval];
      },
      cellStyle: function (params) {
        return { fontWeight: 'bold' };
      }
    },
    {
      field: 'day_0',
      headerName: 'Segunda',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_1',
      headerName: 'Terça',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_2',
      headerName: 'Quarta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_3',
      headerName: 'Quinta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_4',
      headerName: 'Sexta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_5',
      headerName: 'Sabádo',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_6',
      headerName: 'Domingo',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    }
  ]);

  const [columnDefs3, setColumnDefs3] = useState([
    {
      field: 'interval',
      headerName: 'Dia/Horário',
      width: 180,
      valueGetter: (params) => {
        return intervals[params.data.interval];
      },
      cellStyle: function (params) {
        return { fontWeight: 'bold' };
      }
    },
    {
      field: 'day_0',
      headerName: 'Segunda',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_1',
      headerName: 'Terça',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_2',
      headerName: 'Quarta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_3',
      headerName: 'Quinta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_4',
      headerName: 'Sexta',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_5',
      headerName: 'Sabádo',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    },
    {
      field: 'day_6',
      headerName: 'Domingo',
      editable: editable ? true : false,
      flex: 1,
      cellStyle: (params) => {
        return params.value != null && params.value != ''
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    }
  ]);

  const { token } = useAuth();

  async function handleSubmit() {
    let rowData = [];
    let nonFixedRowData = [];

    gridRefMorning.current.api.forEachNode((node) => {
      const data = { ...node.data };
      const data2 = { ...node.data };

      // Removendo se o campo esta como 'reservado'
      Object.keys(data).forEach((key) => {
        if (data[key] === 'RESERVADO') {
          delete data[key];
        }
      });

      Object.keys(data2).forEach((key) => {
        if (data2[key] !== 'RESERVADO' && typeof data2[key] !== 'number') {
          delete data2[key];
        }
      });

      rowData.push({
        ...data,
        room_code
      });

      nonFixedRowData.push({
        ...data2,
        room_code,
        week: `${formatDate(dayStart)} à ${formatDate(dayEnd)}`
      });
    });

    gridRefAfternoon.current.api.forEachNode((node) => {
      const data = { ...node.data };
      const data2 = { ...node.data };

      // Removendo se o campo esta como 'reservado'
      Object.keys(data).forEach((key) => {
        if (data[key] === 'RESERVADO') {
          delete data[key];
        }
      });

      Object.keys(data2).forEach((key) => {
        if (data2[key] !== 'RESERVADO' && typeof data2[key] !== 'number') {
          delete data2[key];
        }
      });

      rowData.push({
        ...data,
        room_code
      });

      nonFixedRowData.push({
        ...data2,
        room_code,
        week: `${formatDate(dayStart)} à ${formatDate(dayEnd)}`
      });
    });

    gridRefNight.current.api.forEachNode((node) => {
      const data = { ...node.data };
      const data2 = { ...node.data };

      // Removendo se o campo esta como 'reservado'
      Object.keys(data).forEach((key) => {
        if (data[key] === 'RESERVADO') {
          delete data[key];
        }
      });

      Object.keys(data2).forEach((key) => {
        if (data2[key] !== 'RESERVADO' && typeof data2[key] !== 'number') {
          delete data2[key];
        }
      });

      rowData.push({
        ...data,
        room_code
      });

      nonFixedRowData.push({
        ...data2,
        room_code,
        week: `${formatDate(dayStart)} à ${formatDate(dayEnd)}`
      });
    });

    try {
      console.log(rowData);
      console.log(nonFixedRowData);
      await api.post('/schedules', rowData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(nonFixedRowData);

      await api.post('/non-fixed-schedules', nonFixedRowData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      addToast({
        type: 'sucess',
        title: 'Horários cadastros com sucesso!',
        description: 'Os horários do espaço foram atualizados.'
      });
    } catch (error) {
      console.error(error.response);
    }
  }

  const [hours, setHours] = useState([]);

  const onCellClicked = useCallback(
    (params: CellClickedEvent) => {
      if (
        params.value !== undefined &&
        params.value !== null &&
        params.value !== 'SELECIONADO' &&
        params.value !== ''
      ) {
        addToast({
          type: 'error',
          title: 'Horário não disponível para reserva',
          description: `Não é possível selecionar horários que já possuem ocupação.`
        });
        return;
      }

      let day = params.colDef.field;
      let interval = params.data.interval;
      let column = params.column.colDef.field;

      const index = hours.findIndex(
        (hour) => hour.day === day && hour.interval == interval
      );

      if (index > -1) {
        hours.splice(index, 1);

        params.node.setDataValue(column, null);
        params.column.colDef.cellStyle = { backgroundColor: '#b6f8c4' };
        params.api.refreshCells({
          force: true,
          columns: [column],
          rowNodes: [params.node]
        });
      } else {
        setHours([
          ...hours,
          {
            day,
            interval,
            dateDay: addDays(dayStart, day.charAt(day.length - 1))
          }
        ]);

        params.node.setDataValue(column, 'SELECIONADO');
        params.column.colDef.cellStyle = { backgroundColor: 'cyan' };
        params.api.refreshCells({
          force: true,
          columns: [column],
          rowNodes: [params.node]
        });
      }
    },
    [hours, dayStart]
  );

  if (onTableChange) {
    onTableChange(hours);
  }

  const onUpdateSomeValues = useCallback(async () => {
    if (gridRefMorning && gridRefAfternoon && gridRefNight) {
      gridRefMorning.current.api.forEachNode((node) => {
        state.filter((interval) => {
          if (interval.interval === node.data.interval) {
            node.setDataValue(interval.day, 'RESERVADO');
          }
        });
      });

      gridRefAfternoon.current.api.forEachNode((node) => {
        state.filter((interval) => {
          if (interval.interval === node.data.interval) {
            node.setDataValue(interval.day, 'RESERVADO');
          }
        });
      });

      gridRefNight.current.api.forEachNode((node) => {
        state.filter((interval) => {
          if (interval.interval === node.data.interval) {
            node.setDataValue(interval.day, 'RESERVADO');
          }
        });
      });
    }
  }, []);

  if (state) {
    onUpdateSomeValues();
  }

  return (
    <Content>
      {editable && (
        <Button type="submit" text="Salvar horários" onClick={handleSubmit} />
      )}

      <div
        className="ag-theme-alpine table-container"
        style={{
          width: '100%',
          height: 338,
          fontFamily: 'Poppins',
          fontSize: '1.4rem'
        }}
      >
        <div className="week-choose">
          <MdOutlineArrowBack size={30} onClick={prevWeek} />
          <span>{`${formatDate(dayStart)} à ${formatDate(dayEnd)}`}</span>
          <MdOutlineArrowForward size={30} onClick={nextWeek} />
        </div>

        <div className="table" style={{ width: '100%', height: 345 }}>
          <div className="schedule-time">
            <div className="schedule-title">
              <MdOutlineLightMode size={30} />
              <h2>Manhã</h2>
            </div>

            <div className="disponibility">
              <p className="available">Disponível</p>
              <p className="unavailable">Indisponível</p>
            </div>
          </div>

          <AgGridReact
            onCellClicked={selectable ? onCellClicked : null}
            ref={gridRefMorning} // Ref for accessing Grid's API
            rowData={
              schedules.length > 0
                ? filteredData([0, 1, 2, 3, 4, 5])
                : rowDataMorning
            } // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            // defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
          />
        </div>

        <div className="table" style={{ width: '100%', height: 345 }}>
          <div className="schedule-time">
            <div className="schedule-title">
              <MdOutlineBrightness4 size={30} />
              <h2>Tarde</h2>
            </div>

            <div className="disponibility">
              <p className="available">Disponível</p>
              <p className="unavailable">Indisponível</p>
            </div>
          </div>
          <AgGridReact
            onCellClicked={selectable ? onCellClicked : null}
            ref={gridRefAfternoon} // Ref for accessing Grid's API
            rowData={
              schedules.length > 0
                ? filteredData([6, 7, 8, 9, 10, 11])
                : rowDataAfternoon
            } // Row Data for Rows
            columnDefs={columnDefs2} // Column Defs for Columns
            // defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
          />
        </div>

        <div className="table" style={{ height: 260 }}>
          <div className="schedule-time">
            <div className="schedule-title">
              <MdOutlineNightsStay size={30} />
              <h2>Noite</h2>
            </div>

            <div className="disponibility">
              <p className="available">Disponível</p>
              <p className="unavailable">Indisponível</p>
            </div>
          </div>
          <AgGridReact
            onCellClicked={selectable ? onCellClicked : null}
            ref={gridRefNight}
            rowData={
              schedules.length > 0
                ? filteredData([12, 13, 14, 15])
                : rowDataNight
            } // Row Data for Rows
            columnDefs={columnDefs3} // Column Defs for Columns
            // defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
          />
        </div>
        {error && <div className="error">{`${error}`}</div>}
      </div>
    </Content>
  );
};

export default Tables;
