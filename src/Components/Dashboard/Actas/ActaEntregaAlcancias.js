import React from "react";
import Logo from '../../../imgs/lions.png'
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

const ActaEntregaAlcancias = ({ data, usuario }) => {
   const alcancias = data;
   const styles = StyleSheet.create({
      body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
      },
      subtitle: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center'
      },
      text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
      },
      image: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 85,
        heigh: 85,
        marginBottom: 20
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
      datosUsuario: {
         marginTop: 10,
         fontSize: 13,
         bottom: 10,
         left: 0,
         right: 0,
         textAlign: 'center',
      },
      alcancias: {
       fontSize: 13,
       marginTop: 25,
       marginBottom: 100
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
    });

  return (
   <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Club de Leones Cruz del Sur ~
      </Text>
      <Image
        style={styles.image}
        src={Logo}
      />
      <Text style={styles.title}>Entrega de Alcancías 2021</Text>
      <Text style={styles.subtitle}>
        Número de Alcancias: {alcancias.length}
      </Text>

      <Text style={styles.alcancias}>
         {
            alcancias.map((alcancia, i) => {
               return i === (alcancias.length - 1) ? alcancia : `${alcancia}, `
            })
         }
      </Text>

      
      <View  render={({pageNumber, totalPages}) => (
         pageNumber === totalPages && (
            <View style={styles.datosUsuario} fixed>
               <Text style={styles.datosUsuario}>Nombre : {`${usuario.nombre} ${usuario.apellido}`}</Text>
               <Text style={styles.datosUsuario}>R.U.N :………………………Teléfono :…………………………….</Text>
               <Text style={styles.datosUsuario}>Establecimiento :………………………………………………………</Text>
               <Text style={styles.datosUsuario}>Fecha :…………………………………………………………………</Text>
               <Text style={styles.datosUsuario}>Cantidad :{ alcancias.length }</Text>
               <Text style={styles.datosUsuario}>Dirección :………………………………………………………………</Text>
               <Text style={styles.datosUsuario}>E-Mail :{ usuario.email } </Text>
               <Text style={styles.datosUsuario}>Firma :………………………………………………………………</Text>
            </View>
         )
      )}/>

      
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
  );
};

export default ActaEntregaAlcancias;
