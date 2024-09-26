export interface User{
    id:number;
    email:string;
    userName:string;
    active:boolean;
    firstName:string;
    lastName:string;
    roles:Array<Role>
}

export interface Role{
    id:number;
    name:string;
}