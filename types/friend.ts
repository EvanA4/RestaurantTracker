export interface Friend {
  _id: string;
  requestorId: string;
  receiverId: string;
  status: boolean;
  requestedAt: Date;
  acceptedAt: Date;
}
