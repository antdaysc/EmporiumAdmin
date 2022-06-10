/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import firebase from "../../../Firebase";

// Images

export default function data() {
  const [usuarios, setusuarios] = useState([]);

  useEffect(() => {
    firebase.realdb.ref("usuario").on("value", (snap) => {
      setusuarios(snap.val());
    });
  }, []);

  const handlestatus = (element) => {
    firebase.realdb.ref(`usuario/${element[1].nombre}`).update({
      status: element[1].status === "activo" ? "inactivo" : "activo",
    });
  };

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const pruebados =
    usuarios &&
    Object.entries(usuarios).map((element) => ({
      ...{ nombre: element[0] },
      ...element[1],
    }));

  const renglones =
    pruebados &&
    Object.entries(pruebados).map((element) => ({
      author: <Author name={element[1].user} email={element[1].email} />,
      function: <Job title={element[1].password} description="Organization" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            style={{ zIndex: "0", cursor: "pointer" }}
            onClick={() => handlestatus(element)}
            badgeContent={element[1].status}
            color={element[1].status === "activo" ? "success" : "dark"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element[1].alta}
        </MDTypography>
      ),
    }));

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "contraseña", accessor: "function", align: "left" },
      { Header: "estatus", accessor: "status", align: "center" },
      { Header: "Ingreso", accessor: "employed", align: "center" },
    ],
    // console.log(key, { ...{ nombre: element[0] }, ...element[1] })
    rows: renglones,
  };
}
