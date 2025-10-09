/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// app/article/[slug]/components/ShareBar.jsx
"use client";

import { useArticleMeta } from "@/context/ArticleMetaProvider";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export default function ShareBar({ title, slug }) {
  const { recordShare } = useArticleMeta();
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `https://www.linkconnews.com/article/${slug}`;

  const handleShare = (href) => {
    recordShare();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      recordShare();
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-blue-600 text-white" size="sm">
          <i className="pi pi-share-alt mr-2" /> Share
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Share options">
        <DropdownItem
          key="facebook"
          onPress={() =>
            handleShare(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
            )
          }
          startContent={<i className="pi pi-facebook text-blue-600" />}
        >
          Facebook
        </DropdownItem>

        <DropdownItem
          key="twitter"
          onPress={() =>
            handleShare(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
            )
          }
          startContent={<i className="pi pi-twitter text-blue-400" />}
        >
          Twitter
        </DropdownItem>

        <DropdownItem
          key="whatsapp"
          onPress={() =>
            handleShare(
              `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`
            )
          }
          startContent={<i className="pi pi-whatsapp text-green-500" />}
        >
          WhatsApp
        </DropdownItem>

        <DropdownItem
          key="linkedin"
          onPress={() =>
            handleShare(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
            )
          }
          startContent={<i className="pi pi-linkedin text-blue-700" />}
        >
          LinkedIn
        </DropdownItem>

        <DropdownItem
          key="telegram"
          onPress={() =>
            handleShare(
              `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
            )
          }
          startContent={<i className="pi pi-send text-sky-500" />}
        >
          Telegram
        </DropdownItem>

        <DropdownItem
          key="copy"
          onPress={copy}
          startContent={<i className="pi pi-link text-gray-700" />}
        >
          Copy Link
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
