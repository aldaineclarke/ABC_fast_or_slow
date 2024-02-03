export interface IRoom{
    _id:string ;
    name: string;
    creator: string;
    player_limit: number;
    voting_duration: number;
    round_duration:number;
    gameFields: string[];
    round_limit: number;
    status: number;
    privacy: number;
}