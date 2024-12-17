import { Steps } from 'antd';
import {StepsListProps} from './help';
import './style.css'


const StepsList = ({data, type, className, onChange, current}:StepsListProps) => (
    <Steps
    //   progressDot
      className={className}
      current={current}
      items={data}
      type={type}
      onChange={onChange}
    />
);

export default StepsList;