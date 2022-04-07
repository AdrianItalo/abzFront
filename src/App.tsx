import React, { useState } from "react";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JqxInput from "jqwidgets-scripts/jqwidgets-react-tsx/jqxinput";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material.css";
import { generatedata } from "./generatedata";
import JqxButton from "jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons";

const MyGrid: React.FC = () => {
  const myGrid = React.createRef<JqxGrid>();
  const [data, setUser] = useState(generatedata(100));
  const [typee,setType] = useState('array')
  const source: any = {
    datafields: [
        { name: 'firstname', type: 'string' },
        { name: 'productname', type: 'string' },
    ],
    datatype: typee,
    localdata: data

  };
  
  const adapter = new jqx.dataAdapter(source);

  const exportar = () => {
      //console.log('')
      myGrid.current!.exportdata('xls','archivo')
    
  }

  const [subir,setSubir] = useState({
      archivo : '',
      subido: 0
  })

  const modificar = async () => {

      //console.log("Modificar data")
      const data = await fetch('http://127.0.0.1:3333/archivo')//a partir del excel subido, leemos los datos
      


  }

  const cargar =  async (event) => {
      const newData = new FormData();
      const data = event.target.files[0]
      newData.append("excel",data)
      //console.log(data)
      const resp = await fetch('http://127.0.0.1:3333/upload',{
          method: "POST",
          body: newData
      }).then(resp => resp.json())
      console.log(resp)
      alert(JSON.stringify(resp))
      if(resp){
          modificar()
      }else{
          return
      }


      
            
      
              
  }

  return (
      <div>
            <JqxGrid ref={myGrid}
            width="20%"
            source={adapter}
            editable={true} selectionmode={'multiplecellsadvanced'}
            columns={[
            {
                text: "First Name",
                datafield: "firstname",
                width: "100",
                columntype: 'dropdownlist'
            },
            {
                text: "Product Name",
                datafield: "productname",
                width: "100",
                columntype: 'dropdownlist'
            }
            ]}
            pageable={true}
            autoheight={true}
            sortable={true}
            theme="material"
        />
        <div style={{ float: 'left' }}>
                <JqxButton onClick={exportar}>Export to Excel</JqxButton>
                
            </div>
            <div style={{ float: 'left', marginLeft: '10px' }}>
                        <label>Subir excel</label>
                        <input onChange={cargar} name="excel" type='file'/>
                        


            </div>

      </div>
    
  );
};

export default MyGrid;
