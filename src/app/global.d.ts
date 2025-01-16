export interface IFileItem {
  id: string;
  name: string;
  parentPath: string;
  path: string;
  isDir: boolean;
  isLoading?: boolean;
  isSelect?: boolean;
  isOpen?: boolean;
  code?: string;
  url?: string;
  children: IFileItem[];
}
