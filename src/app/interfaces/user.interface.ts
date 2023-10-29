export interface IUser{
    _id:string;
	email: string;
	password: string;
	username: string;
    firstName:string;
    lastName:string;
	points: number;
	picture: string;
    status: number | string;
}