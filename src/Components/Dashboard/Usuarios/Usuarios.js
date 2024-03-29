import React, { useState, useEffect } from "react";
import VerUsuarios from "./VerUsuarios";
import AgregarUsuarios from "./AgregarUsuarios";
import firebase from "../../../Config/Firebase";
import { Spinner, Button, Row } from "react-bootstrap";

const CreateUsers = ({ subtipo, uid }) => {
  const [showAgregarUsuarios, setShowAgregarUsuarios] = useState(false);
  const [users, setUsers] = useState("EMPTY");
  const [userAuth, setUserAuth] = useState("EMPTY");

  useEffect(() => {
    firebase
      .database()
      .ref("/Users")
      .on("value", (snapshot) => {
        snapshot.val() ? setUsers(snapshot.val()) : setUsers("NO_USERS_FOUND");
      });
    firebase
      .database()
      .ref(`/Users/${uid}`)
      .on("value", (snapshot) => {
        snapshot.val()
          ? setUserAuth(snapshot.val())
          : setUserAuth("NO_USER_FOUND");
      });
  }, [uid]);

  if (users !== "EMPTY" && userAuth !== "EMPTY") {
    if (subtipo === "Admin") {
      return (
        <div className="dash_content">
          <Row>
            <h1>Usuarios:</h1>
            {userAuth.subtipo === "Admin" ? (
              <Button
                className="ml-auto"
                variant="success"
                onClick={() => setShowAgregarUsuarios(!showAgregarUsuarios)}
              >
                Crear Nuevo Usuario
              </Button>
            ) : null}
          </Row>
          <VerUsuarios users={users} userAuth={userAuth} />
          {userAuth.subtipo === "Admin" ? (
            <AgregarUsuarios
              show={showAgregarUsuarios}
              onHide={() => setShowAgregarUsuarios(false)}
            />
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="dash_content">
          <br />
          <h2>No tiene permitido ingresar a esta area.</h2>
        </div>
      );
    }
  } else {
    return (
      <div className="dash_content">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    );
  }
};

export default CreateUsers;
