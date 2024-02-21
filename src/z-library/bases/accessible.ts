import { HydratedDocument } from "mongoose";
import { Paginator } from "../HTTP/http-response";

export interface Accessible{
    createNew:(data: any) => Promise<HydratedDocument<any>>
    findByReferenceId:(refId: string) => Promise<HydratedDocument<any> | null>
    findWithPagination: (paginator: Paginator) => Promise<HydratedDocument<any>[]>
    findByIdAndUpdate: (id: string, updateDoc: HydratedDocument<any>
        ) => Promise<HydratedDocument<any> | null>

    findByIdAndDelete: (id: string) => Promise<HydratedDocument<any> | null>
}