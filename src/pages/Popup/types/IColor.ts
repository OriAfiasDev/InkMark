export interface IColor {
  id: string;
  color: string;
  isFavorite: boolean;
  type: 'solid' | 'gradient';
  count: number;
  tags: string[];
}
