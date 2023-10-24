export type PostModel ={
    title_post:string
    description_post: string,
    category_id: string|number,
    user_id: string|number
    imagepath_post: File | null
    brand_post:string
}

export type PostType ={
    title_post:string
    post_id: number
    description_post: string,
    category_id: number,
    user_id: number
    imagepath_post: File | null
    brand_post:string
    username: string | null
    imagepath_profile:file | null
}

export type PostsType = PostType[];

export type CategoryModel = {
    title:string
    imagepath_category: File | null
}

export type CategoryType = {
    category_id: number
    title:string
    imagepath_category: File | null
    categories_posts:PostsType  | null
}

export type CategoriesType = CategoryType[];

export type authProps = {
    username:string
    password:string
}

type UserInfo = {
    user_id:number
    name: string 
    lastname: string | null
    imagepath_profile: File | null
    description_profile:string 
    username:string 
    password:string | null
}

export type UserModel ={
    name:string
    lastname:string
    imagepath_profile: File | null
    description_profile:string
    username:string
    password:string
}

export type UserType ={
    user_id: number
    name: string
    lastname: string
    imagepath_profile: File | null
    description_profile:string | null
    username:string | null
    password:string | null
    user_posts: PostsType | null
    user_coupons: CouponsType | null
}


export type UsersType = UserType[]

export type CouponModel = {
    title_coupon:string
    code_coupon: string
    description_coupon: string
    user_id: number | string
    imagepath_coupon: File | null
}

export type CouponType = {
    coupon_id: number
    title_coupon:string
    code_coupon: string
    description_coupon: string
    user_id: number | string
    imagepath_coupon: File | null
}
export type CouponsType = CouponType[]

