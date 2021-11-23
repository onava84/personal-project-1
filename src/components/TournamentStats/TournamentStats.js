import React from "react";
import { Box, typography } from "@mui/system";
import Container from "@mui/material/Container";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

function createData(pos, name, Pts, PJ, PG, PP, PE, DG, GF, GC) {
  return { pos, name, Pts, PJ, PG, PP, PE, DG, GF, GC };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Cupcake", 305, 3.7, 67, 4.3),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Eclair", 262, 16.0, 24, 6.0),
  createData(9, "Cupcake", 305, 3.7, 67, 4.3),
  createData(10, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(11, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(12, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(13, "Eclair", 262, 16.0, 24, 6.0),
  createData(14, "Cupcake", 305, 3.7, 67, 4.3),
  createData(15, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(11, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(12, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(13, "Eclair", 262, 16.0, 24, 6.0),
  createData(14, "Cupcake", 305, 3.7, 67, 4.3),
  createData(15, "Gingerbread", 356, 16.0, 49, 3.9),
];

const TournamentStats = (props) => {
  const username = useSelector((reduxState) => reduxState.username);

  // useEffect(() => {
  //   axios
  //     .get(`/api/tournament-table/${props.match.params.id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  console.log(username);

  return (
    <Box>
      <Container>
        <Box mt={4} mb={4}>
          <Typography variant="h4" align="left">
            Tournament table
          </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      position: "sticky",
                      left: 0,
                      background: "black",
                      color: "white",
                    }}
                  >
                    Team
                  </TableCell>
                  <TableCell align="right">Pts</TableCell>
                  <TableCell align="right">PJ</TableCell>
                  <TableCell align="right">PG</TableCell>
                  <TableCell align="right">PP</TableCell>
                  <TableCell align="right">PE</TableCell>
                  <TableCell align="right">DG</TableCell>
                  <TableCell align="right">GF</TableCell>
                  <TableCell align="right">GC</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        position: "sticky",
                        left: 0,
                        background: "#1F618D",
                        color: "white",
                      }}
                    >
                      {/* {row.pos} - {row.name} */}
                      {row.pos}. {row.name}
                    </TableCell>
                    <TableCell align="right">{row.Pts}</TableCell>
                    <TableCell align="right">{row.PJ}</TableCell>
                    <TableCell align="right">{row.PG}</TableCell>
                    <TableCell align="right">{row.PP}</TableCell>
                    <TableCell align="right">{row.PE}</TableCell>
                    <TableCell align="right">{row.DG}</TableCell>
                    <TableCell align="right">{row.GF}</TableCell>
                    <TableCell align="right">{row.GC}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default TournamentStats;
