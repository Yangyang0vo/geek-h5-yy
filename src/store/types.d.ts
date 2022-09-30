export interface Token {
  token: string
  refresh_token: string
}

export type User = {
  id: number
  name: string
  photo: string
  intro: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
export type Profile = {
  id: string
  birthday: string
  gender: number
  intro: string
  mobile: string
  name: string
  photo: string
}

export type SaveUser =
  | {
      name: string
    }
  | {
      intro: string
    }
  | {
      gender: number
    }
  | {
      birthday: string
    }
  | {
      photo: string
    }
export type Channel = {
  id: number
  name: string
}

export type MoreAction = {
  visible: boolean
  articleId: string
  channelId: number | ''
}

export type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top?: number
  cover: {
    type: number
    images: string[]
  }
}
export type Articles = {
  [index: number]: {
    timestamp: string
    list: article[]
  }
}
// 搜索结果的类型
export type SearchRes = {
  page: number
  per_page: number
  results: Article[]
  total_count: number
}

export type Detail = {
  art_id: string
  title: string
  pubdate: string
  aut_id: string
  content: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  is_collected: boolean
  attitude: number
  comm_count: number
  read_count: number
  like_count: number
}

export type Comment = {
  aut_id: string
  aut_name: string
  aut_photo: string
  com_id: string
  content: string
  is_followed: boolean
  is_liking: boolean
  like_count: number
  pubdate: string
  reply_count: number
}
export type CommentType = {
  end_id: string
  last_id: string
  results: Comment[]
  total_count: number
}
