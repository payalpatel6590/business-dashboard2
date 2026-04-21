import mongoose, { Document } from 'mongoose';
export interface ISale extends Document {
    amount: number;
    category: string;
    date: Date;
    description: string;
    userId: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<ISale, {}, {}, {}, mongoose.Document<unknown, {}, ISale, {}, mongoose.DefaultSchemaOptions> & ISale & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISale>;
export default _default;
//# sourceMappingURL=Sale.d.ts.map