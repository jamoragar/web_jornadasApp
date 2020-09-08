import React from 'react';
import { Row, Button } from 'react-bootstrap';
import firebase from '../../../Config/Firebase';

const Alcancias = ({type, uid}) => {
    var usedNums = new Array(76);

    let alcancias_generadas = [];

    const eanCheckDigit = s => {
        let result = 0;
        for (let counter = s.length-1; counter >=0; counter--){
          result = result + parseInt(s.charAt(counter)) * (1+(2*(counter % 2)));
        }
        return (10 - (result % 10)) % 10;
      }

    const generarAlcancias = (secuencia, cantidad) => {
        let k = 1;
        const codBarra = '980201100000';

        for(let i = 0; i < cantidad; i++){

            let genCodBarra = parseInt(codBarra) + k;
            alcancias_generadas[alcancias_generadas.length] = {
                alcancia_numero: i + 1,
                codigo_barra: genCodBarra.toString() + eanCheckDigit(genCodBarra.toString()),
                asignada_usuario: false,
                asignada_externo: false,
                asignada_tercero: false,
                monto_recaudad: '',

            };

            firebase.database().ref(`/Alcancias/${i}`).set(alcancias_generadas[i]);
            
            k = k + secuencia;
        };
        console.log(alcancias_generadas);
    }
    // function newCard() {
    //     for(var i=0 ; i<24 ; i++){
    //         setSquare(i);
    //       }
    //   }
      
    //   function setSquare(thisSquare){
    //     var currentSquare = "square" + thisSquare;
    //     var colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,3,4,0,1,2,3,4,0,1,2,3,4);
    //     var colBasis = colPlace[thisSquare] * 15;
    //     var newNum = colBasis + getNewNum() + 1;
      
    //     do{
    //       newNum = colBasis + getNewNum() + 1;
    //     }while(usedNums[newNum]);
        
    //     usedNums[newNum] = true;
    //     console.log(newNum)
    //   }
      
    //   function getNewNum() {
    //     return Math.floor(Math.random() * 15);
    //   }
      
    //   function anotherCard() {
    //     for (var i = 1; i < usedNums.length; i++) {
    //       usedNums[i] = false;
    //     };
      
    //     newCard();
    //     return false;
    //   }

    return (
        <div className='dash_content'>
            <Row>
                <h1>Alcancías:</h1>
                <Button className='ml-auto' variant='danger' onClick={() => {generarAlcancias(1, 60)}}>Generar Alcancías</Button>
            </Row>
        </div>
    );
}
 
export default Alcancias;