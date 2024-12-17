import { Table } from 'antd';
import './style.css'
// Define your data type
// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// interface BasicTableComponentProps {
//   columns: TableColumnsType<DataType>;
//   dataSource: DataType[];
// }

const BasicTableComponent = ({ columns, dataSource} : {columns:any, dataSource:any}) => {
  // const onChange['onChange'] = (pagination, filters, sorter, extra) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };

  return (
    <div className='basic-table'>
      <Table
      bordered
        columns={columns}
        dataSource={dataSource}
        //onChange={onChange} // Attach the onChange handler
      />
    </div>
  );
};

export default BasicTableComponent;