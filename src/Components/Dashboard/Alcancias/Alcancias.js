import React from 'react';
import { Row, Button } from 'react-bootstrap';

const Alcancias = ({type, uid}) => {
    var usedNums = new Array(76);

    let alcancias_generadas = [];

    const generarAlcancias = (secuencia, cantidad) => {
        let k = 0
        for(let i = 1; i <= cantidad; i++){
            alcancias_generadas[alcancias_generadas.length] = {
                numero: i,
                codigo_barra: 1000 + k
            };
            
            k = k + secuencia;
        };
        console.log(alcancias_generadas);
    }
    function newCard() {
        for(var i=0 ; i<24 ; i++){
            setSquare(i);
          }
      }
      
      function setSquare(thisSquare){
        var currentSquare = "square" + thisSquare;
        var colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,3,4,0,1,2,3,4,0,1,2,3,4);
        var colBasis = colPlace[thisSquare] * 15;
        var newNum = colBasis + getNewNum() + 1;
      
        do{
          newNum = colBasis + getNewNum() + 1;
        }while(usedNums[newNum]);
        
        usedNums[newNum] = true;
        console.log(newNum)
      }
      
      function getNewNum() {
        return Math.floor(Math.random() * 15);
      }
      
      function anotherCard() {
        for (var i = 1; i < usedNums.length; i++) {
          usedNums[i] = false;
        };
      
        newCard();
        return false;
      }

    return (
        <div className='dash_content'>
            <Row>
                <h1>Alcancias:</h1>
                <Button className='ml-auto' variant='danger' onClick={() => {newCard()}}>Generar Alcancias</Button>
            </Row>
        </div>
    );
}
 
export default Alcancias;