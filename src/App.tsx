import JqxButton from "jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import React, { useState } from "react";
import { generateData } from "./generatedata";


import './App.css';
const MyGrid = () => {

    const myGrid = React.createRef<JqxGrid>();

    const source = {
        datafields: [
            { name: 'name', type: 'string' },
            { name: 'productname', type: 'string' },
        ],
        datatype: 'array',
        localdata: generateData(100)

    };

    const source2 = {
        datafields: [
            { name: 'name', type: 'string' },
            { name: 'productname', type: 'string' },
        ],
        url:'http://127.0.0.1:3333/leer',
        datatype:'json'
    }      
    
    const adapter = new jqx.dataAdapter(source);
    const adapter2 = new jqx.dataAdapter(source2);
    
    const exportar = () => {
        myGrid.current!.exportdata('xls','archivo')
    }
        
    const subir = ( ) => {

        setAdap(adapter2)
    }

    const [adap,setAdap] = useState(adapter)

    const cargar =  async (event) => {
        const newData = new FormData();
        const data = event.target.files[0]
        newData.append("excel",data)
        //console.log(data)
        const resp = await fetch('http://127.0.0.1:3333/upload',{
            method: "POST",
            body: newData
        }).then(resp => resp.json())
        //console.log(resp)
        //alert(JSON.stringify(resp))

        if(resp){
            alert("subido")
            setAdap(adapter2)
        }
    }


    return(
        <div className="center">
            <JqxGrid ref={myGrid}

                sortable={true}  
                filterable={true}
                pageable={true}
                showfilterrow={true}
                source={adap}
                selectionmode={'multiplecellsadvanced'}
                editable={true}
                columns={[{
                    text: "name",
                    datafield: "name",
                    width: "290",
                    
                },
                {
                    text: "productname",
                    datafield: "productname",
                    width: "290",
                    columntype: 'dropdownlist'
                }]}
                

            >
            </JqxGrid>
            <div className="centerDiv">

            <JqxButton style={{ marginTop: '5px' }} onClick={exportar}>Export to Excel</JqxButton>

            <JqxButton style={{ marginTop: '5px' }} onClick={subir}>Subir</JqxButton>

                <JqxButton style={{ marginTop: '5px' }}>
            <input onChange={cargar} name="excel" type='file'/>
            </JqxButton>

            </div>
        </div>
    )
}

export default MyGrid;