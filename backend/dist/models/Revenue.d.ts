import mongoose, { Document } from 'mongoose';
export interface IRevenue extends Document {
    amount: number;
    source: string;
    date: Date;
    userId: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<IRevenue, {}, {}, {}, mongoose.Document<unknown, {}, IRevenue, {}, mongoose.DefaultSchemaOptions> & IRevenue & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRevenue>;
export default _default;
//# sourceMappingURL=Revenue.d.ts.map