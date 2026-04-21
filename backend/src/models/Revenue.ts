import mongoose, { Schema, Document } from 'mongoose';

export interface IRevenue extends Document {
  amount: number;
  source: string;
  date: Date;
  userId: mongoose.Types.ObjectId;
}

const RevenueSchema: Schema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
    min: [0, 'Amount must be positive']
  },
  source: {
    type: String,
    required: [true, 'Please provide a source'],
    enum: ['sales', 'subscriptions', 'consulting', 'advertising', 'licensing', 'other']
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
RevenueSchema.index({ date: -1 });
RevenueSchema.index({ source: 1 });
RevenueSchema.index({ userId: 1 });

export default mongoose.model<IRevenue>('Revenue', RevenueSchema);
