interface IRowGenerateData {
    id: number;
    reportsto: number | null;
    
    firstname: string;
    lastname: string;
    name: string;
    productname: string;

}


export function generateData(rowscount?: number): IRowGenerateData[] {
    return generatedata(rowscount);
}

export function generatedata(rowscount?: number, hasNullValues?: boolean): IRowGenerateData[] {
    const data: IRowGenerateData[] = new Array();

    if (rowscount === undefined) {
        rowscount = 100;
    }

    const firstNames =
    [
        'Andrew', 'Nancy', 'Shelley', 'Regina', 'Yoshi', 'Antoni', 'Mayumi', 'Ian', 'Peter', 'Lars', 'Petra', 'Martin', 'Sven', 'Elio', 'Beate', 'Cheryl', 'Michael', 'Guylene'
    ];

    const lastNames =
    [
        'Fuller', 'Davolio', 'Burke', 'Murphy', 'Nagase', 'Saavedra', 'Ohno', 'Devling', 'Wilson', 'Peterson', 'Winkler', 'Bein', 'Petersen', 'Rossi', 'Vileid', 'Saylor', 'Bjorn', 'Nodier'
    ];

    const productNames =
    [
        'Black Tea', 'Green Tea', 'Caffe Espresso', 'Doubleshot Espresso', 'Caffe Latte', 'White Chocolate Mocha', 'Caramel Latte', 'Caffe Americano', 'Cappuccino', 'Espresso Truffle', 'Espresso con Panna', 'Peppermint Mocha Twist'
    ];

    for (let i = 0; i < rowscount; i++) {
        const row = {} as IRowGenerateData; 

        const productindex = Math.floor(Math.random() * productNames.length);
        

        row.id = i;
      

        row.firstname = firstNames[Math.floor(Math.random() * firstNames.length)];
        row.lastname = lastNames[Math.floor(Math.random() * lastNames.length)];
        row.name = row.firstname + ' ' + row.lastname; 
        row.productname = productNames[productindex];
       
        
        data[i] = row;
    }

    return data;
}

