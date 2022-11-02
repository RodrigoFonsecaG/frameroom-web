import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Button from '../Button';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface Schedule {
  room_code: string;

  day: number;

  interval_1: string;

  interval_2: string;

  interval_3: string;

  interval_4: string;

  interval_5: string;

  interval_6: string;

  interval_7: string;

  interval_8: string;

  interval_9: string;

  interval_10: string;

  interval_11: string;

  interval_12: string;

  interval_13: string;

  interval_14: string;

  interval_15: string;

  interval_16: string;
}

interface TableProps {
  data: Schedule[];
  room_code;
}

const Tables: React.FC<TableProps> = ({ data, room_code }) => {
  const morningColumns = [
    { field: 'day', headerName: 'Dia/Horário' },
    {
      field: 'interval_1',
      headerName: '(07h10 às 08h00)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_2',
      headerName: '(08h00 às 08h50)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_3',
      headerName: '(09h00 às 09h50)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_4',
      headerName: '(09h50 às 10h40)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_5',
      headerName: '(10h50 às 11h40)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_6',
      headerName: '(11h40 às 12h30)',
      editable: true,
      flex: 1
    }
  ];

  const afternoonColumns = [
    {
      field: 'interval_7',
      headerName: '(13h10 às 14h00)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_8',
      headerName: '(14h00 às 14h50)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_9',
      headerName: '(15h00 às 15h50)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_10',
      headerName: '(15h50 às 16h40)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_11',
      headerName: '(16h50 às 17h40)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_12',
      headerName: '(17h40 às 18h30)',
      editable: true,
      flex: 1
    }
  ];

  const nightColumns = [
    {
      field: 'interval_13',
      headerName: '(13h10 às 14h00)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_14',
      headerName: '(14h00 às 14h50)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_15',
      headerName: '(15h00 às 15h50)',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_16',
      headerName: '(15h50 às 16h40)',
      editable: true,
      flex: 1
    }
  ];

  const days = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabádo',
    'Domingo'
  ];

  const gridRef = useRef(); // Optional - for accessing Grid's API

  const rowData = [
    { day: 0 },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 }
  ];

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'day',
      headerName: 'Dia/Horário',
      width: 120,
      valueGetter: (params) => {
        return days[params.data.day];
      },
    },
    {
      field: 'interval_1',
      headerName: '07h10 às 08h00',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_2',
      headerName: '08h00 às 08h50',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_3',
      headerName: '09h00 às 09h50',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_4',
      headerName: '09h50 às 10h40',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_5',
      headerName: '10h50 às 11h40',
      editable: true,
      flex: 1
    },
    {
      field: 'interval_6',
      headerName: '11h40 às 12h30)',
      editable: true,
      flex: 1
    }
  ]);

  // // DefaultColDef sets props common to all Columns
  // const defaultColDef = useMemo(() => ({
  //   sortable: true
  // }));

  const { token } = useAuth();
  async function handleSubmit() {
    let rowData = [];
    gridRef.current.api.forEachNode((node) => {
      return rowData.push({
        ...node.data,
        room_code,
        day: Number(node.id)
      });
    });

    try {
      await api.post('/schedules', rowData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // navigate('/rooms');
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <div>
      <Button type="submit" text="Salvar horários" onClick={handleSubmit} />

      <div className="ag-theme-alpine" style={{ width: '100%', height: 400 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={data.length > 0 ? data : rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          // defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
        />
      </div>
    </div>
  );
};

export default Tables;
