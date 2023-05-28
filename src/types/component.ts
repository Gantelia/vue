export interface DialogComponent {
  $emit(event: string, ...args: any[]): void;
  hideDialog(): void;
}
