interface CommentContentProps {
  content: string;
}

export default function CommentContent({ content }: CommentContentProps) {
  return (
    <p className="text-neutral-20 mb-2 text-[16px] leading-relaxed whitespace-pre-wrap">
      {content}
    </p>
  );
}
