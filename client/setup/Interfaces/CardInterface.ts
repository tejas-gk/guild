export interface CardProps {
  text: string;
  image?:string,
  author?:string,
  date?:string,
  username?:string,
  created_at:string,
  id?:string | number,
}

export interface Card0Props {
  id: string | number;
  text: string;

  user: string;

}