interface ConditionProps {
  show: boolean;
  children: React.ReactNode;
}
export default function Condition(props: ConditionProps) {
  return props.show ? props.children : null;
}
