import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function SocialMediaIcons({
  className,
  iconSize = 20,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full hover:bg-muted"
        aria-label="Visit our Facebook page"
      >
        <Link
          href="https://sv-se.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook size={iconSize} />
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full hover:bg-muted"
        aria-label="Visit our Instagram page"
      >
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={iconSize} />
        </Link>
      </Button>
    </div>
  );
}
