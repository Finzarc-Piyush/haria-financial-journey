import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface TestimonialAuthor {
    name: string;
    handle: string;
    avatar: string;
}

export interface TestimonialCardProps {
    author: TestimonialAuthor;
    text: string;
    href?: string;
    className?: string;
}

export function TestimonialCard({
    author,
    text,
    href,
    className
}: TestimonialCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const Card: any = href ? 'a' : 'div';
    const isLongText = text.length > 100;
    const displayText = isExpanded || !isLongText ? text : text.substring(0, 100) + '...';

    return (
        <Card
            {...(href ? { href } : {})}
            className={cn(
                "flex flex-col rounded-lg border-t",
                "bg-gradient-to-b from-muted/50 to-muted/10",
                "p-6 text-start sm:p-8",
                "hover:from-muted/60 hover:to-muted/20",
                "max-w-[400px] sm:max-w-[450px]",
                "transition-all duration-300",
                "cursor-pointer",
                className
            )}
            onClick={(e) => {
                if (isLongText && !href) {
                    e.preventDefault();
                    setIsExpanded(!isExpanded);
                }
            }}
        >
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={author.avatar} alt={author.name} />
                </Avatar>
                <div className="flex flex-col items-start">
                    <h3 className="text-lg font-semibold leading-none">
                        {author.name}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                        {author.handle}
                    </p>
                </div>
            </div>
            <p className="text-lg sm:text-xl mt-6 text-muted-foreground leading-relaxed">
                {displayText}
            </p>
            {isLongText && (
                <button
                    className="mt-4 flex items-center gap-1 text-base text-secondary hover:text-secondary/80 transition-colors self-start"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {isExpanded ? (
                        <>Show less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                        <>Read more <ChevronDown className="w-4 h-4" /></>
                    )}
                </button>
            )}
        </Card>
    );
}


