import { cn } from "@/lib/utils";

interface Props {
    title: string;
    classNames?: string;
}
const TitleSection = (props: Props) => {
    const { title, classNames } = props;
  return (
    <h3 className={cn(classNames, 'font-madeTommy font-bold text-5xl text-white/90')}>{title}</h3>
  )
}

export default TitleSection