import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  name: string,
  email: string,
  role: string,
  totalAmount: number,
  paymentStatus: string,
  lastPaymentDate: string
) {
  return {
    name,
    email,
    role,
    totalAmount,
    lastPaymentDate,
    history: [
      {
        date: '2023-07-01',
        paymentId: '11091700',
        amount: 3,
        paymentStatus: 'Completed'
      },
      {
        date: '2023-06-25',
        paymentId: 'Anonymous',
        amount: 1,
        paymentStatus: 'Pending'
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.role}</TableCell>
        <TableCell align="center">{row.totalAmount}</TableCell>
        <TableCell align="center">{row.lastPaymentDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr No</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Payment ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.paymentId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>{historyRow.paymentStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('John Doe', 'john.doe@example.com', 'Admin', 500, '2023-07-10',"Paid"),
  createData('Jane Smith', 'jane.smith@example.com', 'User', 200, '2023-07-08',"Unpaid"),
  createData('Alice Johnson', 'alice.johnson@example.com', 'User', 150, '2023-07-05',"Paid"),
  createData('Bob Brown', 'bob.brown@example.com', 'User', 100, '2023-07-04',"Paid"),
  createData('Charlie Davis', 'charlie.davis@example.com', 'User', 250, '2023-07-03',"Unpaid"),
  createData('Daisy Evans', 'daisy.evans@example.com', 'Admin', 300, '2023-07-02',"Paid"),
  createData('Ella Green', 'ella.green@example.com', 'User', 180, '2023-06-30',"Unpaid"),
  createData('Frank Harris', 'frank.harris@example.com', 'User', 220, '2023-06-29',"Paid"),
  createData('Grace Lee', 'grace.lee@example.com', 'User', 240, '2023-06-28',"Unpaid"),
  createData('Hank Miller', 'hank.miller@example.com', 'Admin', 270, '2023-06-27',"Paid"),
  createData('Ivy Nelson', 'ivy.nelson@example.com', 'User', 320, '2023-06-26',"Paid"),
  createData('Jack Owens', 'jack.owens@example.com', 'User', 350, '2023-06-25',"Paid"),
  createData('Karen Perry', 'karen.perry@example.com', 'User', 330, '2023-06-24',"Paid"),
  createData('Leo Quinn', 'leo.quinn@example.com', 'User', 410, '2023-06-23',"Paid"),
  createData('Mia Reed', 'mia.reed@example.com', 'Admin', 290, '2023-06-22',"Paid"),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Full Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Total Amount</TableCell>
            <TableCell align='center'>Payment Status</TableCell>
            <TableCell align="center">Last Payment Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
