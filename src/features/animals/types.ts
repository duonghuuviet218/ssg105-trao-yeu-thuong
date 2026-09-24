export interface Animal {
  id: string;
  type: 'dog' | 'cat';
  displayName?: string;
  asset: string; // đường dẫn import từ src/assets/animals/
  alt: string;
  personality?: string;
}
