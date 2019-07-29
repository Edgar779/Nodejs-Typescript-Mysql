
export interface IAdminDocument {
    email: string;
    password: string;
    role: Number;
    createdDt: Date;
    updatedDt: Date;
}

export interface IAdmin extends IAdminDocument {

}

