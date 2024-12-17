interface StepDataListProps {
    title: string;
    description?: string;
    disabled?:boolean;
}

export interface StepsListProps {
data: StepDataListProps[],
type?: "default" | "navigation" | "inline" | undefined;
current:number;
className?:string;
onChange?:(current: number) => void;
}