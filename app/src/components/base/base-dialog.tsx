export interface DialogRef {
  open: () => void;
  close: () => void;
}

export interface DialogRefWithProps<T> {
  open: (props: T) => void;
  close: () => void;
}
