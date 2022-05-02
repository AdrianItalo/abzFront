import JqxButton from "jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import React, { useState } from "react";
import { generateData } from "./generatedata";

import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';



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
        url: 'http://127.0.0.1:3333/leer',
        datatype: 'json'
    }
    const source3 = {
        datafields: [
            { name: 'productname', type: 'string' },
        ],
        datatype: 'array',
        localdata : [
            {productname: 'Black Tea'},{productname: 'Green Tea'},{productname: 'Caffe Espresso'},{productname: 'Doubleshot Espresso'},{productname: 'Caffe Latte'},
            {productname: 'White Chocolate Mocha'},{productname: 'Caramel Latte'},{productname: 'Caffe Americano'},{productname: 'Cappuccino'},
            {productname: 'Espresso Truffle'},{productname: 'Espresso con Panna'},{productname: 'Peppermint Mocha Twist'}
            
        ]

    }

    const adapter = new jqx.dataAdapter(source);
    const adapter2 = new jqx.dataAdapter(source2);
    const adapter3 = new jqx.dataAdapter(source3);

       

    const exportar = () => {
        myGrid.current!.exportdata('xls', 'archivo')
    }

    const subir = () => {

        setAdap(adapter2)
    }

    const [adap, setAdap] = useState(adapter)

    const cargar = async (event) => {
        const newData = new FormData();
        const data = event.target.files[0]
        newData.append("excel", data)
        //console.log(data)
        const resp = await fetch('http://127.0.0.1:3333/upload', {
            method: "POST",
            body: newData
        }).then(resp => resp.json())
        //console.log(resp)
        //alert(JSON.stringify(resp))

        if (resp) {
            alert("subido")
            setAdap(adapter2)
        }
    }


    return (
        <div className="center">

            <JqxTabs width={610}>

                <ul>
                    <li style={{ marginLeft: '30px' }}>Grid 1</li>
                    <li>Grid 2</li>
                </ul>

                <div>
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
                </div>
                <div>
                    <JqxGrid
                        source={adapter3}
                        columns={[{
                            text: "productname",
                            datafield: "productname",
                            width: "290",
                            columntype: 'dropdownlist'
                        }]}
                    >

                    </JqxGrid>
                </div>
                </JqxTabs>
                <div className="centerDiv">

                    <JqxButton style={{ marginTop: '5px' }} onClick={exportar}>Export to Excel</JqxButton>

                    <JqxButton style={{ marginTop: '5px' }} onClick={subir}>Actualizar</JqxButton>

                    <JqxButton style={{ marginTop: '5px' }}>
                        <input onChange={cargar} name="excel" type='file' />
                    </JqxButton>

                </div>
            
        </div>
    )
}

export default MyGrid;