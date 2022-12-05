import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Button from '../Button';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Content } from './styles';
import {
  MdOutlineBrightness4,
  MdOutlineLightMode,
  MdOutlineNightsStay
} from 'react-icons/md';
import { useToast } from '../../context/ToastContext';
import { CellClickedEvent } from 'ag-grid-community';
import { intervals } from './intervals';

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
  state
}) => {
  const { addToast } = useToast();

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

  function filteredData(arrayIntervals) {
    const filteredSchedules = data.filter((d) => {
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
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
        return params.value != null
          ? { backgroundColor: '#ffb7b7' }
          : { backgroundColor: '#b6f8c4' };
      }
    }
  ]);

  const { token } = useAuth();

  async function handleSubmit() {
    let rowData = [];

    gridRefMorning.current.api.forEachNode((node) => {
      return rowData.push({
        ...node.data,
        room_code
      });
    });

    gridRefAfternoon.current.api.forEachNode((node) => {
      return rowData.push({
        ...node.data,
        room_code
      });
    });

    gridRefNight.current.api.forEachNode((node) => {
      return rowData.push({
        ...node.data,
        room_code
      });
    });

    try {
      await api.post('/schedules', rowData, {
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
      console.log(params.value);
      if (
        params.value !== undefined &&
        params.value !== null &&
        params.value !== 'SELECIONADO'
      ) {
        alert('Horário não disponivel para reserva');
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
        setHours([...hours, { day, interval }]);

        params.node.setDataValue(column, 'SELECIONADO');
        params.column.colDef.cellStyle = { backgroundColor: 'cyan' };
        params.api.refreshCells({
          force: true,
          columns: [column],
          rowNodes: [params.node]
        });
      }
    },
    [hours]
  );

  if (onTableChange) {
    onTableChange(hours);
  }

  console.log(state)

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
            console.log(node);
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
              data.length > 0
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
              data.length > 0
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
              data.length > 0 ? filteredData([12, 13, 14, 15]) : rowDataNight
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
