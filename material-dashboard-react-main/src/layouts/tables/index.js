/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Modal from "react-modal";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import firebase from "../../Firebase";

function Tables() {
  const { columns, rows } = authorsTableData();
  const [modals, setmodals] = useState(false);
  const [usuario, setusuario] = useState("");
  const [mail, setmail] = useState("");
  const [contraseña, setcontraseña] = useState("");

  const onusuarioChanged = (e) => {
    setusuario(e.target.value);
  };

  const onmailChanged = (e) => {
    setmail(e.target.value);
  };

  const oncontraseñaChanged = (e) => {
    setcontraseña(e.target.value);
  };

  const customStyles = {
    content: {
      background: "transparent",
      top: "0%",
      right: "-.5%",
      bottom: "0%",
      zIndex: "1000",
    },
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(5),
      padding: theme.spacing(0),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    paper2: {
      width: "900px",
      marginTop: "20vw",
      marginLeft: "20%",
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      border: "1px solid #b5b2c3",
    },
    clean: {
      position: "relative",
    },
    divider: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "2%",
    },
    chipArea: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      width: "200px",
    },
    buttonArea: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "2%",
      padding: ".5%",
    },
    label: {
      marginRight: "10px",
    },
    scheduler: {
      marginRight: "20px",
      marginLeft: "20px",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
      backgroundColor: "#ff6a00",
      color: "white",
    },
  }));
  const classes = useStyles();

  const handlesave = () => {
    firebase.realdb
      .ref("usuario")
      .push()
      .set({
        user: usuario,
        alta: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        email: mail,
        password: contraseña,
        status: "activo",
      });
  };
  return (
    <DashboardLayout>
      <Modal ariaHideApp={false} isOpen={modals} style={customStyles}>
        <Paper className={classes.paper2}>
          <TextField
            onChange={onusuarioChanged}
            value={usuario}
            id="outlined-basic"
            label="Usuario"
            variant="outlined"
          />
          <TextField
            onChange={onmailChanged}
            value={mail}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            onChange={oncontraseñaChanged}
            value={contraseña}
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
          />
          <IconButton
            onClick={contraseña !== "" && mail !== "" && usuario !== "" ? handlesave : null}
          >
            <LibraryAddIcon style={{ float: "right", color: "blue" }} />
          </IconButton>
          <IconButton onClick={() => setmodals(false)}>
            <CloseIcon style={{ float: "right", color: "red" }} />
          </IconButton>
        </Paper>
      </Modal>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                style={{ display: "inline-grid", gridTemplateColumns: "98% 1%" }}
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Inquilinos
                </MDTypography>
                <IconButton onClick={() => setmodals(true)}>
                  <AddCircleIcon style={{ float: "right", color: "white" }} />
                </IconButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
