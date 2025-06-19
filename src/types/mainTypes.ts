export type PostVisisbilityType = "anyone" | "community" | "private";
export type PostStatusType = "draft" | "active" | "pending" | "deleted";
export type PostTypes = "donor" | "donee";

export type PostType = {
  content: string;
  visibility: PostVisisbilityType;
  images?: string[] | null | undefined;
  hashtags?: string[] | null | undefined;
  mentions?: string[] | null | undefined;
  status: PostStatusType;
  post_type: PostTypes;
};

export type UserType = {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  org_id: string;
  bio: string | null;
  account_type: "personal" | "organization";
  created_at: Date | string;
  updated_at: Date | string;
  pfp: string | null;
  cover: string | null;
  is_verified: boolean;
  username: string;
};
