export interface Photo extends Meta {
  urls: Urls
  user: Author
}

export interface Meta {
  id: string
  created_at: string
  updated_at: string
  promoted_at: string
  width: number
  height: number
  color: string
  likes: number
}

export interface Urls {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

export interface Author {
  id: string
  username: string
  instagram_username: string
  profile_image: {
    small: string
    medium: string
    large: string
  }
}
