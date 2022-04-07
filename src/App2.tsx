import * as React from 'react';
 


import { generatedata } from './generatedata';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

class App extends React.PureComponent<{}, IGridProps> {

    private myGrid = React.createRef<JqxGrid>();

    constructor(props: {}) {
        super(props);
        this.excelBtnOnClick = this.excelBtnOnClick.bind(this);
        this.pdfBtnOnClick = this.pdfBtnOnClick.bind(this);
        
        const source: any = {
            datafields: [
                { name: 'firstname', type: 'string' },
                { name: 'lastname', type: 'string' },
                { name: 'productname', type: 'string' },
                
                { name: 'date', type: 'date' },
                { name: 'quantity', type: 'number' },
                { name: 'price', type: 'number' }
            ],
            datatype: 'array',
            localdata: generatedata(200, false)//GENERAMOS 100 DATOS, MEDIANTE ESTA FUNCION
        };

        this.state = {
            columns: [
                { text: 'First Name', datafield: 'firstname', width: 130 },
                { text: 'Last Name', datafield: 'lastname', width: 130 },
                { text: 'Product', datafield: 'productname', width: 200 },
                
                { text: 'Ship Date', datafield: 'date', width: 120, align: 'right', cellsalign: 'right', cellsformat: 'd' },
                { text: 'Quantity', datafield: 'quantity', width: 70, align: 'right', cellsalign: 'right' },
                { text: 'Price', datafield: 'price', cellsalign: 'right', align: 'right', cellsformat: 'c2' }
            ],
            source: new jqx.dataAdapter(source)
        }
    }

    public render() {
        return (
            <div style={{ fontSize: '13px', fontFamily: 'Verdana', float: 'left' }}>
                <JqxGrid theme={'material-purple'} ref={this.myGrid}
                    // @ts-ignore
                    width={'800px'} source={this.state.source} columns={this.state.columns}                    
                    
                    />

                <div style={{ marginTop: '20px' }}>
                    <div style={{ float: 'left' }}>
                        <JqxButton theme={'material-purple'} onClick={this.excelBtnOnClick}>Export to Excel</JqxButton>
                        
                    </div>
                    <div style={{ float: 'left', marginLeft: '10px' }}>
                        <JqxButton theme={'material-purple'} onClick={this.pdfBtnOnClick}>Export to PDF</JqxButton>
                    </div>
                </div>
            </div>
        );
    }

    private excelBtnOnClick() {
        this.myGrid.current!.exportdata('xls', 'jqxGrid');
    };

    private pdfBtnOnClick() {
        this.myGrid.current!.exportdata('pdf', 'jqxGrid');
    };

}

export default App;