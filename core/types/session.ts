export enum ESessionTypes {
    ACCESS = 'access'
}

export interface ISessionCreate {
    user: string,
    expires: number,
    type: ESessionTypes
}

export interface ISession extends ISessionCreate {
    _id : string,
}