import { IResultType, EResultTypes, EStatusCodes, IPageData, IResultError } from "./general";

export class TypedResult<ResultType, DataType, MSGType> {

    success(
        data: DataType,
        message: MSGType,
        status: EStatusCodes = EStatusCodes.SUCCESS,
    
    ) {
        const res: ResultType | IResultType = {
            type: EResultTypes.SUCCESS,
            status,
            data,
            message: message as string
        }
    
        return res
    }

    // generate error
    error(
        errs: IResultError[] | IResultError,
        status: EStatusCodes
    ) {
        const errors = Array.isArray(errs) ? errs : [errs];

        const res: ResultType | IResultType = {
            type: EResultTypes.ERROR,
            errors,
            status,
        };

        return res;
    }

    // generate single error
    singleError(
        name: string,
        message: MSGType,
        status: EStatusCodes = EStatusCodes.BAD_REQUEST
    ){
        // generate result error
        const error: IResultError = {
            name,
            message: message as string,
            status
        }

        // generate error
        const res: ResultType | IResultType = {
            type: EResultTypes.ERROR,
            status: error.status,
            errors: [error],
        }

        return res
    }
}