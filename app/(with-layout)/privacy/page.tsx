/* eslint-disable */
import React from "react";
// import Content from '@/content/privacy.mdx';
import { useGetMdxBySlugs } from "@/lib/mdx";
import { DashboardTableOfContents } from "@/components/toc";

const useGetDocContent = async (language: string, slugs: string[]) => {
  try {
    const { meta, content, toc } = await useGetMdxBySlugs(
      language ?? "en",
      [language].concat(!slugs || slugs.length == 0 ? [] : slugs),
    );
    return { meta, content, toc };
  } catch (err) {
    try {
      const { meta, content, toc } = await useGetMdxBySlugs(
        "en",
        ["en"].concat(slugs ?? []),
      );
      return { meta, content, toc };
    } catch {
      // Handle the 'File not found' error here
      console.error("File not found:", err);
      return {
        meta: null,
        content: <div>404 - Page not found</div>,
        toc: null,
      };
    }
  }
};

export default async function PrivacyPage() {
  const { content, toc, meta } = await useGetDocContent("en", ["privacy"]);
  return (
    <div className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-[1024px] px-6">
        <hr className="my-4 md:my-6" />
        {content}
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          {toc && <DashboardTableOfContents toc={toc} />}
        </div>
      </div>
    </div>
  );
}
