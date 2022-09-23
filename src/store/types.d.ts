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
  is_top: number
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
