"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-posts";

const categoryLabels: Record<BlogPost["category"], string> = {
  investment: "Investment",
  market: "Market",
  diaspora: "Diaspora",
  guide: "Guide",
  company: "Company",
};

export function Blog() {
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  return (
    <section id="insights" className="scroll-mt-[100px] bg-[#f4f6fb] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
              <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
              Insights
            </div>
            <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
              Market <em className="italic text-[#2BA84A]">Intelligence</em>
            </h2>
            <p className="mt-4 max-w-[480px] text-[15px] font-light text-[#6b7280]">
              In-depth analysis of the Lagos real estate market, investment strategy, and diaspora buying guidance from the Engrite team.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <ScrollReveal
              key={post.slug}
              delay={i * 80}
              className="group"
            >
              <Card
                className="h-full cursor-pointer overflow-hidden border-0 bg-white shadow-[0_8px_24px_rgba(8,21,52,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(8,21,52,0.12)]"
                onClick={() => setOpenPost(post)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 bg-white/95 text-[#102357]">
                    {categoryLabels[post.category]}
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#6b7280]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-normal leading-[1.3] text-[#102357]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-light leading-[1.7] text-[#6b7280] line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BA84A]">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Article modal */}
      <Dialog open={!!openPost} onOpenChange={(open) => !open && setOpenPost(null)}>
        <DialogContent className="max-h-[92vh] w-[95vw] max-w-3xl overflow-y-auto p-0 sm:rounded-md">
          {openPost && (
            <>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={openPost.cover}
                  alt={openPost.title}
                  fill
                  sizes="(min-width: 768px) 60vw, 95vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/95 via-[#081534]/40 to-transparent" />
                <DialogHeader className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <DialogTitle className="font-serif text-2xl font-normal text-white sm:text-3xl">
                    {openPost.title}
                  </DialogTitle>
                  <DialogDescription className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-wider text-white/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(openPost.date).toLocaleDateString("en-NG", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {openPost.readTime}
                    </span>
                    <span>By {openPost.author}</span>
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="prose prose-sm max-w-none p-6 sm:p-8 prose-headings:font-serif prose-headings:text-[#102357] prose-a:text-[#2BA84A] prose-strong:text-[#102357] prose-table:overflow-hidden prose-th:bg-[#102357] prose-th:text-white">
                <ReactMarkdown>{openPost.content}</ReactMarkdown>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
