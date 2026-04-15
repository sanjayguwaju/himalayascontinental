import { MediaBlock } from "@/blocks/MediaBlock/Component";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";

import { CodeBlock, CodeBlockProps } from "@/blocks/Code/Component";

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  GalleryBlock as GalleryBlockProps,
  MediaBlock as MediaBlockProps,
  VideoEmbedBlock as VideoEmbedBlockProps,
  QuoteBlock as QuoteBlockProps,
  StatsListBlock as StatsListBlockProps,
  AccordionBlock as AccordionBlockProps,
  InfoTableBlock as InfoTableBlockProps,
} from "@/payload-types";
import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { GalleryBlock } from "@/blocks/Gallery/Component";
import { VideoEmbedBlock } from "@/blocks/VideoEmbed/Component";
import { QuoteBlock } from "@/blocks/Quote/Component";
import { StatsListBlock } from "@/blocks/StatsList/Component";
import { AccordionBlock } from "@/blocks/Accordion/Component";
import { InfoTableBlock } from "@/blocks/InfoTable/Component";
import { cn } from "@/utilities/ui";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | GalleryBlockProps
      | VideoEmbedBlockProps
      | QuoteBlockProps
      | StatsListBlockProps
      | AccordionBlockProps
      | InfoTableBlockProps
    >;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    gallery: ({ node }) => <GalleryBlock {...node.fields} />,
    videoEmbed: ({ node }) => <VideoEmbedBlock {...node.fields} />,
    quote: ({ node }) => <QuoteBlock {...node.fields} />,
    statsList: ({ node }) => <StatsListBlock {...node.fields} />,
    accordion: ({ node }) => <AccordionBlock {...node.fields} />,
    infoTable: ({ node }) => <InfoTableBlock {...node.fields} />,
  },
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md dark:prose-invert": enableProse,
        },
        className
      )}
      {...rest}
    />
  );
}
