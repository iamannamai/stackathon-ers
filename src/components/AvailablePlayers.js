import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const AvailablePlayers = props => {
  const {playersList} = props;
  return (
    <Paper>
      <Table>
        <TableBody>
          {
            playersList.map((player, idx) => (
              <TableRow key={idx}>
                <TableCell align="center">{player}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default AvailablePlayers;
