export interface Post {
  isLoved: boolean
  isDisLoved: boolean
  id: string
  totalLove: string
  totalDislove: string
  totalComment: string
  content: string
  deletedAt: any
  deletedBy: any
  postGalleries: PostGallery[]
  createdUser: CreatedUser
  updatedUser: any
}

export interface PostGallery {
  id: string
  link: string
  name: string
  description: string
  createdAt: string
  createdBy: any
  updatedAt: any
  updatedBy: any
  deletedAt: any
  deletedBy: any
  postId: string
}

export interface CreatedUser {
  id: string
  isHavePet: string
  email: string
  username: string
  zipcode: any
  password: string
  s3Profile: any
  firstName: any
  lastName: any
  phoneNumber: any
  address: any
  isActiveEmail: boolean
  gender: any
  dob: any
  isAccessCms: boolean
  createdAt: string
  createdBy: any
  updatedAt: any
  updatedBy: any
  deletedAt: any
  deletedBy: any
}
