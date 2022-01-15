import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IBattedBallData } from '../models/IBattedBallData';

const columns: GridColDef[] = [
    { field: 'BATTER', headerName: 'Batter', width: 130},
    { field: 'PITCHER', headerName: 'Pitcher', width: 130},
    { field: 'GAME_DATE', headerName: 'Game Date' },
    { field: 'LAUNCH_ANGLE', headerName: 'Launch Angle', type: 'number', width: 130},
    { field: 'EXIT_SPEED', headerName: 'Exit Speed', type: 'number' },
    { field: 'EXIT_DIRECTION', headerName: 'Exit Direction', type: 'number', width: 130 },
    { field: 'HIT_DISTANCE', headerName: 'Hit Distance', type: 'number', width: 130 },
    { field: 'HANG_TIME', headerName: 'Hang Time', type: 'number', width: 130 },
    { field: 'HIT_SPIN_RATE', headerName: 'Hit Spin Rate', type: 'number', width: 130 },
    { field: 'PLAY_OUTCOME', headerName: 'Play Outcome', width: 130 },
  ];

type Props = {
  battedBallData: Array<IBattedBallData>;
};
  
const BattedBallTable = ({battedBallData} : Props) => {
    return (
      <div className='chart-container'>
        <div style={{ height: 700, width: 1500 }}>
          <DataGrid
            rows={battedBallData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </div>
    );
  }

export default BattedBallTable;