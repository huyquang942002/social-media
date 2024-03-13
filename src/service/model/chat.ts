import { UserInfo } from "./user"

export interface MessageChat {
  id: string
  senderId: string
  conversationId: any
  receiverId: string
  content: string
  isGhim: boolean
  isHide: boolean
  createdAt: string
  createdBy: string
  updatedAt: any
  updatedBy: any
  deletedAt: any
  deletedBy: any
  totalLove: any
  totalDisLove: any
  isMark: boolean
  conversationsGalleries: string
  senderUser: UserInfo
  receiverUser: UserInfo
  contentReply: string
  replyTo: string,
  newS3Links?: string
}

export interface TMessage {
  _id: string
  text: string
  createdAt: Date
  user: {
    _id: string
    name: string
    avatar: string
  },
  isReply?: {
    name: string
    text: string
  },
  image?: string
}

export interface TMessSend {
  receiverId: string,
  content?: string,
  conversationId?: string,
  conversationsGalleries?: any[],
  file?: any,
}

export interface TImage {
  filename: string,
  path: string,
  type: string,
  data: any
}