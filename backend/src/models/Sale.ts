import mongoose, { Schema, Document } from 'mongoose';

export interface ISale extends Document {
  amount: number;
  category: string;
  date: Date;
  description: string;
  userId: mongoose.Types.ObjectId;
}

const SaleSchema: Schema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
    min: [0, 'Amount must be positive']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['electronics', 'clothing', 'food', 'software', 'services', 'other']
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [200, 'Description cannot be more than 200 characters']
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
SaleSchema.index({ date: -1 });
SaleSchema.index({ category: 1 });
SaleSchema.index({ userId: 1 });

export default mongoose.model<ISale>('Sale', SaleSchema);
