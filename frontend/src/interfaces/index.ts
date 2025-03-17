export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  message: string;
  data: User & {
    inbox: {
      totalMessages: number;
      unreadMessages: number;
    };
  };
}

export interface MessagesResponse {
  message: string;
  data: Message[];
}

export interface MessageResponse {
  message: string;
  data: Message;
}
